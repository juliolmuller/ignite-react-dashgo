import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';

import { DrawerProvider } from '~/contexts';
import { initializeServer } from '~/services/mirage';
import theme from '~/styles/theme';

if (
  typeof window !== 'undefined'
  // && process.env.NODE_ENV === 'development'
) {
  initializeServer();
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <DrawerProvider>
        <Component {...pageProps} />
      </DrawerProvider>
    </ChakraProvider>
  );
}
