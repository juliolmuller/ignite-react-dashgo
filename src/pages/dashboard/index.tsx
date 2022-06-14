import Head from 'next/head';

import { AppHeader } from '~/components';

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>Dashboard | Dashgo</title>
      </Head>

      <AppHeader />
    </>
  );
}
