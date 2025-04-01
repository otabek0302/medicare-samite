import PropTypes from 'prop-types';
import { BiLinkExternal } from 'react-icons/bi';
/* eslint-disable react/prop-types */
import { Box, Button, Flex, IconButton, Input, Skeleton, theme, useDisclosure, useToast } from '@chakra-ui/react';
import { daysBack } from '../../Controllers/dateConfig';
import { useRef, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { GET } from '../../Controllers/ApiControllers';
import { Link, useNavigate } from 'react-router-dom';

import admin from '../../Controllers/admin';
import DynamicTable from '../../Components/DataTable';
import useHasPermission from '../../Hooks/HasPermission';
import NotAuth from '../../Components/NotAuth';
import AddCheckin from './Add';
import UpdateCheckin from './Update';
import DeleteCheckin from './Delete';
import moment from 'moment';
import useDebounce from '../../Hooks/UseDebounce';
import DateRangeCalender from '../../Components/DateRangeCalender';
import Pagination from '../../Components/Pagination';
import { useTranslation } from 'react-i18next';

const sevenDaysBack = moment().subtract(daysBack, 'days').format('YYYY-MM-DD');
const today = moment().format('YYYY-MM-DD');

// @ts-ignore
const getPageIndices = (currentPage, itemsPerPage) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage - 1;
  return { startIndex, endIndex };
};

getPageIndices.propTypes = {
  currentPage: PropTypes.number,
  itemsPerPage: PropTypes.number
};

