import { Box, Flex, SimpleGrid, Text, theme } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Props as ChartProps } from 'react-apexcharts';

import { AppHeader, AppSideBar } from '~/components';
import { withServerSideAuth } from '~/utils/ssr';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const chartOptions: ChartProps['options'] = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    borderColor: theme.colors.gray[700],
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      '2022-03-01T00:00:00.000Z',
      '2022-03-02T00:00:00.000Z',
      '2022-03-03T00:00:00.000Z',
      '2022-03-04T00:00:00.000Z',
      '2022-03-05T00:00:00.000Z',
      '2022-03-06T00:00:00.000Z',
      '2022-03-07T00:00:00.000Z',
    ],
  },
};

const chartSeries: ChartProps['series'] = [
  { name: 'series1', data: [30, 40, 120, 70, 80, 60, 70] },
];

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

          <SimpleGrid flex="1" gap="4" minChildWidth={320}>
            <Box borderRadius={8} bg="gray.800" p={['6', '8']} pb="4">
              <Text mb="4" fontSize="lg">
                Inscritos da semana
              </Text>

              <Chart
                type="area"
                height={160}
                options={chartOptions}
                series={chartSeries}
              />
            </Box>

            <Box borderRadius={8} bg="gray.800" p={['6', '8']} pb="4">
              <Text mb="4" fontSize="lg">
                Taxa de abertura
              </Text>

              <Chart
                type="area"
                height={160}
                options={chartOptions}
                series={chartSeries}
              />
            </Box>
          </SimpleGrid>
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps = withServerSideAuth(async () => {
  return {
    props: {},
  };
});
