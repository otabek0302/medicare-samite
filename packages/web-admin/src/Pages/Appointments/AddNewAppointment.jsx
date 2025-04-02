/* eslint-disable react/prop-types */
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Box, Flex, useColorModeValue, Heading, FormControl, FormLabel, Input, CardBody, Card, Divider, Menu, MenuButton, MenuList, MenuItem, Badge, Select, useDisclosure, useToast } from '@chakra-ui/react';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ADD, GET } from '../../Controllers/ApiControllers';
import { useTranslation } from 'react-i18next';

import useDoctorData from '../../Hooks/UseDoctorData';
import usePatientData from '../../Hooks/UsePatientsData';
import UsersCombobox from '../../Components/UsersComboBox';
import moment from 'moment';
import getStatusBadge from '../../Hooks/StatusBadge';
import admin from '../../Controllers/admin';
import ShowToast from '../../Controllers/ShowToast';
import AvailableTimeSlotes from './AvailableTimeSlotes';
import AddPatients from '../Patients/AddPatients';

// Keep original values for server
const defStatus = ['Pending', 'Confirmed'];

// Keep original English values for server communication
const appointmentTypes = [
  { id: 1, name: 'Emergency', label: 'appointments.add.type.emergency' },
  { id: 2, name: 'OPD', label: 'appointments.add.type.opd' },
  { id: 3, name: 'Video Consultant', label: 'appointments.add.type.video' }
];

// @ts-ignore
const getTypeBadge = (type) => {
  switch (type) {
    case 'Emergency':
      return (
        <Badge colorScheme="red" p={'5px'} px={10}>
          {type}
        </Badge>
      );
    case 'OPD':
      return (
        <Badge colorScheme="green" p={'5px'} px={10}>
          {type}
        </Badge>
      );
    case 'Video Consultant':
      return (
        <Badge colorScheme="blue" p={'5px'} px={10}>
          {type}
        </Badge>
      );
    default:
      return (
        <Badge colorScheme="blue" p={'5px'} px={10}>
          {type}
        </Badge>
      );
  }
};

// @ts-ignore
const getFee = (type, doct) => {
  switch (type) {
    case 'Emergency':
      return doct?.emg_fee;
    case 'OPD':
      return doct?.opd_fee;
    case 'Video Consultant':
      return doct?.video_fee;
    default:
      return doct?.emg_fee;
  }
};

// @ts-ignore
const paymentModes = [
  { id: 1, name: 'Cash', label: 'payments.methods.cash' },
  { id: 2, name: 'Online', label: 'payments.methods.online' },
  { id: 3, name: 'Other', label: 'payments.methods.other' },
  { id: 4, name: 'Wallet', label: 'payments.methods.wallet' },
  { id: 5, name: 'UPI', label: 'payments.methods.upi' }
];

// @ts-ignore
const addAppointment = async (data) => {
  const res = await ADD(admin.token, 'add_appointment', data);
  if (res.response !== 200) {
    throw new Error(res.message);
  }
  return res;
};

