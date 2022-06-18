import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';

import { useDrawer } from '~/contexts';

import { Logo } from './Logo';
import { NotificationIcons } from './NotificationIcons';
import { Profile } from './Profile';
import { SearchBox } from './SearchBox';

export function AppHeader() {
  const { onOpen } = useDrawer();
  const isDisplayLg = useBreakpointValue({ base: false, lg: true });

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
      {!isDisplayLg && (
        <IconButton
          icon={<Icon as={RiMenuLine} />}
          variant="unstyled"
          mr="2"
          fontSize="24"
          onClick={onOpen}
          aria-label="abrir menu de navegação"
        />
      )}

      <Logo />

      {isDisplayLg && <SearchBox />}

      <Flex align="center" ml="auto">
        <NotificationIcons />

        <Profile showDetails={isDisplayLg} />
      </Flex>
    </Flex>
  );
}
