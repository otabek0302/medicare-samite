/* eslint-disable react/prop-types */
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Divider, FormControl, FormLabel, Input, Textarea, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { UPDATE } from '../../Controllers/ApiControllers';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import admin from '../../Controllers/admin';
import showToast from '../../Controllers/ShowToast';


// @ts-ignore
const UpdateMed = async (data) => {
  const res = await UPDATE(admin.token, 'update_prescribe_medicines', data);
  if (res.response !== 200) {
    throw new Error(res.message);
  }
  return res;
};

// @ts-ignore 
export default function UpdateMedicine({ isOpen, onClose, data }) {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm();
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      await UpdateMed(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicines'] });
      showToast(toast, 'success', t('medicines.update.messages.success'));
      onClose();
    },
    onError: () => {
      showToast(toast, 'error', t('medicines.update.messages.error'));
    }
  });
  
  // @ts-ignore
  const onSubmit = (formData) => {
    mutation.mutate({ ...formData, id: data.id });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent as={'form'} onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader fontSize={'md'}>{t('medicines.update.title')}</ModalHeader>
        <ModalCloseButton top={3} />
        <Divider />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel fontSize={'sm'}>{t('medicines.update.form.name.label')}</FormLabel>
            <Input
              size={'md'}
              placeholder={t('medicines.update.form.name.placeholder')}
              {...register('title', { required: true })}
              defaultValue={data.title}
            />
          </FormControl>
          <FormControl mt={3}>
            <FormLabel fontSize={'sm'}>{t('medicines.update.form.notes.label')}</FormLabel>
            <Textarea
              size={'md'}
              placeholder={t('medicines.update.form.notes.placeholder')}
              {...register('notes')}
              defaultValue={data.notes}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="gray"
            mr={3}
            onClick={onClose}
            size={'sm'}>
            {t('medicines.update.buttons.close')}
          </Button>
          <Button
            colorScheme={'blue'}
            size={'sm'}
            type="submit"
            isLoading={mutation.isPending}>
            {t('medicines.update.buttons.update')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
