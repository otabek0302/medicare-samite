/* eslint-disable react/prop-types */
import { Box, Button, Flex, FormControl, IconButton, Input, Skeleton, Switch, theme, useDisclosure, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GET, UPDATE } from '../../Controllers/ApiControllers';
import { useTranslation } from 'react-i18next';

import admin from '../../Controllers/admin';
import DynamicTable from '../../Components/DataTable';
import AddDepartmentModel from './Add';
import DeleteDepartment from './Delete';
import UpdateDepartmentModel from './Update';
import useSearchFilter from '../../Hooks/UseSearchFilter';
import useHasPermission from '../../Hooks/HasPermission';
import NotAuth from '../../Components/NotAuth';
import ShowToast from '../../Controllers/ShowToast';

export default function Department() {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [SelectedData, setSelectedData] = useState();
  const { hasPermission } = useHasPermission();

  const { isOpen: DeleteisOpen, onOpen: DeleteonOpen, onClose: DeleteonClose } = useDisclosure();
  const { isOpen: EditisOpen, onOpen: EditionOpen, onClose: EditionClose } = useDisclosure();
  const toast = useToast();
  const id = 'Errortoast';
  
  const getData = async () => {
    const res = await GET(admin.token, 'get_department');
    const rearrangedArray = res.data.map((item) => {
      return {
        ...item,
        active: (
          <IsActive
            id={item.id}
            isActive={item.active}
          />
        )
      };
    });
    return rearrangedArray;
  };
  
  // @ts-ignore
  const handleActionClick = (rowData) => {
    setSelectedData(rowData);
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ['department'],
    queryFn: getData
  });

  const { handleSearchChange, filteredData } = useSearchFilter(data);

  if (error) {
    if (!toast.isActive(id)) {
      toast({
        id,
        title: t('departments.index.errors.title'),
        description: t('departments.index.errors.description'),
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top'
      });
    }
  }

  if (!hasPermission('DEPARTMENT_VIEW')) {
    // @ts-ignore
    return <NotAuth message={t('departments.index.messages.noPermission')} />;
  }

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
          <Flex
            mb={5}
            justify={'space-between'}
            align={'center'}>
            <Input
              size={'md'}
              placeholder={t('departments.index.search')}
              w={400}
              maxW={'50vw'}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            {hasPermission('DEPARTMENT_ADD') && (
              <Box>
                <Button
                  size={'sm'}
                  colorScheme="blue"
                  onClick={onOpen}>
                  {t('departments.index.addNew')}
                </Button>
              </Box>
            )}
          </Flex>
          {/* @ts-ignore */}
          <DynamicTable
            minPad={'8px 8px'}
            data={filteredData}
            onActionClick={
              // @ts-ignore
              <YourActionButton
                onClick={handleActionClick}
                DeleteonOpen={DeleteonOpen}
                EditionOpen={EditionOpen}
              />
            }
          />
        </Box>
      )}

      <AddDepartmentModel
        isOpen={isOpen}
        onClose={onClose}
      />
      <DeleteDepartment
        isOpen={DeleteisOpen}
        onClose={DeleteonClose}
        data={SelectedData}
      />
      {EditisOpen && (
        <UpdateDepartmentModel
          isOpen={EditisOpen}
          onClose={EditionClose}
          data={SelectedData}
        />
      )}
    </Box>
  );
}

// @ts-ignore
const YourActionButton = ({ onClick, rowData, DeleteonOpen, EditionOpen }) => {
  const { hasPermission } = useHasPermission();
  const { t } = useTranslation();
  return (
    <Flex justify={'center'}>
      {hasPermission('DEPARTMENT_UPDATE') && (
        <IconButton
          aria-label={t('departments.index.actions.edit')}
          size={'sm'}
          variant={'ghost'}
          _hover={{
            background: 'none'
          }}
          onClick={() => {
            onClick(rowData);
            EditionOpen();
          }}
          icon={
            <FiEdit
              fontSize={18}
              color={theme.colors.blue[500]}
            />
          }
        />
      )}
      {hasPermission('DEPARTMENT_DELETE') && (
        <IconButton 
          aria-label={t('departments.index.actions.delete')} 
          size={'sm'} 
          variant={'ghost'} 
          _hover={{ background: 'none' }} 
          onClick={() => { 
            onClick(rowData); 
            DeleteonOpen(); 
          }} 
          icon={<FaTrash fontSize={18} color={theme.colors.red[500]} />} 
        />
      )}
    </Flex>
  );
};

// @ts-ignore
export const IsActive = ({ id, isActive }) => {
  const { t } = useTranslation();
  const { hasPermission } = useHasPermission();
  const toast = useToast();
  const queryClient = useQueryClient();

  // @ts-ignore
  const handleActive = async (id, active) => {
    let data = { id, active };
    try {
      const res = await UPDATE(admin.token, 'udpate_department', data);
      if (res.response === 200) {
        ShowToast(toast, 'success', t('departments.index.messages.updated'));
        // @ts-ignore
        queryClient.invalidateQueries(['department']);
        // @ts-ignore
        queryClient.invalidateQueries(['department', id]);
      } else {
        ShowToast(toast, 'error', res.message);
      }
    } catch (error) {
      ShowToast(toast, 'error', JSON.stringify(error));
    }
  };

  const mutation = useMutation({
    mutationFn: async (data) => {
      // @ts-ignore
      await handleActive(data.id, data.active);
    }
  });

  return (
    <FormControl
      display="flex"
      alignItems="center">
      <Switch
        isDisabled={!hasPermission('DEPARTMENT_UPDATE')}
        defaultChecked={isActive === 1}
        size={'sm'}
        onChange={(e) => {
          let active = e.target.checked ? 1 : 0;
          // @ts-ignore
          mutation.mutate({ id, active });
        }}
      />
    </FormControl>
  );
};
