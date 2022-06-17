import { Icon, Link, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';

export interface NavLinkProps {
  children: string | string[];
  icon: IconType;
}

export function NavLink({ children, icon }: NavLinkProps) {
  return (
    <Link display="flex" alignItems="center" color="pink.400">
      <Icon as={icon} fontSize="20" />

      <Text ml="4" fontWeight="medium">
        {children}
      </Text>
    </Link>
  );
}
