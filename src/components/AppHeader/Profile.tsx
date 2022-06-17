import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

export function Profile() {
  return (
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
  );
}
