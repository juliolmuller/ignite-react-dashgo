import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import Head from 'next/head';

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
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                size="lg"
                variant="filled"
                bg="gray.900"
                focusBorderColor="pink.500"
                _hover={{ bg: 'gray.900' }}
                id="email"
                name="email"
                type="email"
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Senha</FormLabel>
              <Input
                size="lg"
                variant="filled"
                bg="gray.900"
                focusBorderColor="pink.500"
                _hover={{ bg: 'gray.900' }}
                id="password"
                name="password"
                type="password"
              />
            </FormControl>
          </Stack>

          <Button size="lg" mt="6" colorScheme="pink" type="submit">
            Entrar
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
