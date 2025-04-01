﻿/* eslint-disable react/prop-types */
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
import { DELETE } from '../../../Controllers/ApiControllers';
import admin from '../../../Controllers/admin';
import ShowToast from '../../../Controllers/ShowToast';
export default function DeleteTestimonial({ isOpen, onClose, data }) {
  const toast = useToast();
  const cancelRef = useRef();
  const queryClient = useQueryClient();
  const [isLoading, setisLoading] = useState();
  const handleDelete = async () => {
    let formData = {
      id: data.id
    };
    try {
      setisLoading(true);
      const res = await DELETE(admin.token, 'delete_testimonial', formData);
      setisLoading(false);
      if (res.response === 200) {
        ShowToast(toast, 'success', 'Testimonial Deleted!');
        queryClient.invalidateQueries('testimonials');
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
          <AlertDialogHeader
            fontSize="lg"
            fontWeight="semi-bold">
            Delete Testimonial ( <b>{data?.name}</b> )
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can not undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={onClose}
              colorScheme="gray"
              size={'sm'}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={handleDelete}
              ml={3}
              size={'sm'}
              isLoading={isLoading}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
