import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { parseCookies, setCookie } from 'nookies';

interface RequestsAwaitingTokenRefresh {
  resolve: () => void;
  reject: () => void;
}

export const AUTH_BASE_URL = process.env.AUTH_SERVER ?? 'http://localhost:3333';

export function createClient(context?: GetServerSidePropsContext) {
  // flag to allow queuing requests awaiting token refresh
  let isRefreshingToken = false;
  // queue of requests to be executed once token is refreshed
  const requestsQueue = new Set<RequestsAwaitingTokenRefresh>();

  const httpClient = axios.create({
    baseURL: AUTH_BASE_URL,
  });

  // try to add bearer token to all requests
  httpClient.interceptors.request.use((config) => {
    const cookies = parseCookies(context);
    const token = cookies[process.env.NEXT_PUBLIC_COOKIE_KEY_TOKEN!];

    if (token) {
      config.headers!['Authorization'] = `Bearer ${token}`;
    }

    return config;
  });

  // try to refresh token on responses status 401
  httpClient.interceptors.response.use(
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
            resolve: () => resolve(httpClient.request(error.config)),
            reject: () => reject(error),
          });
        });
      }

      const cookies = parseCookies(context);
      const refreshToken =
        cookies[process.env.NEXT_PUBLIC_COOKIE_KEY_REFRESH_TOKEN!];

      if (!refreshToken) {
        return Promise.reject(error);
      }

      try {
        isRefreshingToken = true;
        const { data } = await httpClient.post('refresh', { refreshToken });
        const cookiesOptions = {
          maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
          path: '/',
        };

        setCookie(
          context,
          process.env.NEXT_PUBLIC_COOKIE_KEY_TOKEN!,
          data.token,
          cookiesOptions,
        );
        setCookie(
          context,
          process.env.NEXT_PUBLIC_COOKIE_KEY_REFRESH_TOKEN!,
          data.refreshToken,
          cookiesOptions,
        );
        requestsQueue.forEach((request) => {
          requestsQueue.delete(request);
          request.resolve();
        });

        return httpClient.request(error.config);
      } catch {
        requestsQueue.forEach((request) => {
          requestsQueue.delete(request);
          request.reject();
        });

        return Promise.reject(error);
      }
    },
  );

  return httpClient;
}

export default createClient();
