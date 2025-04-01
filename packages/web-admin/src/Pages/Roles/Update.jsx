/* eslint-disable react/prop-types */
import { Box, Button, Divider, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ADD, GET, UPDATE } from '../../Controllers/ApiControllers';
import { useTranslation } from 'react-i18next';

import ShowToast from '../../Controllers/ShowToast';
import admin from '../../Controllers/admin';
import RolePermissions from './RolePermissions';
import Loading from '../../Components/Loading';

// @ts-ignore
const permissionsIDs = (data) => {
  if (!data?.length) return [];
  // @ts-ignore
  const IDs = data?.map((item) => item.permission_id);
  return IDs;
};

// @ts-ignore
const updatePermission = async (data) => {
  const res = await ADD(admin.token, 'assign_permission_to_tole', data);
  if (res.response !== 200) {
    throw new Error(res.message);
  }
  return res;
};

// @ts-ignore
export default function UpdateRoleModel({ isOpen, onClose, data }) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState();
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const [selectedPermissions, setSelectedPermissions] = useState();
  const toast = useToast();
  
  const getData = async () => {
    const res = await GET(admin.token, `get_role_permisssion/role/${data.id}`);
    return res.data;
  };
  const { data: permissions, isLoading: isPermissionsLoading } = useQuery({
    queryKey: ['permissions', data.id],
    queryFn: getData
  });

  useEffect(() => {
    // @ts-ignore
    setSelectedPermissions(permissionsIDs(permissions));
    // @ts-ignore
    reset({
      role_name: data?.name
    });
    // @ts-ignore
  }, [permissions, data.name, reset]);

  // @ts-ignore
  const updateRole = async (Inputdata) => {
    let formData = {
      ...Inputdata,
      id: data.id
    };

    try {
      // @ts-ignore
      setIsLoading(true);
      const res = await UPDATE(admin.token, 'update_role', formData);
      // @ts-ignore
      setIsLoading(false);
      if (res.response === 200) {
        ShowToast(toast, 'success', t('roles.update.messages.success.role'));
        // @ts-ignore
        queryClient.invalidateQueries('roles');
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

  const mutation = useMutation({
    mutationFn: async () => {
      let formData = {
        role_id: data.id,
        // @ts-ignore
        permission_ids: selectedPermissions?.join(',') || ''
      };

      await updatePermission(formData);
    },
    onError: (error) => {
      ShowToast(toast, 'error', error.message);
    },
    onSuccess: () => {
      ShowToast(toast, 'success', t('roles.update.messages.success.permissions'));
      // @ts-ignore
      queryClient.invalidateQueries('roles');
      // @ts-ignore
      queryClient.invalidateQueries(['permissions', data.id]);
      onClose();
    }
  });

  if (isPermissionsLoading) return <Loading />;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={'3xl'}
      scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          fontSize={18}
          py={2}>
          {t('roles.update.title')}
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <Box pb={3}>
            <Flex
              as={'form'}
              onSubmit={handleSubmit(updateRole)}
              align={'flex-end'}
              gap={5}>
              {' '}
              <FormControl isRequired>
                <FormLabel>{t('roles.update.form.title.label')}</FormLabel>
                <Input
                  size={'sm'}
                  borderRadius={6}
                  defaultValue={data?.name}
                  placeholder={t('roles.update.form.title.placeholder')}
                  {...register('role_name', { required: true })}
                />
              </FormControl>
              <Button
                w={48}
                variant="solid"
                size={'sm'}
                colorScheme="blue"
                type="submit"
                isLoading={isLoading}>
                {t('roles.update.buttons.updateTitle')}
              </Button>
            </Flex>

            <FormControl mt={5}>
              <FormLabel>{t('roles.update.form.permissions.label')}</FormLabel>

              <RolePermissions
                selectedPermissions={selectedPermissions}
                setSelectedPermissions={setSelectedPermissions}
                // @ts-ignore
                onClose={onClose}
                role_id={data.id}
              />
            </FormControl>
          </Box>
        </ModalBody>
        <Divider />
        <ModalFooter py={3}>
          <Button
            w={'50'}
            variant="solid"
            size={'sm'}
            colorScheme="blue"
            mr={5}
            isLoading={mutation.isPending}
            onClick={() => { mutation.mutate() }}>
            {t('roles.update.buttons.updatePermissions')}
          </Button>
          <Button colorScheme="gray" mr={3} onClick={onClose} size={'sm'}>
            {t('roles.update.buttons.close')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
