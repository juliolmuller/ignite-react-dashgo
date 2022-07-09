import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { destroyCookie, parseCookies } from 'nookies';

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
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<T>> => {
    const cookies = parseCookies(ctx);
    const token = cookies[process.env.NEXT_PUBLIC_COOKIE_KEY_TOKEN!];

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    try {
      return getServerSideProps(ctx);
    } catch (error: any) {
      if (error.message === 'auth error') {
        destroyCookie(ctx, process.env.NEXT_PUBLIC_COOKIE_KEY_TOKEN!);
        destroyCookie(ctx, process.env.NEXT_PUBLIC_COOKIE_KEY_REFRESH_TOKEN!);

        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }

      throw error;
    }
  };
}
