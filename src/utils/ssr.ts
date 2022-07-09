import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { parseCookies } from 'nookies';

export function withServerSideGuest<T>(
  getServerSideProps: GetServerSideProps<T>,
) {
  return async (
    context: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<T>> => {
    const cookies = parseCookies(context);
    const token = cookies[process.env.NEXT_PUBLIC_COOKIE_KEY_TOKEN!];

    if (token) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      };
    }

    return getServerSideProps(context);
  };
}

export function withServerSideAuth<T>(
  getServerSideProps: GetServerSideProps<T>,
) {
  return async (
    context: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<T>> => {
    const cookies = parseCookies(context);
    const token = cookies[process.env.NEXT_PUBLIC_COOKIE_KEY_TOKEN!];

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return getServerSideProps(context);
  };
}
