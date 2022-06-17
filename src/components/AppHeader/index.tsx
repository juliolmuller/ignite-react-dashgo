import { Flex } from '@chakra-ui/react';

import { Logo } from './Logo';
import { NotificationIcons } from './NotificationIcons';
import { Profile } from './Profile';
import { SearchBox } from './SearchBox';

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
      <Logo />

      <SearchBox />

      <Flex align="center" ml="auto">
        <NotificationIcons />

        <Profile />
      </Flex>
    </Flex>
  );
}
