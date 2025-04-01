/* eslint-disable react/prop-types */
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useToast } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { DELETE } from '../../Controllers/ApiControllers';

import admin from '../../Controllers/admin';
import ShowToast from '../../Controllers/ShowToast';

export default function DeleteCoupons({ isOpen, onClose, data }) {
  const { t } = useTranslation();
  const toast = useToast();
  const cancelRef = useRef();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const DeleteCoupon = async () => {
    let formData = {
      id: data.id
    };
    try {
      setIsLoading(true);
      const res = await DELETE(admin.token, 'delete_coupon', formData);
      setIsLoading(false);
      if (res.response === 200) {
        ShowToast(toast, 'success', t('coupons.delete.messages.success'));
        queryClient.invalidateQueries({ queryKey: ['coupons'] });
        onClose();
      } else {
        ShowToast(toast, 'error', res.message);
      }
    } catch (error) {
      setIsLoading(false);
      ShowToast(toast, 'error', t('coupons.delete.messages.error'));
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
            {t('coupons.delete.title')} ( <b>{data?.title}</b> )
          </AlertDialogHeader>

          <AlertDialogBody>
            {t('coupons.delete.message')}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={onClose}
              colorScheme="gray"
              size={'sm'}>
              {t('coupons.delete.buttons.cancel')}
            </Button>
            <Button
              colorScheme="red"
              onClick={DeleteCoupon}
              ml={3}
              size={'sm'}
              isLoading={isLoading}>
              {t('coupons.delete.buttons.delete')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
