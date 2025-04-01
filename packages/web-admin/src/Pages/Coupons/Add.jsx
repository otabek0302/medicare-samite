/* eslint-disable react/prop-types */
import { Box, Button, Divider, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { ADD } from '../../Controllers/ApiControllers';
import { useTranslation } from 'react-i18next';

import ShowToast from '../../Controllers/ShowToast';
import admin from '../../Controllers/admin';

export default function AddCoupon({ isOpen, onClose }) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState();
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const toast = useToast();

  const AddNewCoupon = async (data) => {
    const formData = { ...data, active: 1, title: data.title.toUpperCase() };
    try {
      setIsLoading(true);
      const res = await ADD(admin.token, 'add_coupon', formData);
      setIsLoading(false);
      if (res.response === 200) {
        ShowToast(toast, 'success', t('coupons.add.messages.success'));
        queryClient.invalidateQueries({ queryKey: ['coupons'] });
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
      size={'lg'}>
      <ModalOverlay />
      <ModalContent
        as={'form'}
        onSubmit={handleSubmit(AddNewCoupon)}>
        <ModalHeader
          fontSize={18}
          py={2}>
          {t('coupons.add.title')}
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <Box pb={3}>
            <FormControl isRequired>
              <FormLabel>{t('coupons.add.form.title.label')}</FormLabel>
              <Input
                textTransform={'uppercase'}
                placeholder={t('coupons.add.form.title.placeholder')}
                {...register('title', { required: true })}
              />
            </FormControl>
            <FormControl
              isRequired
              mt={5}>
              <FormLabel>{t('coupons.add.form.value.label')}</FormLabel>
              <Input
                type="number"
                placeholder={t('coupons.add.form.value.placeholder')}
                max={100}
                {...register('value', { required: true })}
              />
            </FormControl>
            <FormControl
              isRequired
              mt={5}>
              <FormLabel>{t('coupons.add.form.description.label')}</FormLabel>
              <Input
                placeholder={t('coupons.add.form.description.placeholder')}
                {...register('description', { required: true })}
              />
            </FormControl>
            <Flex
              mt={5}
              gap={5}>
              {' '}
              <FormControl isRequired>
                <FormLabel>{t('coupons.add.form.dates.start.label')}</FormLabel>
                <Input
                  type="date"
                  placeholder={t('coupons.add.form.dates.start.placeholder')}
                  {...register('start_date', { required: true })}
                />
              </FormControl>{' '}
              <FormControl isRequired>
                <FormLabel>{t('coupons.add.form.dates.end.label')}</FormLabel>
                <Input
                  type="date"
                  placeholder={t('coupons.add.form.dates.end.placeholder')}
                  {...register('end_date', { required: true })}
                />
              </FormControl>
            </Flex>
          </Box>
        </ModalBody>
        <Divider />
        <ModalFooter py={3}>
          <Button
            colorScheme="gray"
            mr={3}
            onClick={onClose}
            size={'sm'}>
            {t('coupons.add.buttons.close')}
          </Button>
          <Button
            variant="solid"
            size={'sm'}
            colorScheme="blue"
            type="submit"
            isLoading={isLoading}>
            {t('coupons.add.buttons.add')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
