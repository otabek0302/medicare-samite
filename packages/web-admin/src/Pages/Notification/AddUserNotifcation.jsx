/* eslint-disable react/prop-types */
import { Box, Button, Center, CloseButton, Divider, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useToast, VisuallyHidden } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { ADD } from '../../Controllers/ApiControllers';
import { AiOutlineUpload } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

import ShowToast from '../../Controllers/ShowToast';
import admin from '../../Controllers/admin';

export default function AddUserNotification({ isOpen, onClose }) {
  const { t } = useTranslation();
  const [isLoading, setisLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef();
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const toast = useToast();

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleAdd = async (data) => {
    let formData = {
      ...data,
      image: selectedFile,
      topic: 'PATIENT_APP'
    };
    try {
      setisLoading(true);
      const res = await ADD(admin.token, 'add_user_notification', formData);
      setisLoading(false);
      if (res.response === 200) {
        ShowToast(toast, 'success', t('notifications.add.messages.success'));
        queryClient.invalidateQueries({ queryKey: ['notification-user'] });
        onClose();
        reset();
      } else {
        ShowToast(toast, 'error', res.message);
      }
    } catch (error) {
      setisLoading(false);
      ShowToast(toast, 'error', t('notifications.add.messages.error'));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={'lg'}>
      <ModalOverlay />
      <ModalContent as={'form'} onSubmit={handleSubmit(handleAdd)}>
        <ModalHeader fontSize={18} py={2}>
          {t('notifications.add.title')}
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <Box pb={3}>
            <FormControl isRequired>
              <FormLabel>{t('notifications.add.form.title.label')}</FormLabel>
              <Input
                textTransform={'uppercase'}
                placeholder={t('notifications.add.form.title.placeholder')}
                {...register('title', { required: true })}
              />
            </FormControl>

            <FormControl isRequired mt={5}>
              <FormLabel>{t('notifications.add.form.body.label')}</FormLabel>
              <Textarea
                placeholder={t('notifications.add.form.body.placeholder')}
                {...register('body', { required: true })}
              />
            </FormControl>
            <Box
              mt={5}
              p={4}
              border="2px dashed"
              borderColor="gray.300"
              borderRadius="md"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.click();
                }
              }}
              cursor={'pointer'}>
              {selectedFile ? (
                <Box position={'relative'}>
                  <Text>
                    {t('notifications.add.form.file.selectedFile')} {selectedFile.name}
                  </Text>
                  <CloseButton
                    position={'absolute'}
                    right={-2}
                    top={-2}
                    size={'sm'}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                    }}
                  />
                </Box>
              ) : (
                <Box>
                  <VisuallyHidden>
                    <Input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileChange}
                      accept=".jpeg, .svg, .png , .jpg"
                      mb={4}
                    />
                  </VisuallyHidden>

                  <Center>
                    <AiOutlineUpload fontSize={32} />
                  </Center>
                  <Text textAlign={'center'} mt={3}>
                    <b>{t('notifications.add.form.file.choose')}</b> {t('notifications.add.form.file.dragHere')}
                  </Text>
                </Box>
              )}
            </Box>
          </Box>
        </ModalBody>
        <Divider />
        <ModalFooter py={3}>
          <Button colorScheme="gray" mr={3} onClick={onClose} size={'sm'}>
            {t('notifications.add.buttons.close')}
          </Button>
          <Button variant="solid" size={'sm'} colorScheme="blue" type="submit" isLoading={isLoading}>
            {t('notifications.add.buttons.send')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
