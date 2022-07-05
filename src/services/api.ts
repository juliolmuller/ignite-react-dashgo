export interface ApiOptions<TReq> extends Omit<RequestInit, 'body' | 'method'> {
  body?: TReq;
}

export const AUTH_BASE_URL = process.env.AUTH_SERVER ?? 'http://localhost:3333';

function makeHttpClient<
  TRes extends ReadableStream | XMLHttpRequestBodyInit = any,
  TReq extends ReadableStream | XMLHttpRequestBodyInit = TRes,
>(method: string) {
  return (uri: string, options: ApiOptions<TReq>): Promise<TRes> => {
    return fetch(`${AUTH_BASE_URL}/${uri}`, {
      ...options,
      method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: options.body && JSON.stringify(options.body),
    }).then(async (response) => {
      const json = await response.json();
      if (response.status >= 400) throw new Error(json.message);
      return json;
    });
  };
}

export default {
  get: makeHttpClient('GET'),
  post: makeHttpClient('POST'),
  update: makeHttpClient('PUT'),
  delete: makeHttpClient('DELETE'),
};
