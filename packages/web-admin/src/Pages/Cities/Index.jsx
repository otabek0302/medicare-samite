import PropTypes from 'prop-types';
import { Box, Button, Flex, IconButton, Input, Skeleton, theme, useDisclosure, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { GET } from '../../Controllers/ApiControllers';
import { useTranslation } from 'react-i18next';

import DynamicTable from '../../Components/DataTable';
import admin from '../../Controllers/admin';
import AddCityModel from './Add';
import UpdateCityModel from './Update';
import DeleteCity from './Delete';
import useSearchFilter from '../../Hooks/UseSearchFilter';

export default function Cities() {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [SelectedData, setSelectedData] = useState();
  
  const { isOpen: DeleteisOpen, onOpen: DeleteonOpen, onClose: DeleteonClose } = useDisclosure();
  const { isOpen: EditisOpen, onOpen: EditonOpen, onClose: EditonClose } = useDisclosure();
  
  const toast = useToast();
  const id = 'Errortoast';

  const getData = async () => {
    const res = await GET(admin.token, 'get_city');
    return res.data;
  };

  // @ts-ignore
  const handleActionClick = (rowData) => {
    setSelectedData(rowData);
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ['cities'],
    queryFn: getData
  });

  const { handleSearchChange, filteredData } = useSearchFilter(data);

  if (error) {
    if (!toast.isActive(id)) {
      toast({
        id,
        title: t('cities.messages.error'),
        description: t('cities.messages.error'),
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
              placeholder={t('common.search')}
              w={400}
              maxW={'50vw'}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            <Box>
              <Button
                size={'sm'}
                colorScheme="blue"
                onClick={onOpen}>
                {t('common.addNew')}
              </Button>
            </Box>
          </Flex>
          <DynamicTable
            data={filteredData}
            onActionClick={
              <YourActionButton
                onClick={handleActionClick}
                DeleteonOpen={DeleteonOpen}
                EditonOpen={EditonOpen}
                rowData={null}
              />
            }
            minPad={0}
            imgLast={false}
          />
        </Box>
      )}

      <AddCityModel
        isOpen={isOpen}
        onClose={onClose}
        data={null}
      />
      <DeleteCity
        isOpen={DeleteisOpen}
        onClose={DeleteonClose}
        data={SelectedData}
      />
      {EditisOpen && (
        <UpdateCityModel
          isOpen={EditisOpen}
          onClose={EditonClose}
          data={SelectedData}
        />
      )}
    </Box>
  );
}

const YourActionButton = ({ onClick, rowData, DeleteonOpen, EditonOpen }) => {
  return (
    <Flex justify={'center'}>
      <IconButton
        aria-label="Edit"
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
        aria-label="Delete"
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

YourActionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  rowData: PropTypes.any,
  DeleteonOpen: PropTypes.func.isRequired,
  EditonOpen: PropTypes.func.isRequired
};