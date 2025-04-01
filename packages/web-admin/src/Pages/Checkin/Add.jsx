/* eslint-disable react/prop-types */
import { AbsoluteCenter, Box, Button, Divider, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { ADD, GET } from '../../Controllers/ApiControllers';

import ShowToast from '../../Controllers/ShowToast';
import admin from '../../Controllers/admin';
import QRCodeScanner from '../../Components/QrScanner';
import todayDate from '../../Controllers/today';

// @ts-ignore
export default function AddCheckin({ isOpen, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [appointmentData, setappointmentData] = useState();
  const [showQRScanner, setShowQRScanner] = useState(false); // State for QR scanner visibility

  const { register, handleSubmit, reset, setValue, getValues } = useForm(); // Added setValue here
  const queryClient = useQueryClient();
  const toast = useToast();
  const { t } = useTranslation();

  // @ts-ignore
  const onqrScan = (qrData) => {
    // Use setValue to update form inputs
    setValue('appointment_id', qrData.appointment_id || '');
    setValue('date', qrData.date || '');
    setValue('time', qrData.time || '');
    setShowQRScanner(false); // Hide the QR scanner after a successful scan
    // @ts-ignore
    getAppData(qrData.appointment_id); // Fetch additional data based on QR
  };

  const getAppData = async () => {
    const { appointment_id } = getValues();

    setIsLoading(true);
    try {
      const res = await GET(admin.token, `get_appointment/${appointment_id}`);
      setIsLoading(false);
      console.log(res);
      if (res.data === null) {
        ShowToast(toast, 'error', t('checkin.errors.notFound'));
        // Reset values if not found
        setValue('appointment_id', '');
        setValue('date', '');
        setValue('time', '');
        return;
      }
      let appointmentData = res.data;
      setappointmentData(appointmentData);
      // Use setValue to set form values programmatically
      setValue('appointment_id', appointmentData?.id || '');
      setValue('date', appointmentData?.date || '');
      setValue('time', appointmentData?.time_slots || '');
    } catch (error) {
      setIsLoading(false);
      ShowToast(toast, 'error', t('checkin.errors.notFound'));
      // Reset values if not found
      setValue('appointment_id', '');
      setValue('date', '');
      setValue('time', '');
      return;
    }
  };

  // @ts-ignore
  const addCheckin = async (Inputdata) => {
    // @ts-ignore
    if (appointmentData?.type === 'Video Consultant') {
      return ShowToast(
        toast,
        'error',
        t('checkin.errors.videoConsult')
      );
    }

    try {
      setIsLoading(true);
      const res = await ADD(admin.token, 'add_appointment_checkin', Inputdata);
      setIsLoading(false);

      if (res.response === 200) {
        ShowToast(toast, 'success', t('checkin.success.added'));
        // @ts-ignore
        queryClient.invalidateQueries('checkins');
        reset(); // Reset form values
        onClose();
      } else {
        ShowToast(toast, 'error', res.message);
      }
    } catch (error) {
      setIsLoading(false);
      ShowToast(toast, 'error', JSON.stringify(error));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={'lg'} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent as={'form'} onSubmit={handleSubmit(addCheckin)}>
        <ModalHeader fontSize={18} py={2}>
          {t('checkin.title')}
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          {showQRScanner ? (
            <Button my={2} w={'full'} size={'sm'} colorScheme={'blue'} onClick={() => setShowQRScanner(false)}>
              {t('checkin.buttons.addManually')}
            </Button>
          ) : (
            <Button my={2} w={'full'} size={'sm'} colorScheme={'blue'} onClick={() => setShowQRScanner(true)}>
              {t('checkin.buttons.scanQr')}
            </Button>
          )}

          {showQRScanner && <QRCodeScanner onScan={onqrScan} />}

          {!showQRScanner && (
            <Box pb={3}>
              <Box position="relative" py="5">
                <Divider />
                <AbsoluteCenter bg="white" px="2" fontWeight={500}>
                  {t('checkin.or')}
                </AbsoluteCenter>
              </Box>
              <Flex alignItems={'flex-end'} gap={5}>
                <FormControl isRequired flex={1}>
                  <FormLabel>{t('checkin.form.appointmentId')}</FormLabel>
                  <Input size={'sm'} placeholder={t('checkin.form.appointmentId')} {...register('appointment_id', { required: true })} onChange={() => { setValue('date', ''); setValue('time', ''); }} />
                </FormControl>
                <Button colorScheme={'teal'} size={'sm'} onClick={() => getAppData()}>
                  {t('checkin.buttons.getDetails')}
                </Button>
              </Flex>

              <FormControl
                isRequired
                mt={3}>
                <FormLabel>{t('checkin.form.date')}</FormLabel>
                <Input
                  max={todayDate()}
                  size={'sm'}
                  type="date"
                  placeholder={t('checkin.form.date')}
                  {...register('date', { required: true })}
                />
              </FormControl>
              <FormControl
                isRequired
                mt={3}>
                <FormLabel>{t('checkin.form.time')}</FormLabel>
                <Input
                  size={'sm'}
                  type="time"
                  step={60}
                  placeholder={t('checkin.form.time')}
                  {...register('time', { required: true })}
                />
              </FormControl>
            </Box>
          )}
        </ModalBody>
        <Divider />
        <ModalFooter py={3}>
          <Button
            colorScheme="gray"
            mr={3}
            onClick={onClose}
            size={'sm'}>
            {t('checkin.buttons.close')}
          </Button>
          <Button
            variant="solid"
            size={'sm'}
            colorScheme="blue"
            type="submit"
            isLoading={isLoading}>
            {t('checkin.buttons.add')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