export default function Checkin() {
  const { t } = useTranslation();
  const { hasPermission } = useHasPermission();
  const [page, setPage] = useState(1);
  const { startIndex, endIndex } = getPageIndices(page, 50);
  const [SelectedData, setSelectedData] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const boxRef = useRef(null);
  const [searchQuery, setsearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);
  const [dateRange, setdateRange] = useState({ startDate: sevenDaysBack, endDate: today });
  const start_date = moment(dateRange.startDate).format('YYYY-MM-DD');
  const end_date = moment(dateRange.endDate).format('YYYY-MM-DD');

  const { isOpen: EditisOpen, onOpen: EditionOpen, onClose: EditionClose } = useDisclosure();

  const {
    isOpen: DeleteisOpen,
    onOpen: DeleteonOpen,
    onClose: DeleteonClose
  } = useDisclosure();
  const navigate = useNavigate();

  const toast = useToast();
  const id = 'Errortoast';
  const getData = async () => {
    const url = admin.role.name === 'Doctor'
        ? `get_appointment_check_in_page?start=${startIndex}&end=${endIndex}&search=${debouncedSearchQuery}&start_date=${start_date}&end_date=${end_date}&doctor_id=${admin.id}`
        : `get_appointment_check_in_page?start=${startIndex}&end=${endIndex}&search=${debouncedSearchQuery}&start_date=${start_date}&end_date=${end_date}`;
    const res = await GET(admin.token, url);

    // @ts-ignore
    const rearrangedArray = res?.data.map((doctor) => {
      const { id, appointment_id, time, date, created_at, updated_at, doct_f_name, doct_l_name, patient_f_name, patient_l_name } = doctor;
      return {
        id,
        app_id: (
          <Link to={`/appointment/${appointment_id}`}>
            <Flex
              gap={1}
              align={'center'}>
              {appointment_id} <BiLinkExternal />
            </Flex>
          </Link>
        ),
        doctor: `${doct_f_name} ${doct_l_name}`,
        patient: `${patient_f_name} ${patient_l_name}`,
        Date: moment(date).format('DD MMM YYYY'),
        Time: moment(time, 'HH:mm:ss').format('hh:mm A'),
        created_at,
        updated_at
      };
    });
    return { data: rearrangedArray, total_record: res.total_record };
  };

  // @ts-ignore
  const handleActionClick = (rowData) => { setSelectedData(rowData) };

  const { isLoading, data, error } = useQuery({
    queryKey: ['checkins', page, debouncedSearchQuery, dateRange],
    queryFn: getData
  });

  // @ts-ignore
  const handlePageChange = (newPage) => { setPage(newPage); };
  const totalPage = Math.ceil(data?.total_record / 50);

  if (error) {
    if (!toast.isActive(id)) {
      toast({
        id,
        title: t('errors.oops'),
        description: t('errors.somethingWrong'),
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top'
      });
    }
  }

  if (!hasPermission('CHECKIN_VIEW')) return <NotAuth />;

  return (
    <Box ref={boxRef}>
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
              w={200}
              h={8}
            />
          </Flex>
          <Skeleton
            h={10}
            w={'100%'}
            mt={2}
          />
          <Skeleton
            h={10}
            w={'100%'}
            mt={2}
          />
          <Skeleton
            h={10}
            w={'100%'}
            mt={2}
          />
          <Skeleton
            h={10}
            w={'100%'}
            mt={2}
          />
          <Skeleton
            h={10}
            w={'100%'}
            mt={2}
          />
          <Skeleton
            h={10}
            w={'100%'}
            mt={2}
          />
          <Skeleton
            h={10}
            w={'100%'}
            mt={2}
          />
          <Skeleton
            h={10}
            w={'100%'}
            mt={2}
          />
          <Skeleton
            h={10}
            w={'100%'}
            mt={2}
          />
          <Skeleton
            h={10}
            w={'100%'}
            mt={2}
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
              onChange={(e) => setsearchQuery(e.target.value)}
              value={searchQuery}
            />
            <DateRangeCalender
              dateRange={dateRange}
              setDateRange={setdateRange}
              size={'md'}
              setLastDays={() => {}}
            />
            <Box>
              <Flex
                align={'center'}
                gap={5}>
                {' '}
                <Button
                  size={'sm'}
                  colorScheme="blue"
                  onClick={() => {
                    const baseUrl = `${window.location.protocol}//${window.location.host}`;
                    window.open(`${baseUrl}/admin/queue`, '_blank');
                  }}
                  // @ts-ignore
                  rightIcon={<BiLinkExternal />}>
                  {t('buttons.showDisplay')}
                </Button>
                <Button
                  isDisabled={!hasPermission('CHECKIN_ADD')}
                  size={'sm'}
                  colorScheme="blue"
                  onClick={() => onOpen()}>
                  {t('buttons.newCheckin')}
                </Button>
              </Flex>
            </Box>
          </Flex>
          <DynamicTable
            data={data.data}
            onActionClick={
              <YourActionButton
                onClick={handleActionClick}
                // @ts-ignore
                navigate={navigate}
                EditionOpen={EditionOpen}
                DeleteonOpen={DeleteonOpen}
              />
            }
            minPad={0}
            imgLast={false}
          />
        </Box>
      )}

      <Flex
        justify={'center'}
        mt={4}>
        <Pagination
          currentPage={page}
          onPageChange={handlePageChange}
          totalPages={totalPage}
        />
      </Flex>

      {isOpen && (
        <AddCheckin
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
      {EditisOpen && (
        <UpdateCheckin
          data={SelectedData}
          isOpen={EditisOpen}
          onClose={EditionClose}
        />
      )}

      {DeleteisOpen && (
        <DeleteCheckin
          isOpen={DeleteisOpen}
          onClose={DeleteonClose}
          data={SelectedData}
        />
      )}
    </Box>
  );
}

// @ts-ignore
const YourActionButton = ({ onClick, rowData, DeleteonOpen, EditionOpen }) => {
  const { hasPermission } = useHasPermission();
  return (
    <Flex justify={'center'}>
      <IconButton
        aria-label="Edit"
        isDisabled={!hasPermission('CHECKIN_UPDATE')}
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
      <IconButton
        aria-label="Delete"
        isDisabled={!hasPermission('CHECKIN_DELETE')}
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
  onClick: PropTypes.func,
  rowData: PropTypes.object,
  DeleteonOpen: PropTypes.func,
  EditionOpen: PropTypes.func
};

