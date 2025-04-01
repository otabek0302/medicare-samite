﻿/* eslint-disable react/prop-types */
import { Badge, Box, Button, Checkbox, CheckboxGroup, Flex, IconButton, Input, Skeleton, theme, useDisclosure, useToast } from '@chakra-ui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { GET } from '../../Controllers/ApiControllers';

import admin from '../../Controllers/admin';
import DynamicTable from '../../Components/DataTable';
import getStatusBadge from '../../Hooks/StatusBadge';
import getCancellationStatusBadge from '../../Hooks/CancellationReqBadge';
import AddNewAppointment from './AddNewAppointment';

import ErrorPage from '../../Components/ErrorPage';
import useHasPermission from '../../Hooks/HasPermission';
import NotAuth from '../../Components/NotAuth';
import moment from 'moment';
import { RefreshCwIcon } from 'lucide-react';
import useSearchFilter from '../../Hooks/UseSearchFilter';

// Keep original English values for server
const statusOptions = [
  { value: 'Confirmed', label: 'appointments.status.confirmed' },
  { value: 'Visited', label: 'appointments.status.visited' },
  { value: 'Completed', label: 'appointments.status.completed' },
  { value: 'Pending', label: 'appointments.status.pending' },
  { value: 'Cancelled', label: 'appointments.status.cancelled' },
  { value: 'Rejected', label: 'appointments.status.rejected' },
  { value: 'Cancellation', label: 'appointments.status.cancellation' }
];

// @ts-ignore
export default function AppointmentsByPatientID({ patientID }) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const id = 'Errortoast';
  const boxRef = useRef(null);
  const [statusFilters, setStatusFilters] = useState([]); // Track status filters
  const { hasPermission } = useHasPermission();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  // @ts-ignore
  const handleStatusChange = (selectedStatuses) => {
    setStatusFilters(selectedStatuses); // Update the state when checkboxes change
  };

  const getData = async () => {
    const url = `get_appointment/patient/${patientID}`;
    const res = await GET(admin.token, url);
    // @ts-ignore
    const rearrangedArray = res?.data.map((item) => {
      const {
        id,
        patient_id,
        status,
        date,
        time_slots,
        type,
        payment_status,
        current_cancel_req_status,
        patient_f_name,
        patient_l_name,
        patient_phone,
        doct_f_name,
        doct_l_name,
        doct_image,
        source
      } = item;

      return {
        id: id,
        image: doct_image,
        Doctor: `${doct_f_name} ${doct_l_name}`,
        Patient: `${patient_f_name} ${patient_l_name} - #${patient_id}`,
        phone: patient_phone,
        Status: getStatusBadge(status),
        Date: moment(date).format('DD MMM YYYY'),
        'Time Slots': moment(time_slots, 'HH:mm:ss').format('hh:mm A'),
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
        source,
        filterStatus: status,
        current_cancel_req_status: current_cancel_req_status
      };
    });

    return rearrangedArray;
  };

  const { isLoading, data, error, isFetching, isRefetching } = useQuery({
    queryKey: ['appointments', 'patient', patientID, statusFilters],
    queryFn: getData
  });
  
  const { handleSearchChange, filteredData } = useSearchFilter(data);

  if (error) {
    if (!toast.isActive(id)) {
      toast({
        id,
        title: 'Oops!',
        description: 'Something bad happened.',
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
          {/* Loading skeletons */}
          {[...Array(10)].map((_, index) => (
            <Skeleton
              key={index}
              h={10}
              w={'100%'}
              mt={2}
            />
          ))}
        </Box>
      ) : (
        <Box>
          <Flex
            mb={5}
            justify={'space-between'}
            align={'center'}>
            <Input
              size={'md'}
              placeholder={t('common.search')}
              w={400}
              maxW={'50vw'}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            <Box>
              <Button
                size={'sm'}
                colorScheme="blue"
                onClick={() => {
                  onOpen();
                }}>
                {t('buttons.addNewAppointment')}
              </Button>
            </Box>
          </Flex>

          {/* Status checkboxes */}
          <Flex
            alignItems={'top'}
            justifyContent={'space-between'}>
            {' '}
            <CheckboxGroup
              colorScheme="blue"
              onChange={handleStatusChange}
              value={statusFilters}>
              <Flex
                mb={5}
                gap={4}
                alignItems={'center'}>
                {statusOptions.map(option => (
                  <Checkbox key={option.value} value={option.value}>
                    {t(option.label)}
                  </Checkbox>
                ))}
              </Flex>
            </CheckboxGroup>{' '}
            <Button
              isLoading={isFetching || isRefetching}
              size={'sm'}
              colorScheme="blue"
              onClick={() => {
                queryClient.invalidateQueries(
                  // @ts-ignore
                  ['appointments', 'patient', patientID, statusFilters],
                  { refetchInactive: true }
                );
              }}
              rightIcon={<RefreshCwIcon size={14} />}>
              {t('appointments.buttons.refreshTable')}
            </Button>
          </Flex>
          {/* @ts-ignore */}
          <DynamicTable
            minPad={'1px 10px'}
            data={filteredData}
            onActionClick={
              // @ts-ignore
              <YourActionButton
                onClick={() => {}}
                navigate={navigate}
              />
            }
          />
        </Box>
      )}

      {/* Add New Appointment */}
      {isOpen && (
        <AddNewAppointment
          isOpen={isOpen}
          onClose={onClose}
          PatientID={patientID}
        />
      )}
    </Box>
  );
}

// @ts-ignore
const YourActionButton = ({ onClick, rowData, navigate }) => {
  const { hasPermission } = useHasPermission();
  return (
    <Flex justify={'center'}>
      {hasPermission('APPOINTMENT_UPDATE') && (
        // @ts-ignore
        <IconButton
          size={'sm'}
          variant={'ghost'}
          _hover={{ background: 'none' }}
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
