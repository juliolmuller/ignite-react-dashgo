import { Button, Flex, Stack } from '@chakra-ui/react';
import Head from 'next/head';

import { FormInput } from '~/components';

export default function SignInPage() {
  return (
    <>
      <Head>
        <title>Sign In | Dashgo</title>
      </Head>

      <Flex align="center" justify="center" h="100vh" w="100vw">
        <Flex
          as="form"
          flexDir="column"
          w="100%"
          maxW={360}
          borderRadius={8}
          bg="gray.800"
          p="8"
        >
          <Stack spacing={4}>
            <FormInput label="Email" name="email" type="email" />
            <FormInput label="Senha" name="password" type="password" />
          </Stack>

          <Button size="lg" mt="6" colorScheme="pink" type="submit">
            Entrar
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
