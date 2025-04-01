/* eslint-disable react/prop-types */
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useToast } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { DELETE } from '../../Controllers/ApiControllers';
import admin from '../../Controllers/admin';
import ShowToast from '../../Controllers/ShowToast';

// @ts-ignore
export default function DeleteDepartment({ isOpen, onClose, data }) {
  const { t } = useTranslation();
  const toast = useToast();
  const cancelRef = useRef();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState();

  const DeleteDepartment = async () => {
    let formData = {
      id: data.id
    };
    try {
      // @ts-ignore
      setIsLoading(true);
      const res = await DELETE(admin.token, 'delete_department', formData);
      // @ts-ignore
      setIsLoading(false);
      if (res.response === 200) {
        ShowToast(toast, 'success', t('departments.delete.messages.success'));
        // @ts-ignore
        queryClient.invalidateQueries('department');
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
    // @ts-ignore
    <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef} isCentered >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="semi-bold">
            {t('departments.delete.titleWithName', { title: data?.title })}
          </AlertDialogHeader>

          <AlertDialogBody>
            {t('departments.delete.confirmMessage')}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              // @ts-ignore
              ref={cancelRef.current}
              onClick={onClose}
              colorScheme="gray"
              size={'sm'}
            >
              {t('departments.delete.buttons.cancel')}
            </Button>
            <Button
              colorScheme="red"
              onClick={DeleteDepartment}
              ml={3}
              size={'sm'}
              isLoading={isLoading}
            >
              {t('departments.delete.buttons.delete')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
