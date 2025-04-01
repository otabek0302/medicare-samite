﻿/* eslint-disable react/prop-types */
import { Box, Flex, Skeleton, useToast } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { GET } from '../../Controllers/ApiControllers';

import admin from '../../Controllers/admin';
import ErrorPage from '../../Components/ErrorPage';
import useHasPermission from '../../Hooks/HasPermission';
import NotAuth from '../../Components/NotAuth';
import AppointmentsCalendar from '../Dashboard/Calender';

export default function AppontmentCalender() {
  const toast = useToast();
  const id = 'Errortoast';
  const boxRef = useRef(null);
  const { hasPermission } = useHasPermission();
  const { t } = useTranslation();

  const getData = async () => {
    const url =
      admin.role.name === 'Doctor'
        ? `get_appointments/doctor/${admin.id}`
        : `get_appointments`;
    const res = await GET(admin.token, url);
    return res.data;
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ['all-appointments'],
    queryFn: getData
  });

  if (error) {
    if (!toast.isActive(id)) {
      toast({
        id,
        title: t('errors.oops'),
        description: t('errors.somethingWrong'),
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top'
      });
    }
    return <ErrorPage message={t('errors.somethingWrong')} />;
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
          <AppointmentsCalendar appointmentData={data} />
        </Box>
      )}
    </Box>
  );
}
