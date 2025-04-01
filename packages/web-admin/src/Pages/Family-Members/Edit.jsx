/* eslint-disable react/prop-types */
import { Box, Button, Divider, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { GET, UPDATE } from '../../Controllers/ApiControllers';

import admin from '../../Controllers/admin';
import Loading from '../../Components/Loading';
import moment from 'moment';
import ShowToast from '../../Controllers/ShowToast';
import todayDate from '../../Controllers/today';

// @ts-ignore
function EditFamily({ data, isOpen, onClose }) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState();
  const { register, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const toast = useToast();

  const { isLoading: isDataLoading, data: memberData } = useQuery({ queryKey: ['family-member', data.id],
    queryFn: async () => {
      const res = await GET(admin.token, `get_family_members/${data.id}`);
      return res.data;
    }
  });

  // @ts-ignore
  const AddNewDepartment = async (Inputdata) => {
    let formData = { ...Inputdata, dob: moment(Inputdata.dob).format('YYYY-MM-DD'), id: data.id};

    try {
      setIsLoading(true);
      const res = await UPDATE(admin.token, 'update_family_member', formData);
      setIsLoading(false);
      if (res.response === 200) {
        ShowToast(toast, 'success', t('familyMembers.edit.messages.success'));
        queryClient.invalidateQueries(['family-member', data.id]);
        queryClient.invalidateQueries(['family-members']);
        onClose();
      } else {
        ShowToast(toast, 'error', res.message);
      }
    } catch (error) {
      setIsLoading(false);
      ShowToast(toast, 'error', JSON.stringify(error));
    }
  };

  if (isDataLoading) return <Loading />;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={'2xl'}
      scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent
        as={'form'}
        onSubmit={handleSubmit(AddNewDepartment)}>
        <ModalHeader
          fontSize={18}
          py={2}>
          {t('familyMembers.edit.title')}
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <Box pb={3}>
            <Flex gap={3}>
              {' '}
              <FormControl isRequired>
                <FormLabel>{t('familyMembers.edit.form.firstName.label')}</FormLabel>
                <Input
                  defaultValue={memberData?.f_name}
                  placeholder={t('familyMembers.edit.form.firstName.placeholder')}
                  {...register('f_name', { required: true })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>{t('familyMembers.edit.form.lastName.label')}</FormLabel>
                <Input
                  defaultValue={memberData?.l_name}
                  placeholder={t('familyMembers.edit.form.lastName.placeholder')}
                  {...register('l_name', { required: true })}
                />
              </FormControl>
            </Flex>
            <Flex
              gap={3}
              mt={5}>
              {' '}
              <FormControl isRequired>
                <FormLabel>{t('familyMembers.edit.form.gender.label')}</FormLabel>
                <Select
                  defaultValue={memberData?.gender}
                  placeholder={t('familyMembers.edit.form.gender.placeholder')}
                  {...register('gender', { required: true })}>
                  <option value="Male">{t('familyMembers.edit.form.gender.options.male')}</option>
                  <option value="Female">{t('familyMembers.edit.form.gender.options.female')}</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>{t('familyMembers.edit.form.dateOfBirth.label')}</FormLabel>
                <Input
                  max={todayDate()}
                  type="date"
                  defaultValue={memberData?.dob}
                  placeholder={t('familyMembers.edit.form.dateOfBirth.placeholder')}
                  {...register('dob', { required: true })}
                />
              </FormControl>
            </Flex>
            <Flex
              gap={3}
              mt={5}>
              {' '}
              <FormControl isRequired>
                <FormLabel>{t('familyMembers.edit.form.phone.label')}</FormLabel>
                <Input
                  defaultValue={memberData?.phone}
                  placeholder={t('familyMembers.edit.form.phone.placeholder')}
                  {...register('phone', { required: true })}
                />
              </FormControl>
            </Flex>
          </Box>
        </ModalBody>
        <Divider />
        <ModalFooter py={3}>
          <Button
            colorScheme="gray"
            mr={3}
            onClick={onClose}
            size={'sm'}>
            {t('familyMembers.edit.buttons.close')}
          </Button>
          <Button
            variant="solid"
            size={'sm'}
            colorScheme="blue"
            type="submit"
            isLoading={isLoading}>
            {t('familyMembers.edit.buttons.update')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditFamily;
