/* eslint-disable react/prop-types */
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { DELETE } from '../../Controllers/ApiControllers';
import ShowToast from '../../Controllers/ShowToast';
import admin from '../../Controllers/admin';
import { useTranslation } from 'react-i18next';

export default function DeleteDoctor({ isOpen, onClose, data }) {
  const { t } = useTranslation();
  const toast = useToast();
  const cancelRef = useRef();
  const queryClient = useQueryClient();
  const [isLoading, setisLoading] = useState(false);

  const HandleDelete = async () => {
    let formData = {
      id: data.id
    };
    try {
      setisLoading(true);
      const res = await DELETE(admin.token, 'delete_specialization', formData);
      setisLoading(false);
      if (res.response === 200) {
        ShowToast(toast, 'success', t('doctors.delete.success'));
        queryClient.invalidateQueries({ queryKey: ['doctors'] });
        onClose();
      } else {
        ShowToast(toast, 'error', res.message);
      }
    } catch (error) {
      setisLoading(false);
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
            {t('doctors.delete.titleWithName', {
              id: data?.id,
              firstName: data?.f_name,
              lastName: data?.l_name
            })}
          </AlertDialogHeader>

          <AlertDialogBody>
            {t('doctors.delete.confirmMessage')}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={onClose}
              colorScheme="gray"
              size={'sm'}>
              {t('doctors.delete.cancel')}
            </Button>
            <Button
              colorScheme="red"
              onClick={HandleDelete}
              ml={3}
              size={'sm'}
              isLoading={isLoading}>
              {t('doctors.delete.confirm')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
