import axios from 'axios';
import { parseCookies, setCookie } from 'nookies';

interface RequestsAwaitingTokenRefresh {
  resolve: () => void;
  reject: () => void;
}

// flag to allow queuing requests awaiting token refresh
let isRefreshingToken = false;
// queue of requests to be executed once token is refreshed
const requestsQueue = new Set<RequestsAwaitingTokenRefresh>();

export const AUTH_BASE_URL = process.env.AUTH_SERVER ?? 'http://localhost:3333';

const api = axios.create({
  baseURL: AUTH_BASE_URL,
});

// try to add bearer token to all requests
api.interceptors.request.use((config) => {
  const cookies = parseCookies();
  const token = cookies[process.env.NEXT_PUBLIC_COOKIE_KEY_TOKEN!];

  if (token) {
    config.headers!['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

// try to refresh token on responses status 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response?.status !== 401 ||
      error.response?.data?.code !== 'token.expired'
    ) {
      return Promise.reject(error);
    }

    if (isRefreshingToken) {
      return new Promise((resolve, reject) => {
        requestsQueue.add({
          resolve: () => resolve(api.request(error.config)),
          reject: () => reject(error),
        });
      });
    }

    const cookies = parseCookies();
    const refreshToken =
      cookies[process.env.NEXT_PUBLIC_COOKIE_KEY_REFRESH_TOKEN!];

    if (!refreshToken) {
      return Promise.reject(error);
    }

    try {
      isRefreshingToken = true;
      const { data } = await api.post('refresh', { refreshToken });
      const cookiesOptions = {
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        path: '/',
      };

      setCookie(
        null,
        process.env.NEXT_PUBLIC_COOKIE_KEY_TOKEN!,
        data.token,
        cookiesOptions,
      );
      setCookie(
        null,
        process.env.NEXT_PUBLIC_COOKIE_KEY_REFRESH_TOKEN!,
        data.refreshToken,
        cookiesOptions,
      );
      requestsQueue.forEach((request) => {
        requestsQueue.delete(request);
        request.resolve();
      });

      return api.request(error.config);
    } catch {
      requestsQueue.forEach((request) => {
        requestsQueue.delete(request);
        request.reject();
      });

      return Promise.reject(error);
    }
  },
);

export default api;
