﻿/* eslint-disable react/prop-types */
import { Box, Button, Divider, Flex, FormControl, Heading, IconButton, Input, Skeleton, Switch, theme, useDisclosure, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GET, UPDATE } from '../../Controllers/ApiControllers';
import { useTranslation } from 'react-i18next';

import DynamicTable from '../../Components/DataTable';
import admin from '../../Controllers/admin';
import UpdateDepartmentModel from './Update';
import useSearchFilter from '../../Hooks/UseSearchFilter';
import useHasPermission from '../../Hooks/HasPermission';
import NotAuth from '../../Components/NotAuth';
import ShowToast from '../../Controllers/ShowToast';
import DeleteCoupons from './Delete';
import AddCoupon from './Add';

export default function AllCoupons() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [SelectedData, setSelectedData] = useState();
  const { hasPermission } = useHasPermission();
  const { t } = useTranslation();

  const { isOpen: DeleteisOpen, onOpen: DeleteonOpen, onClose: DeleteonClose } = useDisclosure();
  const { isOpen: EditisOpen, onOpen: EditonOpen, onClose: EditonClose } = useDisclosure();
  const toast = useToast();
  const id = 'Errortoast';
  const getData = async () => {
    const res = await GET(admin.token, 'get_coupon');
    const rearrangedArray = res?.data.map((doctor) => {
      const { id, active, title, value, description, updated_at, start_date, end_date} = doctor;
      return { active: (<IsActive id={id} isActive={active} />), id, title, value, description, start_date, end_date, updated_at};
    });
    return rearrangedArray;
  };

  const handleActionClick = (rowData) => {
    setSelectedData(rowData);
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ['coupons'],
    queryFn: getData
  });

  const { handleSearchChange, filteredData } = useSearchFilter(data);

  if (error) {
    if (!toast.isActive(id)) {
      toast({
        id,
        title: t('coupons.index.messages.error.title'),
        description: t('coupons.index.messages.error.description'),
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top'
      });
    }
  }

  if (!hasPermission('COUPON_VIEW')) return <NotAuth />;

  return (
    <Box>
      {isLoading || !data ? (
        <Box>
          <Flex
            mb={5}
            justify={'space-between'}>
            <Skeleton
              w={400}
              h={8}
            />
            <Skeleton
              w={50}
              h={8}
            />
          </Flex>
          <Skeleton
            h={300}
            w={'100%'}
          />
        </Box>
      ) : (
        <Box>
          <Heading
            as={'h1'}
            size={'md'}
            mb={2}>
            {t('coupons.index.title')}
          </Heading>{' '}
          <Divider mb={2} />
          <Flex
            mb={5}
            justify={'space-between'}
            align={'center'}>
            <Input
              size={'md'}
              placeholder={t('coupons.index.search')}
              w={400}
              maxW={'50vw'}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            {hasPermission('COUPON_ADD') && (
              <Box>
                <Button
                  size={'sm'}
                  colorScheme="blue"
                  onClick={onOpen}>
                  {t('coupons.index.addNew')}
                </Button>
              </Box>
            )}
          </Flex>
          <DynamicTable
            minPad={'8px 8px'}
            data={filteredData}
            onActionClick={
              <YourActionButton
                onClick={handleActionClick}
                DeleteonOpen={DeleteonOpen}
                EditonOpen={EditonOpen}
                rowData={null}
              />
            }
            imgLast={false}
          />
        </Box>
      )}

      <AddCoupon
        isOpen={isOpen}
        onClose={onClose}
      />
      <DeleteCoupons
        isOpen={DeleteisOpen}
        onClose={DeleteonClose}
        data={SelectedData}
      />
      {EditisOpen && (
        <UpdateDepartmentModel
          isOpen={EditisOpen}
          onClose={EditonClose}
          data={SelectedData}
        />
      )}
    </Box>
  );
}

const YourActionButton = ({ onClick, rowData, DeleteonOpen, EditonOpen }) => {
  const { hasPermission } = useHasPermission();
  return (
    <Flex justify={'center'}>
      {hasPermission('COUPON_UPDATE') && (
        <IconButton
          size={'sm'}
          variant={'ghost'}
          _hover={{
            background: 'none'
          }}
          onClick={() => {
            onClick(rowData);
            EditonOpen();
          }}
          icon={
            <FiEdit
              fontSize={18}
              color={theme.colors.blue[500]}
            />
          }
        />
      )}
      {hasPermission('COUPON_DELETE') && (
        <IconButton
          size={'sm'}
          variant={'ghost'}
          _hover={{
            background: 'none'
          }}
          onClick={() => {
            onClick(rowData);
            DeleteonOpen();
          }}
          icon={
            <FaTrash
              fontSize={18}
              color={theme.colors.red[500]}
            />
          }
        />
      )}
    </Flex>
  );
};
const IsActive = ({ id, isActive }) => {
  const { hasPermission } = useHasPermission();
  const { t } = useTranslation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const handleActive = async (id, active) => {
    let data = { id, active };
    try {
      const res = await UPDATE(admin.token, 'update_coupon', data);
      if (res.response === 200) {
        ShowToast(toast, 'success', t('coupons.index.messages.success.statusUpdated'));
        queryClient.invalidateQueries({ queryKey: ['coupons'] });
        queryClient.invalidateQueries({ queryKey: ['coupons', 'dashboard'] });
        queryClient.invalidateQueries({ queryKey: ['coupons', id] });
      } else {
        ShowToast(toast, 'error', res.message);
      }
    } catch (error) {
      ShowToast(toast, 'error', JSON.stringify(error));
    }
  };

  const mutation = useMutation({
    mutationFn: async (data) => {
      await handleActive(data.id, data.active);
    }
  });

  return (
    <FormControl
      display="flex"
      alignItems="center">
      <Switch
        isDisabled={!hasPermission('COUPON_UPDATE')}
        defaultChecked={isActive === 1}
        size={'sm'}
        onChange={(e) => {
          let active = e.target.checked ? 1 : 0;

          mutation.mutate({ id, active });
        }}
      />
    </FormControl>
  );
};
