import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppProps } from 'next/app';

import { AuthProvider, DrawerProvider } from '~/contexts';
import queryClient from '~/services/query-client';
import theme from '~/styles/theme';

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
