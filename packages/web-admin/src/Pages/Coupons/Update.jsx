/* eslint-disable react/prop-types */
import { Box, Button, Divider, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { UPDATE } from '../../Controllers/ApiControllers';

import admin from '../../Controllers/admin';
import ShowToast from '../../Controllers/ShowToast';

// @ts-ignore
export default function UpdateCouponModel({ isOpen, onClose, data }) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const toast = useToast();

  // @ts-ignore
  const UpdateCoupon = async (inputData) => {
    let formData = { ...inputData, title: inputData.title.toUpperCase(), id: data.id};

    try {
      setIsLoading(true);
      const res = await UPDATE(admin.token, 'update_coupon', formData);
      setIsLoading(false);
      if (res.response === 200) {
        ShowToast(toast, 'success', t('coupons.update.messages.success'));
        queryClient.invalidateQueries({ queryKey: ['coupons'] });
        reset();
        onClose();
      } else {
        ShowToast(toast, 'error', res.message);
      }
    } catch (error) {
      setIsLoading(false);
      ShowToast(toast, 'error', t('coupons.update.messages.error'));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={'lg'} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent as={'form'} onSubmit={handleSubmit(UpdateCoupon)}>
        <ModalHeader fontSize={18} py={2}>
          {t('coupons.update.title')}
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <Box pb={3}>
            <FormControl isRequired>
              <FormLabel>{t('coupons.update.form.title.label')}</FormLabel>
              <Input defaultValue={data.title} textTransform={'uppercase'} placeholder={t('coupons.update.form.title.placeholder')}
                {...register('title', { required: true })}
              />
            </FormControl>
            <FormControl isRequired mt={5}>
              <FormLabel>{t('coupons.update.form.value.label')}</FormLabel>
              <Input defaultValue={data.value} type="number" placeholder={t('coupons.update.form.value.placeholder')} max={100} {...register('value', { required: true })} />
            </FormControl>
            <FormControl isRequired mt={5}>
              <FormLabel>{t('coupons.update.form.description.label')}</FormLabel>
              <Input defaultValue={data.description} placeholder={t('coupons.update.form.description.placeholder')} {...register('description', { required: true })} />
            </FormControl>
            <Flex mt={5} gap={5}>
              <FormControl isRequired>
                <FormLabel>{t('coupons.update.form.startDate.label')}</FormLabel>
                <Input defaultValue={data.start_date} type="date" placeholder={t('coupons.update.form.startDate.placeholder')} {...register('start_date', { required: true })} />
              </FormControl>{' '}
              <FormControl isRequired>
                <FormLabel>{t('coupons.update.form.endDate.label')}</FormLabel>
                <Input defaultValue={data.end_date} type="date" placeholder={t('coupons.update.form.endDate.placeholder')} {...register('end_date', { required: true })} />
              </FormControl>
            </Flex>
          </Box>
        </ModalBody>
        <Divider />
        <ModalFooter py={3}>
          <Button colorScheme="gray" mr={3} onClick={onClose} size={'sm'}> 
            {t('coupons.update.buttons.close')}
          </Button>
          <Button variant="solid" size={'sm'} colorScheme="blue" type="submit" isLoading={isLoading}>
            {t('coupons.update.buttons.update')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
