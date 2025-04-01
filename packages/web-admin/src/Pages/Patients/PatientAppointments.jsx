﻿/* eslint-disable react/prop-types */
import { Badge, Box, Flex, IconButton, Input, Skeleton, theme, useToast } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { GET } from '../../Controllers/ApiControllers';

import admin from '../../Controllers/admin';
import DynamicTable from '../../Components/DataTable';
import getStatusBadge from '../../Hooks/StatusBadge';
import getCancellationStatusBadge from '../../Hooks/CancellationReqBadge';
import Pagination from '../../Components/Pagination';
import useDebounce from '../../Hooks/UseDebounce';
import ErrorPage from '../../Components/ErrorPage';
import useHasPermission from '../../Hooks/HasPermission';
import NotAuth from '../../Components/NotAuth';

// @ts-ignore
export default function PatientAppointemnts({ patientID }) {
  const navigate = useNavigate();
  const toast = useToast();
  const id = 'Errortoast';
  const [page, setPage] = useState(1);
  const boxRef = useRef(null);
  const [searchQuery, setsearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);
  const { hasPermission } = useHasPermission();

  const getData = async () => {
    const url = `get_appointments/patient/${patientID}`;

    const res = await GET(admin.token, url);
    // @ts-ignore
    const rearrangedArray = res?.data.map((item) => {
      const { id, status, date, time_slots, type, payment_status, current_cancel_req_status, patient_f_name, patient_l_name, patient_phone, doct_f_name, doct_l_name, doct_image, source } = item;

      return {
        id: id,
        image: doct_image,
        Doctor: `${doct_f_name} ${doct_l_name}`,
        Patient: `${patient_f_name} ${patient_l_name}`,
        phone: patient_phone,
        Status: getStatusBadge(status),
        Date: date,
        'Time Slots': time_slots,
        Type:
          type === 'Emergency' ? (
            <Badge colorScheme="red">{type}</Badge>
          ) : (
            <Badge colorScheme="green">{type}</Badge>
          ),
        'Payment Status':
          payment_status === 'Paid' ? (
            <Badge colorScheme="green">{payment_status}</Badge>
          ) : payment_status === 'Refunded' ? (
            <Badge colorScheme="blue">{payment_status}</Badge>
          ) : (
            <Badge colorScheme="red">{'Not Paid'}</Badge>
          ),
        'Cancellation Status': getCancellationStatusBadge(
          current_cancel_req_status
        ),
        source
      };
    });

    return {
      // @ts-ignore
      data: rearrangedArray.sort((a, b) => b.id - a.id),
      total_record: res.total_record
    };
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ['appointments', page, debouncedSearchQuery],
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
        title: 'oops!.',
        description: 'Something bad happens.',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top'
      });
    }
    // @ts-ignore
    return <ErrorPage errorCode={error.name} />;
  }

  if (!hasPermission('APPOINTMENT_VIEW')) return <NotAuth />;

  return (
    <Box ref={boxRef}>
      {isLoading || !data ? (
        <Box>
          <Flex
            mb={5}
            justify={'space-between'}>
            <Skeleton
              w={400}
              h={8}
            />
            <Skeleton
              w={200}
              h={8}
            />
          </Flex>
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
        <Box>
          <Flex
            mb={5}
            justify={'space-between'}
            align={'center'}>
            <Input
              size={'md'}
              placeholder="Search"
              w={400}
              maxW={'50vw'}
              onChange={(e) => setsearchQuery(e.target.value)}
              value={searchQuery}
            />
          </Flex>
          <DynamicTable
            imgLast={true}
            minPad={'1px 10px'}
            data={data?.data}
            onActionClick={
              <YourActionButton 
                rowData={[]}
                onClick={() => {}}
                navigate={navigate}
              />
            }
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
const YourActionButton = ({ onClick, rowData, navigate }) => {
  const { hasPermission } = useHasPermission();
  const { t } = useTranslation(); 
  return (
    <Flex justify={'center'}>
      {hasPermission('APPOINTMENT_UPDATE') && (
        <IconButton
          aria-label={t('appointments.actions.edit')}
          size={'sm'}
          variant={'ghost'}
          _hover={{
            background: 'none'
          }}
          onClick={() => {
            onClick(rowData);
            navigate(`/appointment/${rowData.id}`);
          }}
          icon={
            <FiEdit
              fontSize={18}
              color={theme.colors.blue[500]}
            />
          }
        />
      )}
    </Flex>
  );
};
