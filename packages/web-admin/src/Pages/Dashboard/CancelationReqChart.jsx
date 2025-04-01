/* eslint-disable react/prop-types */
import { Box, Text } from '@chakra-ui/react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useTranslation } from 'react-i18next';

ChartJS.register(ArcElement, Tooltip, Legend);

// @ts-ignore
const CancellationPieChart = ({ cancelData }) => {
  const { t } = useTranslation();

  const data = {
    labels: [ t('cancellation.chart.labels.initiated'), t('cancellation.chart.labels.rejected'), t('cancellation.chart.labels.approved'), t('cancellation.chart.labels.processing') ],
    datasets: [
      {
        label: t('dashboard.cancellation.title'),
        data: [
          cancelData?.total_cancel_req_initiated_appointment || 0,
          cancelData?.total_cancel_req_rejected_appointment || 0,
          cancelData?.total_cancel_req_approved_appointment || 0,
          cancelData?.total_cancel_req_processing_appointment || 0
        ],
        backgroundColor: [
          '#f39c12', // Color for initiated
          '#e74c3c', // Color for rejected
          '#2ecc71', // Color for approved
          '#3498db' // Color for processing
        ],
        hoverBackgroundColor: [
          '#f39c12aa',
          '#e74c3caa',
          '#2ecc71aa',
          '#3498dbaa'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        enabled: true
      }
    }
  };

  return (
    <Box p={4} borderRadius="md" maxW={'100%'} h={'100%'} border={'1px solid rgba(0,0,0,0.5)'}>
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        {t('cancellation.chart.title')}
      </Text>
      <Box h="300px">
        {/* @ts-ignore */}
        <Doughnut data={data} options={options} />
      </Box>
    </Box>
  );
};

export default CancellationPieChart;
