/* eslint-disable react/prop-types */
import { Box, Button, Flex, IconButton, Input, Skeleton, theme, useDisclosure, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import DynamicTable from '../../Components/DataTable';
import { GET } from '../../Controllers/ApiControllers';
import admin from '../../Controllers/admin';
import AddSpecialization from './Add';
import DeleteSpecialization from './Delete';
import UpdateSpecialization from './Update';
import useSearchFilter from '../../Hooks/UseSearchFilter';
import useHasPermission from '../../Hooks/HasPermission';
import NotAuth from '../../Components/NotAuth';

// @ts-ignore
export default function Specializatiion() {
  const { t } = useTranslation();
  const { hasPermission } = useHasPermission();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [SelectedData, setSelectedData] = useState();
  const { isOpen: DeleteisOpen, onOpen: DeleteonOpen, onClose: DeleteonClose } = useDisclosure();
  const { isOpen: EditisOpen, onOpen: EditionOpen, onClose: EditionClose } = useDisclosure();
  
  const toast = useToast();
  const id = 'ErrorToast';

  // @ts-ignore
  const getData = async () => {
    const res = await GET(admin.token, 'get_specialization');
    // @ts-ignore
    const sortedData = res.data.sort((a, b) => {
      const dateA = new Date(b.created_at);
      const dateB = new Date(a.created_at);
      // @ts-ignore
      return dateA - dateB;
    });
    return sortedData;
  };

  // @ts-ignore
  const handleActionClick = (rowData) => {
    setSelectedData(rowData);
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ['specialization'],
    queryFn: getData
  });

  const { handleSearchChange, filteredData } = useSearchFilter(data);

  if (error) {
    if (!toast.isActive(id)) {
      toast({
        id,
        title: t('specializations.index.errors.title'),
        description: t('specializations.index.errors.description'),
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top'
      });
    }
  }

  if (!hasPermission('SPECIALIZATION_VIEW')) {
    // @ts-ignore
    return <NotAuth message={t('specializations.index.messages.noPermission')} />;
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
            <Input
              size={'md'}
              placeholder={t('specializations.index.search')}
              w={400}
              maxW={'50vw'}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            <Box>
              {hasPermission('SPECIALIZATION_ADD') && (
                <Button size={'sm'} colorScheme="blue" onClick={onOpen}>
                  {t('specializations.index.addNew')}
                </Button>
              )}
            </Box>
          </Flex>
          {/* @ts-ignore */}
          <DynamicTable
            minPad={'8px'}
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

      <AddSpecialization isOpen={isOpen} onClose={onClose} />
      <DeleteSpecialization isOpen={DeleteisOpen} onClose={DeleteonClose} data={SelectedData} />
      {EditisOpen && (
        <UpdateSpecialization isOpen={EditisOpen} onClose={EditionClose} data={SelectedData} />
      )}
    </Box>
  );
}

// @ts-ignore
const YourActionButton = ({ onClick, rowData, DeleteonOpen, EditionOpen }) => {
  const { t } = useTranslation();
  const { hasPermission } = useHasPermission();
  return (
    <Flex justify={'center'}>
      {hasPermission('SPECIALIZATION_UPDATE') && (
        <IconButton
          aria-label={t('specializations.index.actions.edit')}
          size={'sm'}
          variant={'ghost'}
          _hover={{ background: 'none' }}
          onClick={() => {
            onClick(rowData);
            EditionOpen();
          }}
          icon={<FiEdit fontSize={18} color={theme.colors.blue[500]} />}
        />
      )}
      {hasPermission('SPECIALIZATION_UPDATE') && (
        <IconButton
          aria-label={t('specializations.index.actions.delete')}
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
