import { Text } from '@chakra-ui/react';

export function Logo() {
  return (
    <Text
      w="64"
      fontSize={['2xl', '3xl']}
      fontWeight="bold"
      letterSpacing="tight"
      userSelect="none"
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
  );
}
