/* eslint-disable react/prop-types */
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useToast } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { DELETE } from '../../Controllers/ApiControllers';

import ShowToast from '../../Controllers/ShowToast';
import admin from '../../Controllers/admin';

// @ts-ignore
export default function DeleteSpecialization({ isOpen, onClose, data }) {
  const { t } = useTranslation();
  const toast = useToast();
  const cancelRef = useRef();
  const queryClient = useQueryClient();
  
  const [isLoading, setIsLoading] = useState();

  const HandleDelete = async () => {
    let formData = { id: data.id };
    try {
      // @ts-ignore
      setIsLoading(true);
      const res = await DELETE(admin.token, 'delete_specialization', formData);
      // @ts-ignore
      setIsLoading(false);
      if (res.response === 200) {
        ShowToast(toast, 'success', t('specializations.delete.messages.success'));
        // @ts-ignore
        queryClient.invalidateQueries('specialization');
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
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      // @ts-ignore
      leastDestructiveRef={cancelRef.current}
      isCentered>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader
            fontSize="lg"
            fontWeight="semi-bold">
            {t('specializations.delete.titleWithName', { title: data?.title })}
          </AlertDialogHeader>

          <AlertDialogBody>
            {t('specializations.delete.confirmMessage')}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              // @ts-ignore
              ref={cancelRef}
              onClick={onClose}
              colorScheme="gray"
              size={'sm'}>
              {t('specializations.delete.buttons.cancel')}
            </Button>
            <Button
              colorScheme="red"
              onClick={HandleDelete}
              ml={3}
              size={'sm'}
              isLoading={isLoading}>
              {t('specializations.delete.buttons.delete')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
