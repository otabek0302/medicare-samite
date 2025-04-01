import { AiOutlineUpload } from 'react-icons/ai';
/* eslint-disable react/prop-types */
import { Box, Button, Center, CloseButton, Divider, Flex, FormControl, FormLabel, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, VisuallyHidden, useToast } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { DELETE, UPDATE } from '../../Controllers/ApiControllers';

import admin from '../../Controllers/admin';
import imageBaseURL from '../../Controllers/image';
import ShowToast from '../../Controllers/ShowToast';

// @ts-ignore
export default function UpdateDepartmentModel({ isOpen, onClose, data }) {
  const { t } = useTranslation();
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState();
  const [isDeleteLoading, setIsDeleteLoading] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
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
  const AddNewDepartment = async (Inputdata) => {
    let formData = {
      ...Inputdata,
      image: selectedFile,
      id: data.id
    };

    try {
      // @ts-ignore
      setIsLoading(true);
      const res = await UPDATE(admin.token, 'udpate_department', formData);
      // @ts-ignore
      setIsLoading(false);
      if (res.response === 200) {
        // @ts-ignore
        ShowToast(toast, 'success', t('departments.update.messages.success'));
        // @ts-ignore
        queryClient.invalidateQueries(['department']);
        reset();
        setSelectedFile(null);
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

  //   deleteImage
  const DeleteImage = async () => {
    let formData = {
      id: data.id
    };
    try {
      // @ts-ignore
      setIsDeleteLoading(true);
      const res = await DELETE(
        admin.token,
        'remove_department_image',
        formData
      );
      // @ts-ignore
      setIsDeleteLoading(false);
      if (res.response === 200) {
        ShowToast(toast, 'success', t('departments.update.messages.imageDeleted'));
        // @ts-ignore
        queryClient.invalidateQueries(['department']);
        reset();
        setSelectedFile(null);
        onClose();
      } else {
        ShowToast(toast, 'error', res.message);
      }
    } catch (error) {
      // @ts-ignore
      setIsDeleteLoading(false);
      ShowToast(toast, 'error', JSON.stringify(error));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={'lg'}
      scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent
        as={'form'}
        onSubmit={handleSubmit(AddNewDepartment)}>
        <ModalHeader
          fontSize={18}
          py={2}>
          {t('departments.update.title')}
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <Box pb={3}>
            <FormControl isRequired>
              <FormLabel>{t('departments.update.form.title.label')}</FormLabel>
              <Input
                defaultValue={data?.title}
                placeholder={t('departments.update.form.title.placeholder')}
                {...register('title', { required: true })}
              />
            </FormControl>
            <FormControl
              isRequired
              mt={5}>
              <FormLabel>{t('departments.update.form.description.label')}</FormLabel>
              <Textarea
                defaultValue={data?.description}
                placeholder={t('departments.update.form.description.placeholder')}
                {...register('description', { required: true })}
              />
            </FormControl>
            {data?.image && (
              <Flex
                mt={5}
                align={'center'}
                gap={5}>
                <Image
                  src={`${imageBaseURL}/${data?.image}`}
                  width={100}
                  borderRadius={5}
                />
                <Button
                  size={'sm'}
                  colorScheme="red"
                  fontSize={12}
                  isLoading={isDeleteLoading}
                  onClick={DeleteImage}>
                  {t('departments.update.form.image.remove')}
                </Button>
              </Flex>
            )}
            {!data?.image && (
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
                    <Text>{t('departments.update.form.image.dropzone.selectedFile')} {selectedFile?.name}</Text>
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
                      {' '}
                      <Input
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
                      {t('departments.update.form.image.dropzone.title')}
                    </Text>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </ModalBody>
        <Divider />
        <ModalFooter py={3}>
          <Button
            colorScheme="gray"
            mr={3}
            onClick={onClose}
            size={'sm'}>
            {t('departments.update.buttons.close')}
          </Button>
          <Button
            variant="solid"
            size={'sm'}
            colorScheme="blue"
            type="submit"
            isLoading={isLoading}>
            {t('departments.update.buttons.update')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
