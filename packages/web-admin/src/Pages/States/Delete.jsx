/* eslint-disable react/prop-types */
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useToast } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { DELETE } from '../../Controllers/ApiControllers';
import { useTranslation } from 'react-i18next';

import admin from '../../Controllers/admin';
import showToast from '../../Controllers/ShowToast';

export default function DeleteState({ isOpen, onClose, data }) {
  const { t } = useTranslation();
  const toast = useToast();
  const cancelRef = useRef();
  const queryClient = useQueryClient();
  const [isLoading, setisLoading] = useState();

  const DeleteRole = async () => {
    let formData = { id: data.id };
    try {
      setisLoading(true);
      const res = await DELETE(admin.token, 'delete_state', formData);
      setisLoading(false);
      if (res.response === 200) {
        showToast(toast, 'success', t('states.delete.messages.success'));
        queryClient.invalidateQueries('states');
        onClose();
      } else {
        showToast(toast, 'error', t('states.delete.messages.error'));
      }
    } catch (error) {
      setisLoading(false);
      showToast(toast, 'error', JSON.stringify(error));
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
          <AlertDialogHeader
            fontSize="lg"
            fontWeight="semi-bold">
            {t('states.delete.title')} ( <b>{data?.title}</b> )
          </AlertDialogHeader>

          <AlertDialogBody>
            {t('states.delete.message')}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={onClose}
              colorScheme="gray"
              size={'sm'}>
              {t('states.delete.buttons.cancel')}
            </Button>
            <Button
              colorScheme="red"
              onClick={DeleteRole}
              ml={3}
              size={'sm'}
              isLoading={isLoading}>
              {t('states.delete.buttons.delete')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
