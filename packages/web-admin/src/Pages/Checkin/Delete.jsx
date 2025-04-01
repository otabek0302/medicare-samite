/* eslint-disable react/prop-types */
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useToast } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { DELETE } from '../../Controllers/ApiControllers';
import ShowToast from '../../Controllers/ShowToast';
import admin from '../../Controllers/admin';

// @ts-ignore
export default function DeleteCheckin({ isOpen, onClose, data }) {
  const { t } = useTranslation();
  const toast = useToast();
  // @ts-ignore
  const cancelRef = useRef(null);
  const queryClient = useQueryClient();
  // @ts-ignore
  const [isLoading, setIsLoading] = useState(false);

  const HandleDelete = async () => {
    const formData = {
      id: data.id
    };
    try {
      setIsLoading(true);
      const res = await DELETE(
        admin.token,
        'delete_appointment_checkin',
        formData
      );
      setIsLoading(false);
      if (res.response === 200) {
        ShowToast(toast, 'success', t('checkin.success.deleted'));
        queryClient.invalidateQueries({ queryKey: ['checkins'] });
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
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
      isCentered>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="semi-bold">
            {t('checkin.delete.title')} ({' '}
            <b>
              {data?.id} , {data?.time} {data?.date}
            </b>{' '}
            )
          </AlertDialogHeader>

          <AlertDialogBody>
            {t('checkin.delete.confirm')}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={onClose}
              colorScheme="gray"
              size={'sm'}>
              {t('checkin.delete.cancel')}
            </Button>
            <Button
              colorScheme="red"
              onClick={HandleDelete}
              ml={3}
              size={'sm'}
              isLoading={isLoading}>
              {t('checkin.delete.delete')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
