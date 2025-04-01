/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { Badge, Box, Flex, IconButton, Input, Skeleton, useToast, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { FiEdit } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { GET } from '../../Controllers/ApiControllers';
import { Link } from 'react-router-dom';
import { daysBack } from '../../Controllers/dateConfig';

import admin from '../../Controllers/admin';
import moment from 'moment';
import DynamicTable from '../../Components/DataTable';
import Invoices from '../Invoices/Invoices';
import AppointmentPayments from '../Payments/Payments';
import Pagination from '../../Components/Pagination';
import useDebounce from '../../Hooks/UseDebounce';
import useHasPermission from '../../Hooks/HasPermission';
import NotAuth from '../../Components/NotAuth';
import DateRangeCalender from '../../Components/DateRangeCalender';
import { useTranslation } from 'react-i18next';

// @ts-ignore
const txnBadge = (txn, t) => {
  switch (txn) {
    case 'Credited':
      return (
        <Badge
          colorScheme="green"
          fontSize={12}
          letterSpacing={0.5}
          p={'5px'}
          size={'sm'}>
          {t('transactions.index.badge.credited')}
        </Badge>
      );
    case 'Debited':
      return (
        <Badge
          colorScheme="red"
          fontSize={12}
          letterSpacing={0.5}
          p={'5px'}>
          {t('transactions.index.badge.debited')}
        </Badge>
      );
    default:
      return (
        <Badge
          colorScheme="yellow"
          fontSize={12}
          letterSpacing={0.5}
          p={'5px'}>
          {t('transactions.index.badge.na')}
        </Badge>
      );
  }
};

export default function Transactions() {
  const { t } = useTranslation();
  return (
    <Box>
      <Tabs>
        <TabList>
          <Tab>{t('transactions.index.tabs.all')}</Tab>
          <Tab>{t('transactions.index.tabs.appointmentPayments')}</Tab>
          <Tab>{t('transactions.index.tabs.invoices')}</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <AllTransactions />
          </TabPanel>
          <TabPanel>
            <AppointmentPayments />
          </TabPanel>
          <TabPanel>
            <Invoices />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

// @ts-ignore
const getPageIndices = (currentPage, itemsPerPage) => { const startIndex = (currentPage - 1) * itemsPerPage; let endIndex = startIndex + itemsPerPage - 1; return { startIndex, endIndex } };
const sevenDaysBack = moment().subtract(daysBack, 'days').format('YYYY-MM-DD');
const today = moment().format('YYYY-MM-DD');

function AllTransactions() {
  const { t } = useTranslation();
  const { hasPermission } = useHasPermission();
  const [page, setPage] = useState(1);
  const boxRef = useRef(null);
  const [searchQuery, setsearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);
  const toast = useToast();
  const id = 'Errortoast';
  const [dateRange, setdateRange] = useState({
    startDate: sevenDaysBack,
    endDate: today
  });

  const start_date = moment(dateRange.startDate).format('YYYY-MM-DD');
  const end_date = moment(dateRange.endDate).format('YYYY-MM-DD');

  const getData = async () => {
    const { startIndex, endIndex } = getPageIndices(page, 50);
    const url = admin.role.name === 'Doctor' ? `get_all_transactions/doctor_id/page?start=${startIndex}&end=${endIndex}&search=${debouncedSearchQuery}&start_date=${start_date}&end_date=${end_date}&doctor_id=${admin.id}` : `get_all_transactions/page?start=${startIndex}&end=${endIndex}&search=${debouncedSearchQuery}&start_date=${start_date}&end_date=${end_date}`;
    const res = await GET(admin.token, url);
    // @ts-ignore
    const rearrangedTransactions = res?.data.map((transaction) => {
    const { id, user_id, patient_id, appointment_id, payment_transaction_id, amount, transaction_type, is_wallet_txn, notes, created_at, patient_f_name, patient_l_name, user_f_name, user_l_name } = transaction;
    
    return {
        id,
        patient: patient_id ? (
          <Link to={`/patient/${patient_id}`}>
            {`${patient_f_name} ${patient_l_name}`}
          </Link>
        ) : (
          t('transactions.index.badge.na')
        ),
        user: user_id ? (
          <Link to={`/user/${user_id}`}>{`${user_f_name} ${user_l_name}`}</Link>
        ) : (
          t('transactions.index.badge.na')
        ),
        'app ID': (
          <Link to={`/appointment/${appointment_id}`}>{appointment_id}</Link>
        ),
        'txn ID': payment_transaction_id || t('transactions.index.badge.na'),
        amount,
        'txn type': txnBadge(transaction_type, t),
        'wallet Txn': is_wallet_txn == 1 ? t('transactions.index.badge.yes') : t('transactions.index.badge.no'),
        notes: notes || t('transactions.index.badge.na'),
        createdAt: moment(created_at).format('D MMM YY hh:mmA')
      };
    });
    return { data: rearrangedTransactions, total_record: res.total_record };
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ['transactions', page, debouncedSearchQuery, dateRange],
    queryFn: getData
  });

  // @ts-ignore
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const totalPage = Math.ceil(data?.total_record / 50);

  useEffect(() => {
    if (boxRef.current) {
      // @ts-ignore
      boxRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [page]);

  if (error) {
    if (!toast.isActive(id)) {
      toast({
        id,
        title: t('transactions.index.messages.error.title'),
        description: t('transactions.index.messages.error.description'),
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top'
      });
    }
  }

  if (!hasPermission('ALL_TRANSACTION_VIEW')) return <NotAuth />;

  return (
    <Box ref={boxRef}>
      {isLoading || !data ? (
        <Box>
          <Flex mb={5} justify={'space-between'}>
            <Skeleton w={400} h={8} />
            <Skeleton w={50} h={8} />
          </Flex>
          <Skeleton h={300} w={'100%'} />
        </Box>
      ) : (
        <Box>
          <Flex
            mb={5}
            justify={'space-between'}
            align={'center'}>
            <Flex
              align={'center'}
              gap={4}>
              <Input
                size={'md'}
                placeholder="Search"
                w={400}
                maxW={'50vw'}
                onChange={(e) => setsearchQuery(e.target.value)}
                value={searchQuery}
              />
              {/* @ts-ignore */}
              <DateRangeCalender
                dateRange={dateRange}
                setDateRange={setdateRange}
                size={'md'}
              />
            </Flex>
          </Flex>
          {/* @ts-ignore */}
          <DynamicTable
            data={data?.data}
            // @ts-ignore
            onActionClick={<YourActionButton />}
          />
        </Box>
      )}
      <Flex
        justify={'center'}
        mt={4}>
        <Pagination
          currentPage={page}
          onPageChange={handlePageChange}
          totalPages={totalPage}
        />
      </Flex>
    </Box>
  );
}

// @ts-ignore
const YourActionButton = ({ onClick, rowData }) => {
  const { t } = useTranslation();
  return (
    <Flex justify={'center'}>
      <IconButton
        aria-label={t('transactions.index.buttons.edit')}
        size={'sm'}
        variant={'ghost'}
        _hover={{
          background: 'none'
        }}
        onClick={() => {
          onClick(rowData);
        }}
        icon={
          <FiEdit
            fontSize={18}
            color={'blue.500'}
          />
        }
      />
    </Flex>
  );
};
