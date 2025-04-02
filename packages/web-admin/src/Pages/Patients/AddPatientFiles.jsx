import { AiOutlineUpload } from 'react-icons/ai';
/* eslint-disable react/prop-types */
import { Box, Button, Center, CloseButton, Divider, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VisuallyHidden, useToast } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { ADD } from '../../Controllers/ApiControllers';

import ShowToast from '../../Controllers/ShowToast';
import admin from '../../Controllers/admin';

// @ts-ignore
export default function AddPatientFiles({ isOpen, onClose, id }) {
  const { t } = useTranslation();
  const fileInputRef = useRef();
  const toast = useToast();
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();

  const [isLoading, setIsLoading] = useState();
  const [selectedFile, setSelectedFile] = useState(null);

  // @ts-ignore
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.size > MAX_FILE_SIZE) {
      ShowToast(toast, 'error', t('patients.patientFiles.add.messages.error'));
    } else {
      setSelectedFile(file);
    }
  };

  // @ts-ignore
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // @ts-ignore
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size > MAX_FILE_SIZE) {
      ShowToast(toast, 'error', t('patients.patientFiles.add.messages.error'));
    } else {
      setSelectedFile(file);
    }
  };

  // @ts-ignore
  const AddNewFile = async (data) => {
    const formData = {
      ...data,
      patient_id: id,
      file: selectedFile
    };
    try {
      // @ts-ignore
      setIsLoading(true);
      const res = await ADD(admin.token, 'add_patient_file', formData);
      // @ts-ignore
      setIsLoading(false);
      if (res.response === 200) {
        ShowToast(toast, 'success', t('patients.patientFiles.add.messages.success'));
        // @ts-ignore
        queryClient.invalidateQueries(['patient-files', id]);
        setSelectedFile(null);
        reset();
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={'lg'}>
      <ModalOverlay />
      <ModalContent
        as={'form'}
        onSubmit={handleSubmit(AddNewFile)}>
        <ModalHeader
          fontSize={18}
          py={2}>
          {t('patients.patientFiles.add.title')}
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <Box pb={3}>
            <FormControl isRequired>
              <FormLabel>{t('patients.patientFiles.add.form.name.label')}</FormLabel>
              <Input
                placeholder={t('patients.patientFiles.add.form.name.placeholder')}
                {...register('file_name', { required: true })}
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
                  // @ts-ignore
                  fileInputRef.current.click();
                }
              }}
              cursor={'pointer'}>
              {selectedFile ? (
                <Box position={'relative'}>
                  {/* @ts-ignore */}
                  <Text>{t('patients.patientFiles.add.form.file.selectedFile')} {selectedFile.name}</Text>
                  <CloseButton
                    position={'absolute'}
                    right={-2}
                    top={-2}
                    size={'sm'}
                    onClick={() => {
                      setSelectedFile(null);
                    }}
                  />
                </Box>
              ) : (
                <Box>
                  <VisuallyHidden>
                    {' '}
                    <Input
                      // @ts-ignore
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileChange}
                      accept="*"
                      mb={4}
                    />
                  </VisuallyHidden>

                  <Center>
                    {' '}
                    <AiOutlineUpload fontSize={32} />
                  </Center>
                  <Text
                    textAlign={'center'}
                    mt={3}>
                    <b>{t('patients.patientFiles.add.form.file.choose')}</b> {t('patients.patientFiles.add.form.file.dragHere')}
                    <br />
                    {t('patients.patientFiles.add.form.file.maxSize')}
                  </Text>
                </Box>
              )}
            </Box>
          </Box>
        </ModalBody>
        <Divider />
        <ModalFooter py={3}>
          <Button
            colorScheme="gray"
            mr={3}
            onClick={onClose}
            size={'sm'}>
            {t('patients.patientFiles.add.buttons.close')}
          </Button>
          <Button
            variant="solid"
            size={'sm'}
            colorScheme="blue"
            type="submit"
            isLoading={isLoading}>
            {t('patients.patientFiles.add.buttons.add')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
