import { Avatar, Box, Flex, HStack, Icon, Input, Text } from '@chakra-ui/react';
import {
  RiNotificationLine,
  RiSearchLine,
  RiUserAddLine,
} from 'react-icons/ri';

export function AppHeader() {
  return (
    <Flex
      as="header"
      align="center"
      h="20"
      w="100%"
      maxW={1480}
      mx="auto"
      mt="4"
      px="6"
    >
      <Text
        w="64"
        fontSize="3xl"
        fontWeight="bold"
        letterSpacing="tight"
        _after={{
          content: '"."',
          ml: '1',
          color: 'pink.500',
          fontSize: '4xl',
          fontWeight: 'bold',
        }}
      >
        dashgo
      </Text>

      <Flex
        as="label"
        pos="relative"
        flex="1"
        alignSelf="center"
        maxW={400}
        borderRadius="full"
        ml="6"
        bg="gray.800"
        px="8"
        py="4"
        color="gray.200"
      >
        <Input
          placeholder="Buscar na plataforma"
          type="search"
          variant="unstyled"
          px="4"
          mr="4"
          color="gray.50"
          _placeholder={{ color: 'gray.400' }}
        />

        <Icon as={RiSearchLine} fontSize="20" />
      </Flex>

      <Flex align="center" ml="auto">
        <HStack
          align="center"
          spacing="8"
          mx="8"
          borderColor="gray.700"
          borderRightWidth={1}
          pr="8"
          py="1"
          color="gray.300"
        >
          <Icon as={RiNotificationLine} fontSize="20" />
          <Icon as={RiUserAddLine} fontSize="20" />
        </HStack>

        <Flex align="center">
          <Box mr="4" textAlign="right">
            <Text>Júlio L. Müller</Text>
            <Text color="gray.300" fontSize="small">
              juliolmuller@email.com
            </Text>
          </Box>

          <Avatar
            name="Júlio L. Müller"
            src="https://github.com/juliolmuller.png"
            size="md"
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
