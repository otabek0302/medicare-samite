/* eslint-disable react/prop-types */
import { Box, Button, Divider, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { UPDATE } from '../../Controllers/ApiControllers';

import ShowToast from '../../Controllers/ShowToast';
import admin from '../../Controllers/admin';
import useHasPermission from '../../Hooks/HasPermission';
import UsersCombobox from '../../Components/UsersComboBox';
import useUserData from '../../Hooks/Users';

// @ts-ignore
export default function AssignRole({ isOpen, onClose, Roles }) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { hasPermission } = useHasPermission();
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const toast = useToast();
  const { usersData } = useUserData();
  const [selectedUser, setSelectedUser] = useState();

  // @ts-ignore
  const addRole = async (Inputdata) => {
    if (!selectedUser) {
      return ShowToast(toast, 'error', 'Please Select User');
    }
    let formData = {
      ...Inputdata,
      // @ts-ignore
      user_id: selectedUser.id
    };

    try {
      setIsLoading(true);
      const res = await UPDATE(admin.token, 'assign_role', formData);
      setIsLoading(false);
      if (res.response === 200) {
        ShowToast(toast, 'success', t('roles.assign.messages.success'));
        // @ts-ignore
        queryClient.invalidateQueries('roles');
        reset();
        onClose();
      } else {
        ShowToast(toast, 'error', res.message);
      }
    } catch (error) {
      setIsLoading(false);
      ShowToast(toast, 'error', JSON.stringify(error));
    }
  };
  if (!hasPermission)
    return toast({
      title: t('roles.assign.messages.error'),
      description:
        t('roles.assign.messages.errorDescription'),
      status: 'error',
      duration: 2000,
      isClosable: true,
      position: 'top'
    });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={'xl'}
      scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent
        as={'form'}
        onSubmit={handleSubmit(addRole)}>
        <ModalHeader
          fontSize={18}
          py={2}>
          {t('roles.assign.title')}
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <Box pb={3}>
            <FormControl isRequired>
              <FormLabel>{t('roles.assign.form.user')}</FormLabel>
              {/* @ts-ignore */}
              <UsersCombobox
                name={'user'}
                data={usersData}
                setState={setSelectedUser}
              />
            </FormControl>
            <FormControl
              isRequired
              mt={5}>
              <FormLabel>{t('roles.assign.form.role')}</FormLabel>
              <Select placeholder={t('roles.assign.form.placeholder')}
                {...register('role_id', { required: true })}>
                {/* @ts-ignore */}
                {Roles?.map((role) => (
                  <option
                    value={role.id}
                    key={role.id}>
                    {role.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Box>
        </ModalBody>
        <Divider />
        <ModalFooter py={3}>
          <Button
            colorScheme="gray"
            mr={3}
            onClick={onClose}
            size={'sm'}>
            {t('roles.assign.buttons.close')}
          </Button>
          <Button
            variant="solid"
            size={'sm'}
            colorScheme="blue"
            type="submit"
            isLoading={isLoading}>
            {t('roles.assign.buttons.submit')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
