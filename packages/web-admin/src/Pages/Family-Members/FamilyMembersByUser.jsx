﻿/* eslint-disable react/prop-types */
import { Box, Button, Flex, IconButton, Input, Skeleton, theme, useDisclosure, useToast } from '@chakra-ui/react';
import { FiEdit } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GET } from '../../Controllers/ApiControllers';
import { FaTrash } from 'react-icons/fa';

import DynamicTable from '../../Components/DataTable';
import moment from 'moment';
import admin from '../../Controllers/admin';
import useDebounce from '../../Hooks/UseDebounce';
import useHasPermission from '../../Hooks/HasPermission';
import NotAuth from '../../Components/NotAuth';
import DeleteFamily from './Delete';
import EditFamily from './Edit';
import AddFamily from './Add';

const transformData = (data) => {
  return data?.map((item) => {
    const { id, user_id, f_name, l_name, phone, gender, dob, created_at } =
      item;
    return {
      id,
      user_id,
      'Member name': `${f_name} ${l_name}`,
      'Member Phone': phone,
      gender,
      DOB: dob ? moment(dob).format('DD MMM YYYY') : 'N/A',
      createdAt: moment(created_at).format('DD MMM YYYY hh:mm a')
    };
  });
};

const FamilyMembersByUser = ({ userID }) => {
  const { hasPermission } = useHasPermission();
  const [selectedData, setSelectedData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();
  
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: DeleteisOpen, onOpen: DeleteonOpen, onClose: DeleteonClose } = useDisclosure();
  const { isOpen: EditisOpen, onOpen: EditonOpen, onClose: EditonClose } = useDisclosure();
  
  const toast = useToast();
  const navigate = useNavigate();
  const { isLoading, data, error } = useQuery({
    queryKey: ['family-members', userID, debouncedSearchQuery],
    queryFn: async () => {
      const res = await GET(admin.token, `get_family_members/user/${userID}`);
      return { data: res.data };
    }
  });

  const { data: userDetails } = useQuery({
    queryKey: ['user', userID],
    queryFn: async () => {
      const res = await GET(admin.token, `get_user/${userID}`);
      return res.data;
    }
  });

  useEffect(() => {
    if (error && !toast.isActive('Errortoast')) {
      toast({
        id: 'Errortoast',
        title: t('familyMembers.byUser.messages.error'),
        description: t('familyMembers.byUser.messages.error'),
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top'
      });
    }
  }, [error, toast]);

  const transformedData = transformData(data?.data);

  const handleActionClick = (rowData) => setSelectedData(rowData);

  if (!hasPermission('FAMILY_VIEW')) return <NotAuth />;

  return (
    <Box>
      {isLoading || !data ? (
        <SkeletonList />
      ) : (
        <Box>
          <Flex
            mb={5}
            justify="space-between"
            align="center">
            <Input
              size="md"
              placeholder={t('familyMembers.byUser.search')}
              w={400}
              maxW="50vw"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />

            <Button
              size="sm"
              colorScheme="blue"
              onClick={onOpen}
              isDisabled={!hasPermission('FAMILY_ADD')}>
              {t('familyMembers.byUser.buttons.add')}
            </Button>
          </Flex>
          <DynamicTable
            minPad="1px 20px"
            data={transformedData}
            onActionClick={
              <YourActionButton
                onClick={handleActionClick}
                navigate={navigate}
                rowData={selectedData}
                DeleteonOpen={DeleteonOpen}
                EditonOpen={EditonOpen}
              />
            }
          />
        </Box>
      )}

      {isOpen && (
        <AddFamily
          isOpen={isOpen}
          onClose={onClose}
          user={userDetails}
        />
      )}

      {DeleteisOpen && (
        <DeleteFamily
          isOpen={DeleteisOpen}
          onClose={DeleteonClose}
          data={selectedData}
        />
      )}
      {EditisOpen && (
        <EditFamily
          isOpen={EditisOpen}
          onClose={EditonClose}
          data={selectedData}
        />
      )}
    </Box>
  );
};

const SkeletonList = () => (
  <Box>
    <Flex
      mb={5}
      justify="space-between">
      <Skeleton
        w={400}
        h={8}
      />
      <Skeleton
        w={200}
        h={8}
      />
    </Flex>
    {Array.from({ length: 10 }).map((_, index) => (
      <Skeleton
        key={index}
        h={10}
        w="100%"
        mt={2}
      />
    ))}
  </Box>
);

const YourActionButton = ({ onClick, rowData, DeleteonOpen, EditonOpen }) => {
  const { hasPermission } = useHasPermission();
  return (
    <Flex justify="center">
      <IconButton
        isDisabled={!hasPermission('FAMILY_UPDATE')}
        size="sm"
        variant="ghost"
        _hover={{ background: 'none' }}
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
        isDisabled={!hasPermission('FAMILY_DELETE')}
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

export default FamilyMembersByUser;
