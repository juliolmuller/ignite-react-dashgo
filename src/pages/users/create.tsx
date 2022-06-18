import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { AppHeader, AppSideBar, FormInput } from '~/components';

export default function CreateUserPage() {
  return (
    <>
      <Head>
        <title>Novo Usuários | Dashgo</title>
      </Head>

      <Flex direction="column" h="100vh">
        <AppHeader />

        <Flex w="100%" maxW={1480} mx="auto" my="6" px="6">
          <AppSideBar />

          <Box as="form" flex="1" borderRadius={8} bg="gray.800" p={['6', '8']}>
            <Heading size="lg" fontWeight="normal">
              Criar Usuário
            </Heading>

            <Divider my="6" borderColor="gray.700" />

            <Stack spacing="8">
              <SimpleGrid minChildWidth={240} spacing={['6', '8']} w="100%">
                <FormInput label="Nome completo" name="name" />
                <FormInput label="E-mail" name="email" type="email" />
              </SimpleGrid>

              <SimpleGrid minChildWidth={240} spacing={['6', '8']} w="100%">
                <FormInput label="Senha" name="password" type="password" />
                <FormInput
                  label="Confirmação da senha"
                  name="password_confirmation"
                  type="password"
                />
              </SimpleGrid>
            </Stack>

            <Flex justify="flex-end" gap="4" mt="12">
              <NextLink href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </NextLink>

              <Button type="submit" colorScheme="pink">
                Salvar
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
