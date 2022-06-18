import { Icon, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { IconType } from 'react-icons/lib';

export interface NavLinkProps {
  children: string | string[];
  href: string;
  icon: IconType;
}

export function NavLink({ children, href, icon }: NavLinkProps) {
  const { asPath } = useRouter();

  return (
    <NextLink href={href} passHref>
      <Link
        display="flex"
        alignItems="center"
        color={asPath.startsWith(href) ? 'pink.400' : undefined}
      >
        <Icon as={icon} fontSize="20" />

        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </Link>
    </NextLink>
  );
}
