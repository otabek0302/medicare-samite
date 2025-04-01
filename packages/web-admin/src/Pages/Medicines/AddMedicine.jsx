/* eslint-disable react/prop-types */
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Divider, FormControl, FormLabel, Input, Textarea, useToast, Box } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { ADD } from '../../Controllers/ApiControllers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import admin from '../../Controllers/admin';
import showToast from '../../Controllers/ShowToast';
import useHasPermission from '../../Hooks/HasPermission';
import NotAuth from '../../Components/NotAuth';

// @ts-ignore
const addPrescribeMedicines = async (data) => {
  const res = await ADD(admin.token, 'add_prescribe_medicines', data);
  if (res.response !== 200) {
    throw new Error(res.message);
  }
  return res;
};

// @ts-ignore
export default function AddMedicine({ isOpen, onClose }) {
  const { t } = useTranslation();
  const { hasPermission } = useHasPermission();
  const { register, handleSubmit } = useForm();
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      await addPrescribeMedicines(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicines'] });
      showToast(toast, 'success', t('medicines.add.messages.success'));
      onClose();
    },
    // @ts-ignore
    onError: (error) => {
      console.log(error);
      showToast(toast, 'error', t('medicines.add.messages.error'));
    }
  });

  // @ts-ignore
  const onSubmit = (formData) => {
    mutation.mutate(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent as={'form'} onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader fontSize={'md'}>{t('medicines.add.title')}</ModalHeader>
        <ModalCloseButton top={3} />
        <Divider />
        <ModalBody>
          <Box>
            {hasPermission('MEDICINE_ADD') ? (
              <>
                <FormControl isRequired>
                  <FormLabel fontSize={'sm'}>{t('medicines.add.form.name.label')}</FormLabel>
                  <Input
                    size={'md'}
                    placeholder={t('medicines.add.form.name.placeholder')}
                    {...register('title', { required: true })}
                  />
                </FormControl>
                <FormControl mt={3}>
                  <FormLabel fontSize={'sm'}>{t('medicines.add.form.notes.label')}</FormLabel>
                  <Textarea
                    size={'md'}
                    placeholder={t('medicines.add.form.notes.placeholder')}
                    {...register('notes')}
                  />
                </FormControl>
              </>
            ) : (
              <NotAuth />
            )}
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="gray"
            mr={3}
            onClick={onClose}
            size={'sm'}>
            {t('medicines.add.buttons.close')}
          </Button>
          <Button
            colorScheme={'blue'}
            size={'sm'}
            type="submit"
            isLoading={mutation.isPending}>
            {t('medicines.add.buttons.add')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
