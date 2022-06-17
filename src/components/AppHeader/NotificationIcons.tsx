import { HStack, Icon } from '@chakra-ui/react';
import { RiNotificationLine, RiUserAddLine } from 'react-icons/ri';

export function NotificationIcons() {
  return (
    <HStack
      align="center"
      spacing="8"
      mx="8"
      borderColor="gray.700"
      borderRightWidth={1}
      pr="8"
      py="1"
      color="gray.300"
    >
      <Icon as={RiNotificationLine} fontSize="20" />
      <Icon as={RiUserAddLine} fontSize="20" />
    </HStack>
  );
}
