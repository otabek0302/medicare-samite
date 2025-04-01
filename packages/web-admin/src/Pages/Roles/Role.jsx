/* eslint-disable react/prop-types */
import { Box, Button, Flex, IconButton, Input, Skeleton, theme, useDisclosure, useToast } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { GET } from '../../Controllers/ApiControllers';

import DynamicTable from '../../Components/DataTable';
import admin from '../../Controllers/admin';
import UpdateRoleModel from './Update';
import AddRoleModel from './Add';
import DeleteRole from './Delete';
import useSearchFilter from '../../Hooks/UseSearchFilter';
import useHasPermission from '../../Hooks/HasPermission';
import NotAuth from '../../Components/NotAuth';
import AssignRole from './AssignRole';

export default function Roles() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [SelectedData, setSelectedData] = useState();
  
  const { isOpen: DeleteisOpen, onOpen: DeleteonOpen, onClose: DeleteonClose } = useDisclosure();
  const { isOpen: EditisOpen, onOpen: EditionOpen, onClose: EditionClose } = useDisclosure();
  const { isOpen: AssignisOpen, onOpen: AssignonOpen, onClose: AssignonClose } = useDisclosure();
  
  const toast = useToast();
  const id = 'Errortoast';
  const { t } = useTranslation();
  const getData = async () => {
    const res = await GET(admin.token, 'get_roles');
    return res.data;
  };

  // @ts-ignore
  const handleActionClick = (rowData) => {
    setSelectedData(rowData);
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ['roles'],
    queryFn: getData
  });
  const { handleSearchChange, filteredData } = useSearchFilter(data);

  if (error) {
    if (!toast.isActive(id)) {
      toast({
        id,
        title: t('roles.error.title'),
        description: t('roles.error.description'),
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top'
      });
    }
  }
  const { hasPermission } = useHasPermission();
  if (!hasPermission('ROLE_VIEW')) return <NotAuth />;

  return (
    <Box>
      {isLoading || !data ? (
        <Box>
          <Flex mb={5} justify={'space-between'}>
            <Skeleton w={400} h={8}/>
            <Skeleton w={50} h={8}/>  
          </Flex>
          <Skeleton h={300} w={'100%'} />
        </Box>
      ) : (
        <Box>
          <Flex mb={5} justify={'space-between'} align={'center'}>
            <Input size={'md'} placeholder={t('roles.search.placeholder')} w={400} maxW={'50vw'} onChange={(e) => handleSearchChange(e.target.value)} />
            {hasPermission('ROLE_ADD') && (
              <Flex align={'center'} gap={5}>
                <Button size={'sm'} colorScheme="teal" onClick={AssignonOpen}>
                  {t('roles.buttons.assignRoleToUser')}
                </Button>
                <Button size={'sm'} colorScheme="blue" onClick={onOpen}>
                  {t('roles.buttons.addNew')}
                </Button>
              </Flex>
            )}
          </Flex>
          {/* @ts-ignore */}
          <DynamicTable
            data={filteredData}
            onActionClick={
              // @ts-ignore
              <YourActionButton
                // @ts-ignore
                onClick={handleActionClick}
                // @ts-ignore
                DeleteonOpen={DeleteonOpen}
                // @ts-ignore
                EditionOpen={EditionOpen}
              />
            }
          />
        </Box>
      )}

      <AddRoleModel isOpen={isOpen} onClose={onClose} data={data} />
      <DeleteRole isOpen={DeleteisOpen} onClose={DeleteonClose} data={SelectedData} />
      {EditisOpen && (
        <UpdateRoleModel isOpen={EditisOpen} onClose={EditionClose} data={SelectedData} />
      )}
      {AssignisOpen && (
        <AssignRole isOpen={AssignisOpen} onClose={AssignonClose} Roles={data} />
      )}
    </Box>
  );
}

// @ts-ignore
const YourActionButton = ({ onClick, rowData, DeleteonOpen, EditionOpen }) => {
  const { hasPermission } = useHasPermission();
  return (
    <Flex justify={'center'}>
      {hasPermission('ROLE_UPDATE') && (
        <IconButton
          aria-label="Edit"
          isDisabled={rowData?.name === 'Admin' || rowData?.name === 'admin'}
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
      {hasPermission('ROLE_DELETE') && (
        <IconButton
          aria-label="Delete"
          isDisabled={rowData?.name === 'Admin' || rowData?.name === 'admin'}
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
