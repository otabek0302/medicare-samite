import { AiOutlineUpload } from 'react-icons/ai';
/* eslint-disable react/prop-types */
import { Box, Button, Center, CloseButton, Divider, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VisuallyHidden, useToast } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { ADD } from '../../Controllers/ApiControllers';
import { useTranslation } from 'react-i18next';

import ShowToast from '../../Controllers/ShowToast';
import admin from '../../Controllers/admin';
import usePatientData from '../../Hooks/UsePatientsData';
import UsersCombobox from '../../Components/UsersComboBox';

// @ts-ignore
export default function AddPatientsFiles({ isOpen, onClose }) {
  const { t } = useTranslation();
  const [isLoading, setisLoading] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef();
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const toast = useToast();
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const { patientsData } = usePatientData();
  const [patient, setpatient] = useState();

  // @ts-ignore
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.size > MAX_FILE_SIZE) {
      ShowToast(toast, 'error', t('files.messages.sizeError'));
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
      ShowToast(toast, 'error', t('files.messages.sizeError'));
    } else {
      setSelectedFile(file);
    }
  };

  // @ts-ignore
  const AddNewFile = async (data) => {
    if (!patient) {
      return ShowToast(toast, 'error', t('files.messages.patientError'));
    }
    if (!selectedFile) {
      return ShowToast(toast, 'error', t('files.messages.fileError'));
    }

    let formData = {
      ...data,
      // @ts-ignore
      patient_id: patient.id,
      file: selectedFile
    };
    try {
      // @ts-ignore
      setisLoading(true);
      const res = await ADD(admin.token, 'add_patient_file', formData);
      // @ts-ignore
      setisLoading(false);
      if (res.response === 200) {
        ShowToast(toast, 'success', t('files.messages.success'));
        // @ts-ignore
        queryClient.invalidateQueries(['patient-files', patient.id]);
        // @ts-ignore
        queryClient.invalidateQueries(['all-files']);
        setSelectedFile(null);
        reset();
        onClose();
      } else {
        ShowToast(toast, 'error', res.message);
      }
    } catch (error) {
      // @ts-ignore
      setisLoading(false);
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
          {t('files.title')}
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <Box pb={3}>
            <FormControl isRequired>
              <FormLabel>{t('files.form.title')}</FormLabel>
              {/* @ts-ignore */}
              <UsersCombobox
                data={patientsData}
                name={'Patient'}
                setState={setpatient}
                addNew={false}
              />
            </FormControl>
            <FormControl
              isRequired
              mt={5}>
              <FormLabel>{t('files.form.fileName')}</FormLabel>
              <Input
                placeholder="Name"
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
                  <Text>{t('files.form.selectedFile')}: {selectedFile.name}</Text>
                  {/* @ts-ignore */}
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
                    <b>{t('files.form.choose')}</b> {t('files.form.dragHere')}.
                    <br />
                    {t('files.form.maxSize')}
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
            {t('files.buttons.close')}
          </Button>
          <Button
            variant="solid"
            size={'sm'}
            colorScheme="blue"
            type="submit"
            isLoading={isLoading}>
            {t('files.buttons.add')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
