/* eslint-disable react/prop-types */
import { Box, Button, Divider, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { UPDATE } from '../../Controllers/ApiControllers';
import { useTranslation } from 'react-i18next';

import ShowToast from '../../Controllers/ShowToast';
import admin from '../../Controllers/admin';

// @ts-ignore
export default function AddRoleModal({ isOpen, onClose, data }) {
  const { t } = useTranslation();
  
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const toast = useToast();

  // @ts-ignore
  const addRole = async (Inputdata) => {
    let formData = { ...Inputdata };

    try {
      // @ts-ignore
      setIsLoading(true);
      const res = await UPDATE(admin.token, 'add_role', formData);
      // @ts-ignore
      setIsLoading(false);
      if (res.response === 200) {
        ShowToast(toast, 'success', t('roles.add.messages.success'));
        // @ts-ignore
        queryClient.invalidateQueries('roles');
        reset();
        onClose();
      } else {
        ShowToast(toast, 'error', res.message);
      }
    } catch (error) {
      // @ts-ignore
      setIsLoading(false);
      ShowToast(toast, 'error', JSON.stringify(error));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={'xl'}
      scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent
        as={'form'}
        onSubmit={handleSubmit(addRole)}>
        <ModalHeader
          fontSize={18}
          py={2}>
          {t('roles.add.title')}
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <Box pb={3}>
            <FormControl isRequired>
              <FormLabel>{t('roles.add.form.title')}</FormLabel>
              <Input
                defaultValue={data?.name}
                placeholder={t('roles.add.form.placeholder')}
                {...register('role_name', { required: true })}
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
            {t('roles.add.buttons.close')}
          </Button>
          <Button
            variant="solid"
            size={'sm'}
            colorScheme="blue"
            type="submit"
            isLoading={isLoading}>
            {t('roles.add.buttons.submit')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
