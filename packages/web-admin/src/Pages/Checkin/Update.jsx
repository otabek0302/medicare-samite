/* eslint-disable react/prop-types */
import { Box, Button, Divider, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { UPDATE } from '../../Controllers/ApiControllers';
import ShowToast from '../../Controllers/ShowToast';
import admin from '../../Controllers/admin';
import todayDate from '../../Controllers/today';

// @ts-ignore
export default function UpdateCheckin({ isOpen, onClose, data }) {
  const { t } = useTranslation();
  // @ts-ignore
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const toast = useToast();

  // @ts-ignore
  const handleUpdate = async (Inputdata) => {
    const formData = {
      ...Inputdata,
      id: data.id
    };

    try {
      setIsLoading(true);
      const res = await UPDATE(admin.token, 'update_appointment_checkin', formData);
      setIsLoading(false);
      if (res.response === 200) {
        ShowToast(toast, 'success', t('checkin.success.updated'));
        queryClient.invalidateQueries({ queryKey: ['checkins'] });
        reset();
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={'lg'}
      scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent
        as={'form'}
        onSubmit={handleSubmit(handleUpdate)}>
        <ModalHeader
          fontSize={18}
          py={2}>
          {t('checkin.update.title')}
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          {' '}
          <Box pb={3}>
            <FormControl isRequired>
              <FormLabel>{t('checkin.form.appointmentId')}</FormLabel>
              <Input
                size={'sm'}
                defaultValue={data?.appointment_id}
                placeholder={t('checkin.form.appointmentId')}
                {...register('appointment_id', { required: true })}
              />
            </FormControl>
            <FormControl
              isRequired
              mt={3}>
              <FormLabel>{t('checkin.form.date')}</FormLabel>
              <Input
                max={todayDate()}
                defaultValue={data?.date}
                size={'sm'}
                type="date"
                step={60}
                placeholder={t('checkin.form.date')}
                {...register('date', { required: true })}
                isDisabled
              />
            </FormControl>
            <FormControl
              isRequired
              mt={3}>
              <FormLabel>{t('checkin.form.time')}</FormLabel>
              <Input
                defaultValue={data?.time}
                size={'sm'}
                type="time"
                step={60}
                placeholder={t('checkin.form.time')}
                {...register('time', { required: true })}
              />
            </FormControl>
          </Box>
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
            {t('checkin.buttons.update')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
