/* eslint-disable react/prop-types */
import { Box, Button, Flex, IconButton, Input, Skeleton, theme, useDisclosure, useToast } from '@chakra-ui/react';
import { FiEdit } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { GET } from '../../Controllers/ApiControllers';

import moment from 'moment';
import DynamicTable from '../../Components/DataTable';
import admin from '../../Controllers/admin';
import AddPatients from './AddPatients';
import useDebounce from '../../Hooks/UseDebounce';
import Pagination from '../../Components/Pagination';
import useHasPermission from '../../Hooks/HasPermission';
import NotAuth from '../../Components/NotAuth';
import useSearchFilter from '../../Hooks/UseSearchFilter';

const ITEMS_PER_PAGE = 50;

// @ts-ignore
const getPageIndices = (currentPage, itemsPerPage) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage - 1;
  return { startIndex, endIndex };
};

// @ts-ignore
const transformData = (data) => {
  // @ts-ignore
  return data?.map((item) => {
    const { id, f_name, l_name, phone, gender, dob, email, image, created_at } =
      item;
    return {
      id,

      name: `${f_name} ${l_name}`,
      phone,
      gender,
      date_Of_Birth: dob ? moment(dob).format('DD MMM YYYY') : 'N/A',
      email: email || 'N/A',
      image,
      created_At: moment(created_at).format('DD MMM YYYY hh:mm a')
    };
  });
};

const Patients = () => {
  const { t } = useTranslation();
  const { hasPermission } = useHasPermission();
  const [selectedData, setSelectedData] = useState(null);
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);
  const { startIndex, endIndex } = getPageIndices(page, ITEMS_PER_PAGE);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const boxRef = useRef(null);

  const { isLoading, data, error } = useQuery({
    queryKey: ['patients', page, debouncedSearchQuery],
    queryFn: async () => {
      const res = await GET(
        admin.token,
        `get_patient/page?start=${startIndex}&end=${endIndex}`
      );
      return { data: res.data, totalRecord: res.total_record };
    }
  });

  // @ts-ignore
  const handlePageChange = (newPage) => setPage(newPage);

  useEffect(() => {
    if (boxRef.current) {
      // @ts-ignore
      boxRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [page]);

  useEffect(() => {
    if (error && !toast.isActive('Errortoast')) {
      toast({
        id: 'Errortoast',
        title: t('patients.messages.error'),
        description: t('patients.messages.error'),
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top'
      });
    }
  }, [error, toast]);

  const transformedData = transformData(data?.data);
  const totalPage = Math.ceil(data?.totalRecord / ITEMS_PER_PAGE);
  // @ts-ignore
  const handleActionClick = (rowData) => setSelectedData(rowData);
  const { handleSearchChange, filteredData } = useSearchFilter(transformedData);

  if (!hasPermission('PATIENT_VIEW')) return <NotAuth />;

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
              placeholder={t('patients.placeholder.search')}
              w={400}
              maxW="50vw"
              onChange={(e) => handleSearchChange(e.target.value)}
            />

            <Button
              size="sm"
              colorScheme="blue"
              onClick={onOpen}
              isDisabled={!hasPermission('PATIENT_ADD')}>
              {t('patients.add.buttons.add')}
            </Button>
          </Flex>
          <DynamicTable
            imgLast={true}
            minPad="1px 20px"
            data={filteredData}
            onActionClick={
              <YourActionButton
                onClick={handleActionClick}
                navigate={navigate}
                rowData={selectedData}
              />
            }
          />
        </Box>
      )}
      <Flex
        justify="center"
        mt={4}>
        <Pagination
          currentPage={page}
          onPageChange={handlePageChange}
          totalPages={totalPage}
        />
      </Flex>
      <AddPatients
        isOpen={isOpen}
        onClose={onClose}
        nextFn={() => {
          setSelectedData(null);
          setPage(1);
        }}
      />
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

// @ts-ignore
const YourActionButton = ({ onClick, rowData, navigate }) => {
  const { hasPermission } = useHasPermission();
  const { t } = useTranslation();
  return (
    <Flex justify="center">
      <IconButton
        aria-label={t('patients.update.actions.edit')}
        isDisabled={!hasPermission('PATIENT_UPDATE')}
        size="sm"
        variant="ghost"
        _hover={{ background: 'none' }}
        onClick={() => {
          onClick(rowData);
          navigate(`/patient/${rowData.id}`);
        }}
        icon={
          <FiEdit
            fontSize={18}
            color={theme.colors.blue[500]}
          />
        }
      />
    </Flex>
  );
};

export default Patients;
