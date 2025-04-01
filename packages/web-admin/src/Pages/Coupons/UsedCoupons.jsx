/* eslint-disable react/prop-types */
import { Box, Button, Flex, IconButton, Input, Skeleton, theme, useDisclosure, useToast, Heading, Divider } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { GET } from '../../Controllers/ApiControllers';

import DynamicTable from '../../Components/DataTable';
import admin from '../../Controllers/admin';
import UpdateDepartmentModel from './Update';
import useSearchFilter from '../../Hooks/UseSearchFilter';
import useHasPermission from '../../Hooks/HasPermission';
import NotAuth from '../../Components/NotAuth';
import AddCoupon from './Add';
import DeleteUsedCoupons from './DeleteUsedCoupons';

export default function UsedCoupons() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [SelectedData, setSelectedData] = useState();
  const { hasPermission } = useHasPermission();
  const { t } = useTranslation();

  const { isOpen: DeleteisOpen, onOpen: DeleteonOpen, onClose: DeleteonClose } = useDisclosure();
  const { isOpen: EditisOpen, onOpen: EditionOpen, onClose: EditionClose } = useDisclosure();
  
  const toast = useToast();
  const id = 'Errortoast';
  const getData = async () => {
    const res = await GET(admin.token, 'get_coupon_use');
    // @ts-ignore
    const rearrangedArray = res?.data.map((item) => {
      const { id, coupon_id, user_id, appointment_id, updated_at, f_name, l_name } = item;
      return { id, coupon_id, user_id, user_name: `${f_name} ${l_name}`, appointment_id, updated_at };
    });
    return rearrangedArray;
  };

  // @ts-ignore
  const handleActionClick = (rowData) => {
    setSelectedData(rowData);
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ['used-coupons'],
    queryFn: getData
  });

  const { handleSearchChange, filteredData } = useSearchFilter(data);

  if (error) {
    if (!toast.isActive(id)) {
      toast({
        id,
        title: t('coupons.usedCoupons.error.title'),
        description: t('coupons.usedCoupons.error.description'),
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
            {t('coupons.usedCoupons.title')}
          </Heading>{' '}
          <Divider mb={2} />
          <Flex
            mb={5}
            justify={'space-between'}
            align={'center'}>
            <Input
              size={'md'}
              placeholder="Search"
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
                  {t('coupons.usedCoupons.actions.add')}
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
                EditonOpen={EditionOpen}
              />
            }
          />
        </Box>
      )}

      <AddCoupon
        isOpen={isOpen}
        onClose={onClose}
      />
      <DeleteUsedCoupons
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
const YourActionButton = ({ onClick, rowData, DeleteonOpen, EditonOpen }) => {
  const { hasPermission } = useHasPermission();
  return (
    <Flex justify={'center'}>
      {hasPermission('COUPON_UPDATE') && (
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
