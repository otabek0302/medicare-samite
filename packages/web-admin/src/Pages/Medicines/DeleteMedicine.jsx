/* eslint-disable react/prop-types */
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useToast } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { DELETE } from '../../Controllers/ApiControllers';
import { useTranslation } from 'react-i18next';

import admin from '../../Controllers/admin';
import showToast from '../../Controllers/ShowToast';

// @ts-ignore
export default function DeleteMedicine({ isOpen, onClose, data }) {
  const { t } = useTranslation();
  const toast = useToast();
  const cancelRef = useRef(null);
  const queryClient = useQueryClient();
  const [isLoading, setisLoading] = useState(false);

  const DeleteMed = async () => {
    let formData = {
      id: data.id
    };
    try {
      setisLoading(true);
      const res = await DELETE(
        admin.token,
        'delete_prescribe_medicines',
        formData
      );
      setisLoading(false);
      if (res.response === 200) {
        showToast(toast, 'success', t('medicines.delete.messages.success'));
        queryClient.invalidateQueries({ queryKey: ['medicines'] });
        onClose();
      } else {
        showToast(toast, 'error', res.message);
      }
    } catch (error) {
      setisLoading(false);
      showToast(toast, 'error', t('medicines.delete.messages.error'));
    }
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
      isCentered>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="semi-bold">
            {t('medicines.delete.title')} ( <b>{data?.title}</b> )
          </AlertDialogHeader>

          <AlertDialogBody>
            {t('medicines.delete.message')}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={onClose}
              colorScheme="gray"
              size={'sm'}>
              {t('medicines.delete.buttons.cancel')}
            </Button>
            <Button
              colorScheme="red"
              onClick={DeleteMed}
              ml={3}
              size={'sm'}
              isLoading={isLoading}>
              {t('medicines.delete.buttons.delete')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
