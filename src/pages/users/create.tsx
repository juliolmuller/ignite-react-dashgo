import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';

import { AppHeader, AppSideBar, FormInput } from '~/components';
import { UserModel } from '~/services/mirage';
import queryClient from '~/services/query-client';

export interface CreateUserFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const createUserFormSchema = yup.object().shape({
  name: yup
    .string()
    .required('Campo obrigatório')
    .min(3, 'Deve ter no mínimo 3 caracteres'),
  email: yup
    .string()
    .email('Não é um e-mail válido')
    .required('Campo obrigatório'),
  password: yup
    .string()
    .required('Campo obrigatório')
    .min(8, 'Deve ter no mínimo 8 caracteres'),
  password_confirmation: yup
    .string()
    .required('Campo obrigatório')
    .oneOf([yup.ref('password')], 'As senhas não conferem'),
});

export default function CreateUserPage() {
  const router = useRouter();
  const { formState, handleSubmit, register } = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserFormSchema),
  });
  const { mutateAsync } = useMutation(
    async (userData: CreateUserFormData) => {
      const user = { ...userData, createdAt: new Date().toISOString() };
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user }),
      });
      const data = await response.json();
      return data.user as UserModel;
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['users']),
    },
  );

  async function handleCreateUser(data: CreateUserFormData) {
    await mutateAsync(data);
    router.replace('/users');
  }

  return (
    <>
      <Head>
        <title>Novo Usuários | Dashgo</title>
      </Head>

      <Flex direction="column" h="100vh">
        <AppHeader />

        <Flex w="100%" maxW={1480} mx="auto" my="6" px="6">
          <AppSideBar />

          <Box
            as="form"
            noValidate
            flex="1"
            borderRadius={8}
            bg="gray.800"
            p={['6', '8']}
            onSubmit={handleSubmit(handleCreateUser)}
          >
            <Heading size="lg" fontWeight="normal">
              Criar Usuário
            </Heading>

            <Divider my="6" borderColor="gray.700" />

            <Stack spacing="8">
              <SimpleGrid minChildWidth={240} spacing={['6', '8']} w="100%">
                <FormInput
                  error={formState.errors.name}
                  label="Nome completo"
                  {...register('name')}
                />
                <FormInput
                  error={formState.errors.email}
                  label="E-mail"
                  type="email"
                  {...register('email')}
                />
              </SimpleGrid>

              <SimpleGrid minChildWidth={240} spacing={['6', '8']} w="100%">
                <FormInput
                  error={formState.errors.password}
                  label="Senha"
                  type="password"
                  {...register('password')}
                />
                <FormInput
                  error={formState.errors.password_confirmation}
                  label="Confirmação da senha"
                  type="password"
                  {...register('password_confirmation')}
                />
              </SimpleGrid>
            </Stack>

            <Flex justify="flex-end" gap="4" mt="12">
              <NextLink href="/users" passHref>
                <Button
                  as="a"
                  disabled={formState.isSubmitting}
                  colorScheme="whiteAlpha"
                >
                  Cancelar
                </Button>
              </NextLink>

              <Button
                isLoading={formState.isSubmitting}
                type="submit"
                colorScheme="pink"
              >
                Salvar
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
