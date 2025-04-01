/* eslint-disable react/prop-types */
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useToast } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { DELETE } from '../../Controllers/ApiControllers';

import ShowToast from '../../Controllers/ShowToast';
import admin from '../../Controllers/admin';

// @ts-ignore
export default function DeleteFamily({ isOpen, onClose, data }) {
  const toast = useToast();
  const cancelRef = useRef();
  const queryClient = useQueryClient();
  
  const [isLoading, setIsLoading] = useState();
  const { t } = useTranslation();
  
  const DeleteDeparment = async () => {
    let formData = { id: data.id };
    try {
      setIsLoading(true);
      const res = await DELETE(admin.token, 'delete_family_member', formData);
      setIsLoading(false);
      if (res.response === 200) {
        ShowToast(toast, 'success', t('familyMembers.delete.messages.success'));
        queryClient.invalidateQueries('family-members');
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
            {t('familyMembers.delete.title')} ( <b>{data['Member name']}</b> )
          </AlertDialogHeader>

          <AlertDialogBody>
            {t('familyMembers.delete.message')}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={onClose}
              colorScheme="gray"
              size={'sm'}>
              {t('familyMembers.delete.buttons.cancel')}
            </Button>
            <Button
              colorScheme="red"
              onClick={DeleteDeparment}
              ml={3}
              size={'sm'}
              isLoading={isLoading}>
              {t('familyMembers.delete.buttons.delete')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
