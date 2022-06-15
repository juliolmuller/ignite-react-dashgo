import { Box, Stack, Icon, Text, Link } from '@chakra-ui/react';
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from 'react-icons/ri';

export function AppSideBar() {
  return (
    <Box as="aside" w="64" mr="8">
      <Stack align="flex-start" spacing="12">
        <Box>
          <Text
            color="gray.400"
            fontSize="sm"
            fontWeight="bold"
            textTransform="uppercase"
          >
            Geral
          </Text>
          <Stack spacing="4" mt="8">
            <Link display="flex" alignItems="center" color="pink.400">
              <Icon as={RiDashboardLine} fontSize="20" />
              <Text ml="4" fontWeight="medium">
                Dashboard
              </Text>
            </Link>
            <Link display="flex" alignItems="center">
              <Icon as={RiContactsLine} fontSize="20" />
              <Text ml="4" fontWeight="medium">
                Usuários
              </Text>
            </Link>
          </Stack>
        </Box>
        <Box>
          <Text
            color="gray.400"
            fontSize="sm"
            fontWeight="bold"
            textTransform="uppercase"
          >
            Automação
          </Text>
          <Stack spacing="4" mt="8">
            <Link display="flex" alignItems="center">
              <Icon as={RiInputMethodLine} fontSize="20" />
              <Text ml="4" fontWeight="medium">
                Formulários
              </Text>
            </Link>
            <Link display="flex" alignItems="center">
              <Icon as={RiGitMergeLine} fontSize="20" />
              <Text ml="4" fontWeight="medium">
                Automação
              </Text>
            </Link>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
