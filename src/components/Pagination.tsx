import { Box, Button, Flex } from '@chakra-ui/react';

export interface PaginationProps {}

export function Pagination({ ...props }: PaginationProps) {
  return (
    <Flex justify="space-between" align="center" gap="6" mt="8">
      <Box>
        <strong>1</strong> - <strong>10</strong> de 100
      </Box>

      <Flex gap="2">
        <Button
          disabled
          size="sm"
          w="4"
          colorScheme="pink"
          fontSize="xs"
          _disabled={{
            bg: 'pink.500',
            cursor: 'default',
          }}
        >
          1
        </Button>
        <Button
          size="sm"
          w="4"
          bg="gray.700"
          fontSize="xs"
          _hover={{ bg: 'gray.500' }}
        >
          2
        </Button>
        <Button
          size="sm"
          w="4"
          bg="gray.700"
          fontSize="xs"
          _hover={{ bg: 'gray.500' }}
        >
          3
        </Button>
        <Button
          size="sm"
          w="4"
          bg="gray.700"
          fontSize="xs"
          _hover={{ bg: 'gray.500' }}
        >
          4
        </Button>
      </Flex>
    </Flex>
  );
}
