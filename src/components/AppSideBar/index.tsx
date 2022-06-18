import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue,
} from '@chakra-ui/react';

import { useDrawer } from '~/contexts';

import { NavSideBar } from './NavSideBar';

export function AppSideBar() {
  const { isOpen, onClose } = useDrawer();
  const isAttached = useBreakpointValue({ base: false, lg: true });

  if (isAttached) {
    return (
      <Box as="nav" w="64" mr="8">
        <NavSideBar />
      </Box>
    );
  }

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent bg="gray.800" p="4">
          <DrawerCloseButton mt="6" />
          <DrawerHeader>Navegação</DrawerHeader>

          <DrawerBody>
            <NavSideBar />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
