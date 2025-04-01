/* eslint-disable react/prop-types */
import { AiOutlineDown } from 'react-icons/ai';
import { Box, Button, Flex, Text, Menu, MenuButton, MenuList, MenuItem, useColorModeValue, useTheme } from '@chakra-ui/react';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
// Import PointElement Title, Tooltip, Legend, TimeScale 
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import { useTranslation } from 'react-i18next';
import 'chartjs-adapter-moment'; // Import the Moment adapter

import moment from 'moment';

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement, // Register PointElement
  Title,
  Tooltip,
  Legend,
  TimeScale
);

// @ts-ignore
const getTransparentColor = (color, alpha) => {
  const rgb = color
    .replace(/^#/, '')
    .match(/.{2}/g)
    // @ts-ignore
    .map((hex) => parseInt(hex, 16));
  return `rgba(${rgb.join(', ')}, ${alpha})`;
};

// @ts-ignore
const getTransactionsForLastDays = (transactions, lastDays) => {
  const now = moment();
  const pastDays = moment().subtract(lastDays, 'days');

  const transactionsPerDay = {};

  // @ts-ignore
  transactions.forEach((transaction) => {
    const txnDate = moment(transaction.created_at);

    if (txnDate.isBetween(pastDays, now, null, '[]')) {
      const day = txnDate.format('YYYY-MM-DD');
      // @ts-ignore
      if (!transactionsPerDay[day]) {
        // @ts-ignore
        transactionsPerDay[day] = 0;
      }
      // @ts-ignore
      transactionsPerDay[day] += parseFloat(transaction.amount);
    }
  });

  const dateRange = [];
  let currentDate = pastDays.clone();
  while (currentDate.isBefore(now, 'day')) {
    dateRange.push(currentDate.format('YYYY-MM-DD'));
    currentDate.add(1, 'day');
  }

  const data = dateRange.map((date) => ({
    date,
    // @ts-ignore
    amount: transactionsPerDay[date] || 0
  }));

  return data;
};

// @ts-ignore
function TransactionChart({ creditTransactions, debitTransactions }) {
  const { t } = useTranslation();
  const [lastDays, setlastDays] = useState(15);
  const theme = useTheme();
  const creditData = getTransactionsForLastDays(
    creditTransactions || [],
    lastDays
  );
  const debitData = getTransactionsForLastDays(
    debitTransactions || [],
    lastDays
  );

  const allDates = new Set([
    ...creditData.map((d) => d.date),
    ...debitData.map((d) => d.date)
  ]);
  const sortedDates = Array.from(allDates).sort();

  const chartData = {
    labels: sortedDates,
    datasets: [
      {
        label: 'Credit',
        data: sortedDates.map(
          (date) => creditData.find((d) => d.date === date)?.amount || 0
        ),
        borderColor: theme.colors.green[500],
        backgroundColor: getTransparentColor(theme.colors.green[500], 3),
        borderWidth: 2,
        fill: true,
        tension: 0.2
      },
      {
        label: 'Debit',
        data: sortedDates.map(
          (date) => debitData.find((d) => d.date === date)?.amount || 0
        ),
        borderColor: theme.colors.red[500],
        backgroundColor: getTransparentColor(theme.colors.red[500], 3),
        borderWidth: 2,
        fill: true,
        tension: 0.2
      }
    ]
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'nearest',
      axis: 'xy',
      intersect: false
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: lastDays > 179 ? 'month' : lastDays > 89 ? 'week' : 'day'
        },
        border: {
          color: useColorModeValue(
            theme.colors.gray[600],
            theme.colors.gray[300]
          ) // Change y-axis line color
        },
        grid: {
          display: false
        },
        ticks: {
          color: useColorModeValue(
            theme.colors.gray[600],
            theme.colors.gray[400]
          )
        }
      },
      y: {
        border: {
          color: useColorModeValue(
            theme.colors.gray[600],
            theme.colors.gray[300]
          ) // Change y-axis line color
        },
        grid: {
          display: false
        },
        ticks: {
          color: useColorModeValue(
            theme.colors.gray[600],
            theme.colors.gray[400]
          )
        }
      }
    },
    // @ts-ignore
    onHover: (event, chartElement) => {
      if (chartElement.length) {
        event.native.target.style.cursor = 'pointer';
      } else {
        event.native.target.style.cursor = 'default';
      }
    }
  };

  return (
    <Box
      p={4}
      borderRadius="md"
      maxW={'100%'}
      bg={useColorModeValue('#fff', 'gray.900')}>
      <Flex
        mb={5}
        justify={'space-between'}
        align={'center'}>
        <Text
          fontSize="lg"
          fontWeight="bold">
          {t('transactions.chart.title', { days: lastDays })}
        </Text>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<AiOutlineDown />}
            size={'sm'}>
            {t('transactions.chart.lastDays', { days: lastDays })}
          </MenuButton>
          <MenuList>
            {[15, 30, 90, 180, 365].map((item) => (
              <MenuItem
                bg={item === lastDays ? 'gray.200' : 'transparent'}
                key={item}
                onClick={() => {
                  setlastDays(item);
                }}
                fontSize={'sm'}>
                {t('transactions.chart.lastDays', { days: item })}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>

      <Line
        data={chartData}
        // @ts-ignore
        options={options}
      />
    </Box>
  );
}

export default TransactionChart;
