/* eslint-disable react/prop-types */
import { Box, Button, Divider, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { UPDATE } from '../../Controllers/ApiControllers';
import ShowToast from '../../Controllers/ShowToast';
import admin from '../../Controllers/admin';
import { useTranslation } from 'react-i18next';

export default function UpdateStateModel({ isOpen, onClose, data }) {
  const [isLoading, setisLoading] = useState();
  const { t } = useTranslation();
  
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const toast = useToast();

  // @ts-ignore
  const updateRole = async (Inputdata) => {
    let formData = {
      ...Inputdata,
      id: data.id
    };

    try {
      setisLoading(true);
      const res = await UPDATE(admin.token, 'update_state', formData);
      setisLoading(false);
      if (res.response === 200) {
        ShowToast(toast, 'success', t('states.update.messages.success'));
        queryClient.invalidateQueries('states');
        reset();
        onClose();
      } else {
        ShowToast(toast, 'error', t('states.update.messages.error'));
      }
    } catch (error) {
      setisLoading(false);
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
        onSubmit={handleSubmit(updateRole)}>
        <ModalHeader
          fontSize={18}
          py={2}>
          {t('states.update.title')}
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <Box pb={3}>
            <FormControl isRequired>
              <FormLabel>{t('states.update.submit')}</FormLabel>
              <Input
                defaultValue={data?.title}
                placeholder={t('states.update.submit')}
                {...register('title', { required: true })}
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
            {t('states.update.buttons.close')}
          </Button>
          <Button
            variant="solid"
            size={'sm'}
            colorScheme="blue"
            type="submit"
            isLoading={isLoading}>
            {t('states.update.buttons.update')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
