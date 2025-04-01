/* eslint-disable react/prop-types */
import { Box, Button, Divider, Flex, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { AiOutlineDown } from 'react-icons/ai';
import { UPDATE } from '../../Controllers/ApiControllers';

import moment from 'moment';
import UsersCombobox from '../../Components/UsersComboBox';
import useUserData from '../../Hooks/Users';
import ISDCODEMODAL from '../../Components/IsdModal';
import admin from '../../Controllers/admin';
import ShowToast from '../../Controllers/ShowToast';
import todayDate from '../../Controllers/today';
import { useTranslation } from 'react-i18next';

// @ts-ignore
function AddFamily({ isOpen, onClose, user }) {
  const [isLoading, setIsLoading] = useState();
  const { register, handleSubmit } = useForm();
  const { usersData } = useUserData();
  const [selectedUser, setselectedUser] = useState();
  const [isd_code, setisd_code] = useState('+91');
  const { t } = useTranslation();
  
  const queryClient = useQueryClient();
  const toast = useToast();
  
  const { isOpen: isIsdOpen, onOpen: onIsdOpen, onClose: onIsdClose } = useDisclosure();

  // @ts-ignore
  const AddNewDepartment = async (Inputdata) => {
    if (!selectedUser) {
      ShowToast(toast, 'error', 'Select User');
    }
    let formData = { ...Inputdata, dob: moment(Inputdata.dob).format('YYYY-MM-DD'), isd_code: isd_code, user_id: selectedUser.id };

    try {
      // @ts-ignore
      setIsLoading(true);
      const res = await UPDATE(admin.token, 'add_family_member', formData);
      // @ts-ignore
      setIsLoading(false);
      if (res.response === 200) {
        ShowToast(toast, 'success', 'Family Member Added!');
        // @ts-ignore
        queryClient.invalidateQueries(['family-members']);
        // @ts-ignore
        queryClient.invalidateQueries(['family-members']);
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
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={'4xl'} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent as={'form'} onSubmit={handleSubmit(AddNewDepartment)}>
        <ModalHeader fontSize={18} py={2}>
          {t('familyMembers.add.title')}
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <Box pb={3}>
            <Flex gap={3}>
              <FormControl isRequired>
                <FormLabel>{t('familyMembers.add.form.user')}</FormLabel>
                <UsersCombobox
                  data={usersData}
                  name={'User'}
                  setState={setselectedUser}
                  // @ts-ignore
                  isUser
                  defaultData={user}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>{t('familyMembers.add.form.firstName.label')}</FormLabel>
                <Input
                  placeholder={t('familyMembers.add.form.firstName.placeholder')}
                  {...register('f_name', { required: true })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>{t('familyMembers.add.form.lastName.label')}</FormLabel>
                <Input
                  placeholder={t('familyMembers.add.form.lastName.placeholder')}
                  {...register('l_name', { required: true })}
                />
              </FormControl>
            </Flex>
            <Flex
              gap={3}
              mt={5}>
              <FormControl isRequired>
                <FormLabel>{t('familyMembers.add.form.phone.label')}</FormLabel>
                <InputGroup>
                  <InputLeftAddon
                    cursor={'pointer'}
                    onClick={(e) => {
                      e.stopPropagation();
                      onIsdOpen();
                    }}>
                    {isd_code} <AiOutlineDown style={{ marginLeft: '10px' }} />
                  </InputLeftAddon>
                  <Input
                    type="tel"
                    placeholder={t('familyMembers.add.form.phone.placeholder')}
                    {...register('phone', {
                      required: true,
                      pattern: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\\./0-9]*$/g
                    })}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>{t('familyMembers.add.form.gender.label')}</FormLabel>
                <Select
                  placeholder={t('familyMembers.add.form.gender.placeholder')}
                  {...register('gender', { required: true })}>
                  <option value="Male">{t('familyMembers.add.form.gender.options.male')}</option>
                  <option value="Female">{t('familyMembers.add.form.gender.options.female')}</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>{t('familyMembers.add.form.dateOfBirth.label')}</FormLabel>
                <Input
                  max={todayDate()}
                  type="date"
                  placeholder={t('familyMembers.add.form.dateOfBirth.placeholder')}
                  {...register('dob', { required: true })}
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
            {t('familyMembers.add.buttons.close')}
          </Button>
          <Button
            variant="solid"
            size={'sm'}
            colorScheme="blue"
            type="submit"
            isLoading={isLoading}>
            {t('familyMembers.add.buttons.add')}
          </Button>
        </ModalFooter>
      </ModalContent>
      <ISDCODEMODAL
        isOpen={isIsdOpen}
        onClose={onIsdClose}
        setisd_code={setisd_code}
      />
    </Modal>
  );
}

export default AddFamily;