// @ts-ignore
function AddNewAppointment({ isOpen, onClose, PatientID }) {
  const { t } = useTranslation();

  const toast = useToast();
  const { isOpen: timeSlotisOpen, onOpen: timeSlotonOpen, onClose: timeSlotonClose } = useDisclosure();
  const { isOpen: AddPatientisOpen, onOpen: AddPatientonOpen, onClose: AddPatientonClose } = useDisclosure();
  const { doctorsData } = useDoctorData();
  const { patientsData } = usePatientData();

  const [patient, setpatient] = useState();
  const [doct, setdoct] = useState();
  const [selectedDate, setselectedDate] = useState();
  const [selectedSlot, setselectedSlot] = useState();
  const [status, setstatus] = useState('Confirmed');
  const [type, settype] = useState();
  const [paymentStatus, setpaymentStatus] = useState();
  const [paymentMethod, setpaymentMethod] = useState();
  const [defaultDataForPationt, setdefaultDataForPationt] = useState(PatientID);
  const queryClient = useQueryClient();

  //   doctorDetails
  const { data: doctorDetails, isLoading: isDoctLoading } = useQuery({
    // @ts-ignore
    queryKey: ['doctor', doct?.user_id],
    queryFn: async () => {
      // @ts-ignore
      const res = await GET(admin.token, `get_doctor/${doct?.user_id}`);
      return res.data;
    },
    enabled: !!doct
  });

  //
  const checkMissingValues = () => {
    if (!patient) return 'patient';
    if (!doct) return 'doctor';
    if (!type) return 'Appointment Type';
    if (!selectedDate) return 'Date';
    if (!selectedSlot) return 'Time Slot';
    if (!status) return 'Appointment status';
    if (!paymentStatus) return 'Payment Status';
    if (paymentStatus === 'Paid' && !paymentMethod) return 'Payment Method';
    return null;
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const missingField = checkMissingValues();
      if (missingField) {
        throw new Error(`Please select ${missingField}`);
      }
      if (isDoctLoading || !doctorDetails) {
        throw new Error("Unable to fetch doctor details");
      }
      if (!missingField) {
        const formData = {
          // @ts-ignore
          patient_id: patient.id,
          status: status,
          date: selectedDate,
          // @ts-ignore
          time_slots: selectedSlot.time_start,
          // @ts-ignore
          doct_id: doct.user_id,
          dept_id: doctorDetails.department,
          type: type,
          fee: getFee(type, doct),
          total_amount: getFee(type, doct),
          unit_total_amount: getFee(type, doct),
          invoice_description: type,
          payment_method: paymentMethod || null,
          service_charge: 0,
          payment_transaction_id:
            paymentStatus === 'Paid' ? 'Pay at Hospital' : null,
          is_wallet_txn: 0,
          payment_status: paymentStatus,
          source: 'Admin'
        };
        await addAppointment(formData);
      }
    },

    onError: (error) => {
      ShowToast(toast, 'error', error.message);
    },

    onSuccess: () => {
      ShowToast(toast, 'success', 'Success');
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.invalidateQueries({ queryKey: ['main-appointments'] });
      onClose();
    }
  });

  return (
    <Box>
      {/* @ts-ignore */}
      <Modal isOpen={isOpen} onClose={onClose} size={'2xl'} onOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader >{t('appointments.add.title')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap={4} alignItems={'center'} justifyContent={'space-between'}>
              <Box flex={1}>
                <UsersCombobox data={patientsData} name={'Patient'} setState={setpatient} defaultData={defaultDataForPationt} addNew={true} addOpen={AddPatientonOpen} />
              </Box>
              <Box>
                <Button size={'xs'} py={2} px={4} colorScheme={'blue'} onClick={AddPatientonOpen}> {t('appointments.add.addPatient')} </Button>
              </Box>
              <Box flex={1}>
                {/* @ts-ignore */}
                <UsersCombobox data={doctorsData} name={'Doctor'} setState={setdoct} />
              </Box>
            </Flex>
            <Card mt={5} bg={useColorModeValue('white', 'gray.700')}>
              <CardBody p={3} as={'form'}>
                <Heading as={'h3'} size={'sm'}>
                  {t('appointments.add.details')}
                </Heading>
                <Divider mt={2} mb={5} />
                <Flex gap={5}>
                  <FormControl id="doct_specialization" size={'sm'}>
                    <FormLabel fontSize={'sm'} mb={0} color={useColorModeValue('gray.600', 'gray.300')}>
                      {t('appointments.add.type.label')}
                    </FormLabel>
                    <Menu>
                      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bg={'transparent'} w={'100%'} textAlign={'left'} pl={0} pt={0} h={8} _hover={{   bg: 'transparent' }} _focus={{   bg: 'transparent' }} borderBottom={'1px solid'} borderBottomRadius={0} borderColor={useColorModeValue('gray.200', 'gray.600')}>
                        {type ?
                          getTypeBadge(type) :
                          t('appointments.add.type.select')
                        }
                      </MenuButton>
                      <MenuList>
                        {appointmentTypes.map((option) => (
                          <MenuItem key={option.id} onClick={() => { settype(option.name); }}>
                            {getTypeBadge(option.name)}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize={'sm'} mb={0} color={useColorModeValue('gray.600', 'gray.300')}>
                      {t('appointments.labels.appointmentDate')}
                    </FormLabel>
                    <Input size={'sm'} fontWeight={600} variant="flushed" value={moment(selectedDate).format('DD-MM-YYYY')}
                      onClick={() => {
                        if (!doct) {
                          return ShowToast(toast, 'error', t('appointments.labels.selectDoctor'));
                        }
                        if (!type) {
                          return ShowToast(toast, 'error', t('appointments.labels.selectType'));
                        }
                        timeSlotonOpen();
                      }}
                      cursor={'pointer'}
                    />
                  </FormControl>
                </Flex>
                <Flex gap={5} mt={2}>
                  <FormControl>
                    <FormLabel fontSize={'sm'} mb={0} color={useColorModeValue('gray.600', 'gray.300')}>
                      {t('appointments.labels.appointmentTimeSlot')}
                    </FormLabel>
                    <Input size={'sm'} fontWeight={600} variant="flushed"
                      // @ts-ignore
                      value={ selectedSlot ? moment(selectedSlot.time_start, 'hh:mm').format('hh:mm A') : t('appointments.add.payment.timeSlot') }
                      onClick={() => {
                        if (!doct) {
                          return ShowToast(toast, 'error', t('appointments.labels.selectDoctor'));
                        }
                        timeSlotonOpen();
                      }}
                      cursor={'pointer'}
                      isReadOnly
                    />
                  </FormControl>
                  <FormControl
                    id="status"
                    size={'sm'}>
                    <FormLabel fontSize={'sm'} mb={0} color={useColorModeValue('gray.600', 'gray.300')}>
                      {t('appointments.status.label')}
                    </FormLabel>
                    <Menu>
                      <MenuButton
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                        bg={'transparent'}
                        w={'100%'}
                        textAlign={'left'}
                        pl={0}
                        pt={0}
                        h={8}
                        _hover={{
                          bg: 'transparent'
                        }}
                        _focus={{
                          bg: 'transparent'
                        }}
                        borderBottom={'1px solid'}
                        borderBottomRadius={0}
                        borderColor={useColorModeValue('gray.200', 'gray.600')}>
                        {status ?
                          getStatusBadge(status) :
                          t('appointments.status.select')
                        }
                      </MenuButton>
                      <MenuList>
                        {defStatus.map((option) => (
                          <MenuItem
                            key={option}
                            onClick={() => {
                              setstatus(option);
                            }}>
                            <Box
                              display="flex"
                              alignItems="center">
                              {getStatusBadge(option)}
                            </Box>
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
                  </FormControl>
                </Flex>
              </CardBody>
            </Card>
            <Card
              mt={5}
              bg={useColorModeValue('white', 'gray.700')}>

              <CardBody
                p={3}
                as={'form'}>
                {' '}
                <Heading
                  as={'h3'}
                  size={'sm'}>
                  {t('appointments.add.payment.details')}
                </Heading>{' '}
                <Divider
                  mt={2}
                  mb={5}
                />
                <Flex gap={5}>
                  <FormControl>
                    <FormLabel
                      fontSize={'sm'}
                      mb={0}
                      color={useColorModeValue('gray.600', 'gray.300')}>
                      {t('appointments.add.payment.status.label')}
                    </FormLabel>
                    <Select
                      placeholder={t('appointments.add.payment.status.select')}
                      value={paymentStatus} // Keep English value
                      // @ts-ignore
                      onChange={(e) => setpaymentStatus(e.target.value)}>
                      <option value="Paid">{t('appointments.add.payment.status.paid')}</option>
                      {type === 'OPD' && (
                        <option value="Unpaid">{t('appointments.add.payment.status.unpaid')}</option>
                      )}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel
                      fontSize={'sm'}
                      mb={0}
                      color={useColorModeValue('gray.600', 'gray.300')}>
                      {t('appointments.add.payment.method.label')}
                    </FormLabel>
                    <Select
                      placeholder={t('appointments.add.payment.method.select')}
                      value={paymentMethod} // Keep English value
                      // @ts-ignore
                      onChange={(e) => setpaymentMethod(e.target.value)}>
                      {paymentModes.map((item) => (
                        <option value={item.name} key={item.id}>
                          {t(item.label)}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Flex>
                <Flex
                  gap={5}
                  mt={4}>
                  <FormControl w={'50%'}>
                    <FormLabel
                      fontSize={'sm'}
                      mb={0}
                      color={useColorModeValue('gray.600', 'gray.300')}>
                      {t('appointments.add.fee.label')}
                    </FormLabel>
                    <Input
                      fontWeight={600}
                      variant="flushed"
                      size={'sm'}
                      isReadOnly
                      value={doct && type ? getFee(type, doct) : 0}
                    />
                  </FormControl>
                  <FormControl w={'50%'}>
                    <FormLabel
                      fontSize={'sm'}
                      mb={0}
                      color={useColorModeValue('gray.600', 'gray.300')}>
                      {t('appointments.add.fee.total')}
                    </FormLabel>
                    <Input
                      fontWeight={600}
                      variant="flushed"
                      size={'sm'}
                      isReadOnly
                      value={doct && type ? getFee(type, doct) : 0}
                    />
                  </FormControl>
                </Flex>
              </CardBody>
            </Card>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="gray"
              mr={3}
              onClick={onClose}
              size={'sm'}>
              {t('appointments.add.buttons.close')}
            </Button>
            <Button
              colorScheme={'blue'}
              size={'sm'}
              onClick={() => {
                mutation.mutate();
              }}
              isLoading={mutation.isPending}>
              {t('appointments.add.buttons.add')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {timeSlotisOpen ? (
        <AvailableTimeSlotes

          isOpen={timeSlotisOpen}
          onClose={timeSlotonClose}
          // @ts-ignore
          doctID={doct.user_id}
          selectedDate={selectedDate}
          setselectedDate={setselectedDate}
          selectedSlot={selectedSlot}
          setselectedSlot={setselectedSlot}
          type={type}
        />
      ) : null}
      {AddPatientisOpen ? (
        <AddPatients
          // @ts-ignore
          nextFn={(data) => {
            setdefaultDataForPationt(data);
          }}
          isOpen={AddPatientisOpen}
          onClose={AddPatientonClose}

        />
      ) : null}
    </Box>
  );
}

export default AddNewAppointment;