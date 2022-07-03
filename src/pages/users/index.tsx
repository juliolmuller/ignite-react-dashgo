import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  IconButton,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react';
import Head from 'next/head';
import NextLink from 'next/link';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { useQuery } from 'react-query';

import { AppHeader, AppSideBar, Pagination } from '~/components';
import { UserModel } from '~/services/mirage';

export default function UsersPage() {
  const isDisplayMd = useBreakpointValue({ base: false, md: true });
  const {
    data: users = [],
    isLoading,
    isFetching,
  } = useQuery('users', async () => {
    const response = await fetch('/api/users');
    const data = await response.json();
    return data.users as UserModel[];
  });

  return (
    <>
      <Head>
        <title>Usuários | Dashgo</title>
      </Head>

      <Flex direction="column" h="100vh">
        <AppHeader />

        <Flex w="100%" maxW={1480} mx="auto" my="6" px="6">
          <AppSideBar />

          <Box flex="1" borderRadius={8} bg="gray.800" p="8">
            <Flex align="center" justify="space-between" mb="8">
              <Heading size="lg" fontWeight="normal">
                Lista de Usuários
                {isFetching && !isLoading && (
                  <Spinner size="sm" color="gray.500" ml="4" />
                )}
              </Heading>

              <NextLink href="/users/create" passHref>
                <Button
                  as="a"
                  colorScheme="pink"
                  size="sm"
                  fontSize="sm"
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                  Criar novo
                </Button>
              </NextLink>
            </Flex>

            {isLoading ? (
              <Flex justify="center" py="40">
                <Spinner />
              </Flex>
            ) : (
              <>
                <Table colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      <Th w="8" px={['2', '4', '6']} color="gray.300">
                        <Checkbox colorScheme="pink" />
                      </Th>
                      <Th>Usuário</Th>
                      {isDisplayMd && <Th>Data de criação</Th>}
                      <Th w="8" />
                    </Tr>
                  </Thead>
                  <Tbody>
                    {users.map((user) => (
                      <Tr key={user.id}>
                        <Td px={['2', '4', '6']}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <Text fontWeight="bold">{user.name}</Text>
                            <Text fontSize="sm" color="gray.300">
                              user.email
                            </Text>
                          </Box>
                        </Td>
                        {isDisplayMd && (
                          <Td>
                            {new Date(user.createdAt).toLocaleDateString(
                              'pt-BR',
                              {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              },
                            )}
                          </Td>
                        )}
                        <Td>
                          {isDisplayMd ? (
                            <Button
                              as="a"
                              colorScheme="purple"
                              size="sm"
                              fontSize="sm"
                              leftIcon={
                                <Icon as={RiPencilLine} fontSize="16" />
                              }
                            >
                              Editar
                            </Button>
                          ) : (
                            <IconButton
                              as="a"
                              icon={<Icon as={RiPencilLine} fontSize="16" />}
                              colorScheme="purple"
                              size="sm"
                              fontSize="sm"
                              aria-label="Editar"
                            />
                          )}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>

                <Pagination />
              </>
            )}
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
