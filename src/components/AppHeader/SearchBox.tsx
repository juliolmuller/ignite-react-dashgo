import { Flex, Icon, Input } from '@chakra-ui/react';
import { RiSearchLine } from 'react-icons/ri';

export function SearchBox() {
  return (
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
  );
}
