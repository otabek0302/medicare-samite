/* eslint-disable react/prop-types */
import { Box, Button, Flex, IconButton, Input, Skeleton, theme, useDisclosure, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { GET } from '../../Controllers/ApiControllers';

import DynamicTable from '../../Components/DataTable';
import admin from '../../Controllers/admin';
import useSearchFilter from '../../Hooks/UseSearchFilter';
import AddMedicine from './AddMedicine';
import UpdateMedicine from './UpdateMedicine';
import useHasPermission from '../../Hooks/HasPermission';
import NotAuth from '../../Components/NotAuth';
import DeleteMedicine from './DeleteMedicine';

export default function Medicines() {
  const { t } = useTranslation();
  const { hasPermission } = useHasPermission();
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
    const res = await GET(admin.token, 'get_prescribe_medicines');
    return res.data;
  };

  // @ts-ignore
  const handleActionClick = (rowData) => {
    setSelectedData(rowData);
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ['medicines'],
    queryFn: getData
  });

  const { handleSearchChange, filteredData } = useSearchFilter(data);

  if (error) {
    if (!toast.isActive(id)) {
      toast({
        id,
        title: t('medicines.index.messages.error.title'),
        description: t('medicines.index.messages.error.description'),
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top'
      });
    }
  }

  if (!hasPermission('MEDICINE_VIEW')) return <NotAuth />;

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
              placeholder={t('medicines.index.search.placeholder')}
              w={400}
              maxW={'50vw'}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            <Box>
              <Button
                size={'sm'}
                colorScheme="blue"
                onClick={onOpen}
                isDisabled={!hasPermission('MEDICINE_ADD')}>
                {t('medicines.index.buttons.addNew')}
              </Button>
            </Box>
          </Flex>
          <DynamicTable
            data={filteredData}
            onActionClick={
              // @ts-ignore
              <YourActionButton
                onClick={handleActionClick}
                EditonOpen={EditonOpen}
                DeleteonOpen={DeleteonOpen}
              />
            }
            minPad="8px 8px"
            imgLast={false}
          />
        </Box>
      )}

      <AddMedicine
        isOpen={isOpen}
        onClose={onClose}
      />
      {EditisOpen && (
        <UpdateMedicine
          isOpen={EditisOpen}
          onClose={EditonClose}
          data={SelectedData}
        />
      )}
      {DeleteisOpen && (
        <DeleteMedicine
          isOpen={DeleteisOpen}
          onClose={DeleteonClose}
          data={SelectedData}
        />
      )}
    </Box>
  );
}

// @ts-ignore
const YourActionButton = ({ onClick, rowData, EditonOpen, DeleteonOpen }) => {
  const { hasPermission } = useHasPermission();
  return (
    <Flex justify={'center'}>
      <IconButton
        aria-label="Edit medicine"
        isDisabled={!hasPermission('MEDICINE_UPDATE')}
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
        aria-label="Delete medicine"
        isDisabled={!hasPermission('MEDICINE_DELETE')}
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
