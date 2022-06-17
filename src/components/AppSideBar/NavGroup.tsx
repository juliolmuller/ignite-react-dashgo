import { Box, Stack, Text } from '@chakra-ui/react';
import { ReactElement } from 'react';

import { NavLinkProps } from './NavLink';

export interface NavGroupProps {
  children: ReactElement<NavLinkProps> | ReactElement<NavLinkProps>[];
  title: string;
}

export function NavGroup({ children, title }: NavGroupProps) {
  return (
    <Box>
      <Text
        color="gray.400"
        fontSize="sm"
        fontWeight="bold"
        textTransform="uppercase"
      >
        {title}
      </Text>

      <Stack spacing="4" mt="8">
        {children}
      </Stack>
    </Box>
  );
}
