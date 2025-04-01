﻿/* eslint-disable react/prop-types */
import { Doughnut } from 'react-chartjs-2';
import { Box, Text, useTheme } from '@chakra-ui/react';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
import { useTranslation } from 'react-i18next';

// Register necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const statusColors = {
  Pending: '#f6e05e', // yellow
  Confirmed: '#48bb78', // green
  Rejected: '#f56565', // red
  Cancelled: 'red', // red
  Completed: '#3182ce', // blue
  Rescheduled: '#ed8936', // orange
  Visited: '#805ad5', // purple
  Unknown: 'gray' // purple
};

// @ts-ignore
const getStatusCounts = (appointments) => {
  const statusCounts = {
    Pending: 0,
    Confirmed: 0,
    Rejected: 0,
    Cancelled: 0,
    Completed: 0,
    Rescheduled: 0,
    Visited: 0,
    Unknown: 0
  };

  // @ts-ignore
  appointments.forEach((appointment) => {
    const status = appointment.status || 'Unknown';
    // @ts-ignore
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  });

  return statusCounts;
};

// @ts-ignore
function StatusPieChart({ appointments }) {
  const theme = useTheme();
  const { t } = useTranslation();

  const statusCounts = getStatusCounts(appointments || []);
  const chartData = {
    // Translate status labels
    labels: Object.keys(statusCounts).map(status => 
      status === 'Unknown' ? t('appointments.status.unknown') :
      status === 'Pending' ? t('appointments.status.pending') :
      status === 'Confirmed' ? t('appointments.status.confirmed') :
      status === 'Rejected' ? t('appointments.status.rejected') :
      status === 'Cancelled' ? t('appointments.status.cancelled') :
      status === 'Completed' ? t('appointments.status.completed') :
      status === 'Rescheduled' ? t('appointments.status.rescheduled') :
      status === 'Visited' ? t('appointments.status.visited') : status
    ),
    datasets: [
      {
        data: Object.values(statusCounts),
        // @ts-ignore
        backgroundColor: Object.keys(statusCounts).map(
          // @ts-ignore
          (status) => statusColors[status] || theme.colors.gray[500]
        ),
        borderWidth: 1
      }
    ]
  };

  return (
    <Box p={4} borderRadius="md" maxW={'100%'} >
      <Text mb={4}>{t('appointments.status.distribution')}</Text>
      {/* @ts-ignore */}
      <Doughnut data={chartData} />
    </Box>
  );
}

export default StatusPieChart;
