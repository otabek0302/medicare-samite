﻿/* eslint-disable react/prop-types */
import { Box, Button, Flex, Text, Menu, MenuButton, MenuList, MenuItem, useColorModeValue, useTheme } from '@chakra-ui/react';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend} from 'chart.js';
import { AiOutlineDown } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';

import moment from 'moment';

ChartJS.register(LineElement,CategoryScale,LinearScale,PointElement,Title,Tooltip,Legend);

// @ts-ignore
const getTransparentColor = (color, alpha) => {
  // Convert the color to RGB format if needed
  // @ts-ignore
  const rgb = color.replace(/^#/, '').match(/.{2}/g).map((hex) => parseInt(hex, 16));
  return `rgba(${rgb.join(', ')}, ${alpha})`;
};

// @ts-ignore
const getAppointmentsForLast30Days = (appointments, lastDays) => {
  const now = moment();
  const past30Days = moment().subtract(lastDays, 'days');

  const appointmentsPerDay = {};

  // @ts-ignore
  appointments.forEach((appointment) => {
    const appointmentDate = moment(appointment.date);

    if (appointmentDate.isBetween(past30Days, now, null, '[]')) {
      const day = appointmentDate.format('YYYY-MM-DD');
      // @ts-ignore
      if (!appointmentsPerDay[day]) {
        // @ts-ignore
        appointmentsPerDay[day] = 0;
      }
      // @ts-ignore
      appointmentsPerDay[day]++;
    }
  });

  // Generate a list of dates for the last 30 days
  const dateRange = [];
  let currentDate = past30Days.clone();
  while (currentDate.isBefore(now, 'day')) { dateRange.push(currentDate.format('YYYY-MM-DD')); currentDate.add(1, 'day')}

  // Fill in missing days with zero counts
  // @ts-ignore
  const data = dateRange.map((date) => ({
    date,
    // @ts-ignore
    count: appointmentsPerDay[date] || 0
  }));

  return data;
};

// @ts-ignore 
function AppointmentChart({ appointments, cancelledAppointments, completedAppointments }) {
  const { t } = useTranslation();
  const [lastDays, setlastDays] = useState(15);
  const theme = useTheme();
  const data = getAppointmentsForLast30Days(appointments || [], lastDays);
  
  const cancelledData = getAppointmentsForLast30Days(
    cancelledAppointments || [],
    lastDays
  );
  
  const completedData = getAppointmentsForLast30Days(
    completedAppointments || [],
    lastDays
  );

  // Create an object to unify the dates of both datasets
  const allDates = new Set([
    ...data.map((d) => d.date),
    ...cancelledData.map((d) => d.date)
  ]);

  const sortedDates = Array.from(allDates).sort();

  // Create data points for both datasets
  const chartData = {
    labels: sortedDates,
    datasets: [
      {
        label: t('appointments.chart.labels.all'),
        data: sortedDates.map(
          (date) => data.find((d) => d.date === date)?.count || 0
        ),
        borderColor: theme.colors.blue[500],
        backgroundColor: getTransparentColor(theme.colors.blue[500], 5), // Transparent fill color
        borderWidth: 2,
        fill: 'origin',
        tension: 0.2 // Curved lines
      },
      {
        label: t('appointments.chart.labels.cancelled'),
        data: sortedDates.map(
          (date) => cancelledData.find((d) => d.date === date)?.count || 0
        ),
        borderColor: theme.colors.red[500],
        backgroundColor: getTransparentColor(theme.colors.red[500], 5), // Transparent fill color
        borderWidth: 2,
        fill: true,
        tension: 0.2 // Curved lines
      },
      {
        label: t('appointments.chart.labels.completed'),
        data: sortedDates.map(
          (date) => completedData.find((d) => d.date === date)?.count || 0
        ),
        borderColor: theme.colors.green[500],
        backgroundColor: getTransparentColor(theme.colors.green[500], 5), // Transparent fill color
        borderWidth: 2,
        fill: true,
        tension: 0.2 // Curved lines
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
      boxShadow="md"
      maxW={'100%'}
      border={'1px solid rgba(0,0,0,0.5)'}
      bg={useColorModeValue('#fff', 'gray.900')}>
      <Flex
        mb={5}
        justify={'space-between'}
        align={'center'}>
        {' '}
        <Text
          fontSize="lg"
          fontWeight="bold">
          {t('appointments.chart.title', { days: lastDays })}
        </Text>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<AiOutlineDown />}
            size={'sm'}>
            {t('appointments.chart.lastDays', { days: lastDays })}
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
                {t('appointments.chart.lastDays', { days: item })}
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

export default AppointmentChart;
