import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { AuthProvider, DrawerProvider } from '~/contexts';
import { initializeServer } from '~/services/mirage';
import queryClient from '~/services/query-client';
import theme from '~/styles/theme';

if (
  typeof window !== 'undefined'
  // && process.env.NODE_ENV === 'development'
) {
  initializeServer();
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <DrawerProvider>
            <Component {...pageProps} />
          </DrawerProvider>
        </ChakraProvider>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </AuthProvider>
  );
}
