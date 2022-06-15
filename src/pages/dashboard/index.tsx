import { Flex } from '@chakra-ui/react';
import Head from 'next/head';

import { AppHeader, AppSideBar } from '~/components';

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>Dashboard | Dashgo</title>
      </Head>

      <Flex direction="column" h="100vh">
        <AppHeader />

        <Flex w="100%" maxW={1480} mx="auto" my="6" px="6">
          <AppSideBar />
        </Flex>
      </Flex>
    </>
  );
}
