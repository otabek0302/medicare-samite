/* eslint-disable react/prop-types */
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Flex, useToast } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { DELETE } from '../../Controllers/ApiControllers';

import admin from '../../Controllers/admin';
import ShowToast from '../../Controllers/ShowToast';

// @ts-ignore
export default function DeletePatientFiles({ isOpen, onClose, data }) {
  const { t } = useTranslation();
  const toast = useToast();
  const cancelRef = useRef();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState();
  const DeleteFile = async () => {
    let formData = { id: data.id };

    try {
      // @ts-ignore
      setIsLoading(true);
      const res = await DELETE(admin.token, 'delete_patient_file', formData);
      // @ts-ignore
      setIsLoading(false);
      if (res.response === 200) {
        ShowToast(toast, 'success', 'Patient File Deleted');
        queryClient.invalidateQueries({ queryKey: ['patient-files', data.patient_id] });
        queryClient.invalidateQueries({ queryKey: ['all-files'] });
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

  // @ts-ignore
  return (
    // @ts-ignore
    <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef} isCentered>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="semi-bold">
            <Flex>
              {t('patientFiles.delete.title')} ( <b>{data?.file_name}</b> )
            </Flex>
          </AlertDialogHeader>

          <AlertDialogBody>
            {t('patientFiles.delete.body')}
          </AlertDialogBody>

          <AlertDialogFooter>
            {/* @ts-ignore */}  
            <Button ref={cancelRef} onClick={onClose} colorScheme="gray" size={'sm'}>
              {t('patientFiles.delete.buttons.cancel')}
            </Button>
            {/* @ts-ignore */}
            <Button colorScheme="red" onClick={DeleteFile} ml={3} size={'sm'} isLoading={isLoading}>
              {t('patientFiles.delete.buttons.delete')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
