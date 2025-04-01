/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { UPDATE } from '../../Controllers/ApiControllers';
import ShowToast from '../../Controllers/ShowToast';
import admin from '../../Controllers/admin';

// @ts-ignore
export default function UpdateSpecialization({ isOpen, onClose, data }) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState();
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const toast = useToast();

  // @ts-ignore
  const HandleUpdate = async (Inputdata) => {
    let formData = {
      ...Inputdata,
      id: data.id
    };

    try {
      // @ts-ignore
      setIsLoading(true);
      const res = await UPDATE(admin.token, 'update_specialization', formData);
      // @ts-ignore
      setIsLoading(false);
      if (res.response === 200) {
        ShowToast(toast, 'success', t('specializations.update.messages.success'));
        // @ts-ignore
        queryClient.invalidateQueries('specialization');
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
      size={'lg'}
      scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent
        as={'form'}
        onSubmit={handleSubmit(HandleUpdate)}>
        <ModalHeader
          fontSize={18}
          py={2}>
          {t('specializations.update.title')}
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <Box pb={3}>
            <FormControl isRequired>
              <FormLabel>{t('specializations.update.form.title.label')}</FormLabel>
              <Input
                defaultValue={data?.title}
                placeholder={t('specializations.update.form.title.placeholder')}
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
            {t('specializations.update.buttons.close')}
          </Button>
          <Button
            variant="solid"
            size={'sm'}
            colorScheme="blue"
            type="submit"
            isLoading={isLoading}>
            {t('specializations.update.buttons.update')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
