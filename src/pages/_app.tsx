import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';

import { DrawerProvider } from '~/contexts';
import theme from '~/styles/theme';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <DrawerProvider>
        <Component {...pageProps} />
      </DrawerProvider>
    </ChakraProvider>
  );
}
