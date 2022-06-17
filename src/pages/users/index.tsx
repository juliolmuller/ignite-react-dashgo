import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import Head from 'next/head';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';

import { AppHeader, AppSideBar } from '~/components';

export default function DashboardPage() {
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
              </Heading>

              <Button
                as="a"
                colorScheme="pink"
                size="sm"
                fontSize="sm"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </Flex>

            <Table colorScheme="whiteAlpha">
              <Thead>
                <Tr>
                  <Th w="8" px="6" color="gray.300">
                    <Checkbox colorScheme="pink" />
                  </Th>
                  <Th>Usuário</Th>
                  <Th>Data de criação</Th>
                  <Th w="8" />
                </Tr>
              </Thead>
              <Tbody>
                {Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <Tr key={index}>
                      <Td px="6">
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight="bold">Julio L. Muller</Text>
                          <Text fontSize="sm" color="gray.300">
                            juliolmuller@email.com
                          </Text>
                        </Box>
                      </Td>
                      <Td>30 de março de 1992</Td>
                      <Td>
                        <Button
                          as="a"
                          colorScheme="purple"
                          size="sm"
                          fontSize="sm"
                          leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                        >
                          Editar
                        </Button>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
