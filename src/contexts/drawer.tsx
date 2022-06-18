import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useEffect } from 'react';

export type DrawerContextProps = UseDisclosureReturn;

export interface DrawerProviderProps {
  children: ReactNode;
}

export const DrawerContext = createContext({} as DrawerContextProps);

export function DrawerProvider({ children }: DrawerProviderProps) {
  const disclosure = useDisclosure();
  const { asPath } = useRouter();

  useEffect(() => {
    disclosure.onClose();
  }, [asPath]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <DrawerContext.Provider value={disclosure}>
      {children}
    </DrawerContext.Provider>
  );
}

export function useDrawer() {
  return useContext(DrawerContext);
}
