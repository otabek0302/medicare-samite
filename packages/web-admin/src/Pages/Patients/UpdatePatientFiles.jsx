import { AiOutlineUpload } from 'react-icons/ai';
/* eslint-disable react/prop-types */
import { Box, Button, Center, CloseButton, Divider, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VisuallyHidden, useToast } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { UPDATE } from '../../Controllers/ApiControllers';

import admin from '../../Controllers/admin';
import ShowToast from '../../Controllers/ShowToast';

// @ts-ignore
export default function UpdatePatientFiles({ isOpen, onClose, data }) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const fileInputRef = useRef();
  const queryClient = useQueryClient();
  const toast = useToast();

  // @ts-ignore
  const handleDrop = (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
  };

  // @ts-ignore
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // @ts-ignore
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // @ts-ignore
  const handleUpdate = async (Inputdata) => {
    let formData = {
      ...Inputdata,
      file: selectedFile,
      id: data.id
    };

    try {
      // @ts-ignore
      setIsLoading(true);
      const res = await UPDATE(admin.token, 'update_patient_file', formData);
      // @ts-ignore
      setIsLoading(false);
      if (res.response === 200) {
        ShowToast(toast, 'success', t('patients.patientFiles.update.messages.success'));
        // @ts-ignore
        queryClient.invalidateQueries(['patient-files', data.patient_id]);
        // @ts-ignore
        queryClient.invalidateQueries(['all-files']);
        reset();
        setSelectedFile(null);
        onClose();
      } else {
        ShowToast(toast, 'error', t('patients.patientFiles.update.messages.error'));
      }
    } catch (error) {
      // @ts-ignore
      setIsLoading(false);
      ShowToast(toast, 'error', JSON.stringify(error));
    }
  };


  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={'lg'} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent as={'form'} onSubmit={handleSubmit(handleUpdate)}>
        <ModalHeader fontSize={18} py={2}>
          {t('patients.patientFiles.update.title')}
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <Box pb={3}>
            <FormControl isRequired>
              <FormLabel>{t('patients.patientFiles.update.form.title.label')}</FormLabel>
              <Input defaultValue={data?.file_name} placeholder={t('patients.patientFiles.update.form.title.placeholder')} {...register('file_name', { required: true })} />
            </FormControl>

            <Box mt={5} p={4} border="2px dashed" borderColor="gray.300" borderRadius="md" onDrop={handleDrop} onDragOver={handleDragOver}
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
                  <Text>{t('patients.patientFiles.update.form.file.selectedFile')}: {selectedFile.name}</Text>
                  {/* @ts-ignore */}
                  <CloseButton position={'absolute'} right={-2} top={-2} size={'sm'}
                    onClick={() => {
                      setSelectedFile(null);
                    }}
                  />
                </Box>
              ) : (
                <Box>
                  <VisuallyHidden>
                    <Input
                      // @ts-ignore
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileChange}
                      accept=".jpeg, .svg, .png , .jpg"
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
                    {/* @ts-ignore */}
                    <b>{t('patients.patientFiles.update.form.file.choose')}</b> {t('patients.patientFiles.update.form.file.dragHere')}
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
            {t('patients.patientFiles.update.form.close')}
          </Button>
          <Button
            variant="solid"
            size={'sm'}
            colorScheme="blue"
            type="submit"
            isLoading={isLoading}>
            {t('patients.patientFiles.update.form.update')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
