/* eslint-disable react/prop-types */
import { Box, Flex, Text, useColorModeValue, Skeleton } from '@chakra-ui/react';
import { useState } from 'react';
import { daysBack } from '../../Controllers/dateConfig';
import { useTranslation } from 'react-i18next';

import moment from 'moment';
import DynamicTable from '../../Components/DataTable';
import DateRangeCalender from '../../Components/DateRangeCalender';

// @ts-ignore
const filterRecentData = (data, lastDays) => {
  const lastDay = moment().subtract(lastDays, 'days').startOf('day');
  // @ts-ignore
  const filterData = data?.filter((item) => {
    const createdAt = moment(item.created_at);
    return createdAt.isAfter(lastDay);
  });
  // @ts-ignore
  return filterData.map((item) => ({
    id: item.id,
    image: item.image,
    name: `${item.f_name} ${item.l_name}`,
    phone: item.phone,
    gender: item.gender
  }));
};

const sevenDaysBack = moment().subtract(daysBack, 'days').format('YYYY-MM-DD');
const today = moment().format('YYYY-MM-DD');

// @ts-ignore
function UsersReg({ Users }) {
  const { t } = useTranslation();
  const [lastDays, setlastDays] = useState(daysBack);
  const [dateRange, setdateRange] = useState({
    startDate: sevenDaysBack,
    endDate: today
  });

  return (
    <Box
      p={4}
      borderRadius="md"
      maxW={'100%'}
      bg={useColorModeValue('#fff', 'gray.900')}>
      <Flex
        mb={5}
        justify={'space-between'}
        align={'center'}
        gap={5}>
        <Text
          fontSize="md"
          fontWeight="bold">
          {t('registration.users.title', { days: lastDays })}
        </Text>
        <DateRangeCalender
          size={'sm'}
          dateRange={dateRange}
          setDateRange={setdateRange}
          setLastDays={setlastDays}
        />
      </Flex>
      <Box>
        {!Users ? (
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
            maxH={96}
            overflow={'scroll'}>
            {/* @ts-ignore */}
            <DynamicTable
              minPad={'10px 5px'}
              data={filterRecentData(Users, lastDays)}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default UsersReg;
