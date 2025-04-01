/* eslint-disable react/prop-types */
import { Doughnut } from 'react-chartjs-2';
import { Box, Text, useTheme } from '@chakra-ui/react';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js';
import currency from '../../Controllers/currency';
import { useTranslation } from 'react-i18next';

// Register necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const transactionColors = {
  Credited: '#48bb78', // green
  Debited: '#f56565' // red (for debited transactions)
};

// @ts-ignore
const getTransactionTotals = (transactions) => {
  const transactionTotals = {
    Credited: 0,
    Debited: 0 // Changed from Debited to Refunded
  };

  // @ts-ignore
  transactions.forEach((transaction) => {
    const type = transaction.transaction_type || 'Unknown';

    if (type === 'Credited' || type === 'Debited') {
      // Map Debited to Refunded
      const mappedType = type === 'Debited' ? 'Debited' : type;
      // @ts-ignore
      transactionTotals[mappedType] += transaction.amount;
    }
  });

  return transactionTotals;
};

// @ts-ignore
function TransactionPieChart({ transactions }) {
  const { t } = useTranslation();
  const theme = useTheme();

  const transactionTotals = getTransactionTotals(transactions || []);

  const chartData = {
    labels: Object.keys(transactionTotals),
    datasets: [
      {
        data: Object.values(transactionTotals),
        backgroundColor: Object.keys(transactionTotals).map(
          // @ts-ignore
          (type) => transactionColors[type] || theme.colors.gray[500]
        ),
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    cutout: '50%', // Adjust the cutout for doughnut thickness (half-doughnut)
    rotation: -90, // Start angle (beginning of half-doughnut)
    circumference: 180, // Half circle (180 degrees)
    plugins: {
      legend: {
        // @ts-ignore
        position: 'bottom'
      },
      tooltip: {
        callbacks: {
          // @ts-ignore
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            return `${currency} ${value.toLocaleString()}`; // Format value as currency
          }
        }
      }
    }
  };

  return (
    <Box
      p={4}
      borderRadius="md"
      maxW={'100%'}>
      <Text mb={4}>{t('transactions.chart.distribution')}</Text>
      <Doughnut
        data={chartData}
        // @ts-ignore
        options={options}
        width={50}
      />
    </Box>
  );
}

export default TransactionPieChart;
