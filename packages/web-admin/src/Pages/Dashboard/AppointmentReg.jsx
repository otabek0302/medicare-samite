/* eslint-disable react/prop-types */
import { Box, Flex, Text, useColorModeValue, Skeleton, Badge, IconButton, theme } from '@chakra-ui/react';
import { useState } from 'react';
import { HiDownload } from 'react-icons/hi';
import { FiEdit } from 'react-icons/fi';
import { daysBack } from '../../Controllers/dateConfig';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import moment from 'moment';
import DynamicTable from '../../Components/DataTable';
import getStatusBadge from '../../Hooks/StatusBadge';
import DateRangeCalender from '../../Components/DateRangeCalender';

// @ts-ignore
const filterRecentData = (data, lastDays, t) => {
  const lastDay = moment().subtract(lastDays, 'days').startOf('day');
  
  // @ts-ignore
  const filterData = data.filter((item) => {
    const createdAt = moment(item.created_at);
    return createdAt.isAfter(lastDay);
  });

  // @ts-ignore
  const rearrangedArray = filterData?.map((item) => {
    const { id, status, date, time_slots, type, payment_status, patient_f_name, patient_l_name, doct_f_name, doct_l_name, doct_image } = item;

    return {
      id: id,
      image: doct_image,
      [t('appointments.registration.columns.doctor')]: `${doct_f_name} ${doct_l_name}`,
      [t('appointments.registration.columns.patient')]: `${patient_f_name} ${patient_l_name}`,
      [t('appointments.registration.columns.status')]: getStatusBadge(status),
      [t('appointments.registration.columns.date')]: date,
      [t('appointments.registration.columns.timeSlots')]: time_slots,
      [t('appointments.registration.columns.type')]:
        type === 'Emergency' ? (
          <Badge colorScheme="red">{t('appointments.registration.types.emergency')}</Badge>
        ) : (
          <Badge colorScheme="green">{t('appointments.registration.types.regular')}</Badge>
        ),
      [t('appointments.registration.columns.paymentStatus')]:
        payment_status === 'Paid' ? (
          <Badge colorScheme="green">{t('appointments.registration.payment.paid')}</Badge>
        ) : payment_status === 'Refunded' ? (
          <Badge colorScheme="blue">{t('appointments.registration.payment.refunded')}</Badge>
        ) : (
          <Badge colorScheme="red">{t('appointments.registration.payment.notPaid')}</Badge>
        )
    };
  });
  // @ts-ignore
  return rearrangedArray.sort((a, b) => b.id - a.id);
};

const sevenDaysBack = moment().subtract(daysBack, 'days').format('YYYY-MM-DD');
const today = moment().format('YYYY-MM-DD');

// @ts-ignore
function AppointmentReg({ Appointments }) {
  const { t } = useTranslation();
  const [lastDays, setlastDays] = useState(daysBack);
  const [dateRange, setdateRange] = useState({ startDate: sevenDaysBack, endDate: today });
  const navigate = useNavigate();

  return (
    <Box
      p={4}
      borderRadius="md"
      maxW={'100%'}
      border={'1px solid rgba(0,0,0,0.5)'}
      bg={useColorModeValue('#fff', 'gray.900')}>
      <Flex mb={5} justify={'space-between'} align={'center'}>
        <Text fontSize="Lg" fontWeight="bold">
          {t('appointments.registration.title', { days: lastDays })}
        </Text>
        <DateRangeCalender
          size={'sm'}
          dateRange={dateRange}
          setDateRange={setdateRange}
          setLastDays={setlastDays}
        />
      </Flex>
      <Box>
        {!Appointments ? (
          <Box>
            <Skeleton
              h={10}
              w={'100%'}
              mt={2}
            />
            <Skeleton
              h={10}
              w={'100%'}
              mt={2}
            />
            <Skeleton
              h={10}
              w={'100%'}
              mt={2}
            />
            <Skeleton
              h={10}
              w={'100%'}
              mt={2}
            />
            <Skeleton
              h={10}
              w={'100%'}
              mt={2}
            />
            <Skeleton
              h={10}
              w={'100%'}
              mt={2}
            />
            <Skeleton
              h={10}
              w={'100%'}
              mt={2}
            />
            <Skeleton
              h={10}
              w={'100%'}
              mt={2}
            />
            <Skeleton
              h={10}
              w={'100%'}
              mt={2}
            />
            <Skeleton
              h={10}
              w={'100%'}
              mt={2}
            />
          </Box>
        ) : (
          <Box
            maxH={80}
            overflow={'scroll'}>
            {/* @ts-ignore */}
            <DynamicTable
              minPad={'10px 5px'}
              data={filterRecentData(Appointments, lastDays, t)}
              // @ts-ignore
              onActionClick={<YourActionButton navigate={navigate} />}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default AppointmentReg;

// @ts-ignore
const YourActionButton = ({ rowData, navigate }) => {
  return (
    <Flex justify={'center'}>
      <IconButton
        aria-label="Download"
        size={'sm'}
        variant={'ghost'}
        _hover={{
          background: 'none'
        }}
        onClick={() => {
          navigate(`/appointment/${rowData.id}`);
        }}
        icon={
          <HiDownload
            fontSize={18}
            color={theme.colors.green[500]}
          />
        }
      />
      <IconButton
        aria-label="Edit"
        size={'sm'}
        variant={'ghost'}
        _hover={{
          background: 'none'
        }}
        onClick={() => {
          navigate(`/appointment/${rowData.id}`);
        }}
        icon={
          <FiEdit
            fontSize={18}
            color={theme.colors.blue[500]}
          />
        }
      />
    </Flex>
  );
};
