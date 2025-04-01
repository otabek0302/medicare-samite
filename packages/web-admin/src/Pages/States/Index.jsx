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
import useSearchFilter from '../../Hooks/UseSearchFilter';
import AddStateModel from './Add';
import UpdateStateModel from './Update';
import DeleteState from './Delete';

export default function States() {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [SelectedData, setSelectedData] = useState();
  const {
    isOpen: DeleteisOpen,
    onOpen: DeleteonOpen,
    onClose: DeleteonClose
  } = useDisclosure();
  const {
    isOpen: EditisOpen,
    onOpen: EditonOpen,
    onClose: EditonClose
  } = useDisclosure();
  const toast = useToast();
  const id = 'Errortoast';

  const getData = async () => {
    const res = await GET(admin.token, 'get_state');
    return res.data;
  };

  const handleActionClick = (rowData) => {
    setSelectedData(rowData);
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ['states'],
    queryFn: getData
  });

  const { handleSearchChange, filteredData } = useSearchFilter(data);

  if (error) {
    if (!toast.isActive(id)) {
      toast({
        id,
        title: t('states.index.messages.error'),
        description: t('states.index.messages.error'),
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top'
      });
    }
  }

  return (
    <Box>
      {isLoading || !data ? (
        <Box>
          <Flex mb={5} justify={'space-between'}>
            <Skeleton w={400} h={8} />
            <Skeleton w={50} h={8} />
          </Flex>
          <Skeleton h={300} w={'100%'} />
        </Box>
      ) : (
        <Box>
          <Flex mb={5} justify={'space-between'} align={'center'}>
            <Input size={'md'} placeholder={t('states.index.search')} w={400} maxW={'50vw'} onChange={(e) => handleSearchChange(e.target.value)} />
            <Box>
              <Button size={'sm'} colorScheme="blue" onClick={onOpen}>
                {t('states.index.buttons.add')}
              </Button>
            </Box>
          </Flex>
          {/* @ts-ignore */}
          <DynamicTable
            // @ts-ignore
            data={filteredData}
            onActionClick={
              // @ts-ignore
              <YourActionButton
                onClick={handleActionClick}
                DeleteonOpen={DeleteonOpen}
                EditonOpen={EditonOpen}
              />
            }
          />
        </Box>
      )}

      <AddStateModel
        isOpen={isOpen}
        onClose={onClose}
        data={SelectedData}
      />
      <DeleteState
        isOpen={DeleteisOpen}
        onClose={DeleteonClose}
        data={SelectedData}
      />
      {EditisOpen && (
        <UpdateStateModel
          isOpen={EditisOpen}
          onClose={EditonClose}
          data={SelectedData}
        />
      )}
    </Box>
  );
}
// @ts-ignore
const YourActionButton = ({ onClick, rowData, DeleteonOpen, EditonOpen }) => {
  const { t } = useTranslation();
  return (
    <Flex justify={'center'}>
      <IconButton
        aria-label={t('states.index.buttons.edit')}
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
      <IconButton
        aria-label={t('states.index.buttons.delete')}
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
    </Flex>
  );
};
