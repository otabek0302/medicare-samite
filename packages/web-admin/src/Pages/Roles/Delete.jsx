/* eslint-disable react/prop-types */
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useToast } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { DELETE } from '../../Controllers/ApiControllers';
import { useTranslation } from 'react-i18next';

import admin from '../../Controllers/admin';
import showToast from '../../Controllers/ShowToast';

// @ts-ignore
export default function DeleteRole({ isOpen, onClose, data }) {
  const { t } = useTranslation();
  const toast = useToast();
  const cancelRef = useRef();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState();

  const DeleteRole = async () => {
    if (
      data.name === 'Doctor' ||
      data.name === 'Admin' ||
      data.name === 'Front Desk'
    ) {
      return showToast(toast, 'error', t('roles.delete.messages.cannotDelete'));
    }
    let formData = { id: data.id };
    try {
      // @ts-ignore
      setIsLoading(true);
      const res = await DELETE(admin.token, 'delete_role', formData);
      // @ts-ignore
      setIsLoading(false);
      if (res.response === 200) {
        showToast(toast, 'success', t('roles.delete.messages.success'));
        // @ts-ignore
        queryClient.invalidateQueries('roles');
        onClose();
      } else {
        showToast(toast, 'error', res.message);
      }
    } catch (error) {
      // @ts-ignore
      setIsLoading(false);
      showToast(toast, 'error', JSON.stringify(error));
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
            {t('roles.delete.title')} ( <b>{data?.name}</b> )
          </AlertDialogHeader>

          <AlertDialogBody>
            {t('roles.delete.messages.confirm')}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef.current}
              onClick={onClose}
              colorScheme="gray"
              size={'sm'}>
              {t('roles.delete.buttons.cancel')}
            </Button>
            <Button
              colorScheme="red"
              onClick={DeleteRole}
              ml={3}
              size={'sm'}
              isLoading={isLoading}>
              {t('roles.delete.buttons.delete')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
