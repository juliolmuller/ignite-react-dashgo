import { Button, ButtonProps } from '@chakra-ui/react';

export interface PageButtonProps extends ButtonProps {
  children: number | string;
  active?: boolean;
}

export function PageButton({ active, children, ...props }: PageButtonProps) {
  if (active) {
    return (
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
        {...props}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      w="4"
      bg="gray.700"
      fontSize="xs"
      _hover={{ bg: 'gray.500' }}
      {...props}
    >
      {children}
    </Button>
  );
}
