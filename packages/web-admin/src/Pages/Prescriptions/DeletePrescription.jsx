/* eslint-disable react/prop-types */
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useToast } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { DELETE } from '../../Controllers/ApiControllers';

import admin from '../../Controllers/admin';
import ShowToast from '../../Controllers/ShowToast';
import { useTranslation } from 'react-i18next';

// @ts-ignore
export default function DeletePrescription({ isOpen, onClose, data }) {
  const { t } = useTranslation();
  const toast = useToast();
  const cancelRef = useRef();
  const queryClient = useQueryClient();
  const [isLoading, setisLoading] = useState();

  const handleDelete = async () => {
    let formData = { id: data.id };
    try {
      // @ts-ignore 
      setisLoading(true);
      const res = await DELETE(admin.token, 'delete_prescription', formData);
      // @ts-ignore
      setisLoading(false);
      if (res.response === 200) {
        ShowToast(toast, 'success', 'Prescription Deleted!');
        // @ts-ignore
        queryClient.invalidateQueries(['prescriptions', data.id]);
        // @ts-ignore
        queryClient.invalidateQueries([ 'prescriptions-patient', data.patient_id ]);
        // @ts-ignore
        queryClient.invalidateQueries([ 'prescriptions-patient', data.appointment_id ]);
        // @ts-ignore
        queryClient.invalidateQueries(['prescriptions']);
        onClose();
      } else {
        ShowToast(toast, 'error', res.message);
      }
    } catch (error) {
      // @ts-ignore
      setisLoading(false);
      ShowToast(toast, 'error', JSON.stringify(error));
    }
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      // @ts-ignore
      leastDestructiveRef={cancelRef}
      isCentered>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader
            fontSize="lg"
            fontWeight="semi-bold">
            {t('prescriptions.delete.title')} ( <b>#{data?.id}</b> )
          </AlertDialogHeader>

          <AlertDialogBody>
            {t('prescriptions.delete.message')}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              // @ts-ignore
              ref={cancelRef}
              onClick={onClose}
              colorScheme="gray"
              size={'sm'}>
              {t('prescriptions.delete.buttons.cancel')}
            </Button>
            <Button
              colorScheme="red"
              onClick={handleDelete}
              ml={3}
              size={'sm'}
              isLoading={isLoading}>
              {t('prescriptions.delete.buttons.delete')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
