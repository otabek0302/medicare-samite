﻿/* eslint-disable react-hooks/rules-of-hooks */
import { BiPrinter } from 'react-icons/bi';
import { AiFillEye } from 'react-icons/ai';
import { Box, Flex, IconButton, Input, Table, Thead, Tbody, Tr, Th, Td, Text, Skeleton, Link, useColorModeValue, theme, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { SearchIcon } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { daysBack } from '../../Controllers/dateConfig';
import { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { GET } from '../../Controllers/ApiControllers';

import admin from '../../Controllers/admin';
import api from '../../Controllers/api';
import useHasPermission from '../../Hooks/HasPermission';
import NotAuth from '../../Components/NotAuth';
import DeletePrescription from './DeletePrescription';
import Pagination from '../../Components/Pagination';
import DateRangeCalender from '../../Components/DateRangeCalender';
import moment from 'moment';
import useDebounce from '../../Hooks/UseDebounce';

// Helper function to calculate pagination indices
// @ts-ignore
const getPageIndices = (currentPage, itemsPerPage) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage - 1;
  return { startIndex, endIndex };
};

const sevenDaysBack = moment().subtract(daysBack, 'days').format('YYYY-MM-DD');
const today = moment().format('YYYY-MM-DD');

function AllPrescription() {
  const { t } = useTranslation();
  const { hasPermission } = useHasPermission();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);
  const [dateRange, setDateRange] = useState({ startDate: sevenDaysBack, endDate: today });

  const { startIndex, endIndex } = getPageIndices(page, 50); // 10 items per page

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedData, setSelectedData] = useState();

  const getData = async () => {
    const { startDate, endDate } = dateRange;
    const res = await GET(
      admin.token,
      `get_prescription_page?start=${startIndex}&end=${endIndex}&search=${debouncedSearchQuery}&start_date=${startDate}&end_date=${endDate}`
    );
    console.log(
      `get_prescription_page?start=${startIndex}&end=${endIndex}&search=${debouncedSearchQuery}&start_date=${startDate}&end_date=${endDate}`
    );
    return {
      data: res.data,
      total_record: res.total_record
    };
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ['prescriptions', page, debouncedSearchQuery, dateRange],
    queryFn: getData
  });

  const totalPage = Math.ceil(data?.total_record / 50); // Adjusted based on items per page

  useEffect(() => {
    if (data) {
      setPage(1); // Reset to first page when data changes
    }
  }, [data]);

  if (error) {
    return <Text color="red.500">{t('prescriptions.index.messages.error')}</Text>;
  }

  // @ts-ignore
  const printPdf = (pdfUrl) => {
    const newWindow = window.open(pdfUrl, '_blank');
    if (newWindow) {
      newWindow.focus();
      newWindow.onload = () => {
        // @ts-ignore
        newWindow.load();
        newWindow.onafterprint = () => {
          newWindow.close();
        };
      };
    }
  };

  if (!hasPermission('PRESCRIPTION_VIEW')) return <NotAuth />;

  return (
    <Box>
      {isLoading ? (
        <Box>
          <Skeleton
            w={400}
            h={8}
          />
          <Skeleton
            h={300}
            w={'100%'}
          />
        </Box>
      ) : (
        <Box>
          <Flex
            mb={4}
            alignItems="center"
            justify={'space-between'}>
            <Flex
              align={'center'}
              gap={4}>
              {' '}
              <Input
                placeholder={t('prescriptions.index.search')}
                w={400}
                maxW={'50vw'}
                mr={2}
                // @ts-ignore
                icon={<SearchIcon />}
                onChange={(e) => setSearchQuery(e.target.value)}
                size={'md'}
              />
              {/* @ts-ignore */}
              <DateRangeCalender
                dateRange={dateRange}
                setDateRange={setDateRange}
                size={'md'}
              />
            </Flex>
          </Flex>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="scroll"
            maxW={'100%'}>
            <Table
              variant="simple"
              colorScheme="gray"
              fontSize={12}
              size={'sm'}
              fontWeight={500}>
              <Thead background={useColorModeValue('blue.50', 'blue.700')}>
                <Tr>
                  <Th padding={2}>{t('prescriptions.index.table.action')}</Th>
                  <Th padding={2}>{t('prescriptions.index.table.id')}</Th>
                  <Th padding={2}>{t('prescriptions.index.table.appointmentId')}</Th>
                  <Th padding={2}>{t('prescriptions.index.table.patient')}</Th>
                  <Th padding={2}>{t('prescriptions.index.table.date')}</Th>
                  <Th padding={2}>{t('prescriptions.index.table.pulseRate')}</Th>
                  <Th padding={2}>{t('prescriptions.index.table.temperature')}</Th>
                  <Th
                    padding={2}
                    textAlign={'center'}>
                    {t('prescriptions.index.table.action')}
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.data.length > 0 ? (
                  // @ts-ignore
                  data?.data.map((prescription) => (
                    <Tr key={prescription.id}>
                      <Td padding={2}>
                        <IconButton
                          aria-label="Delete"
                          size={'sm'}
                          variant={'ghost'}
                          _hover={{ background: 'none' }}
                          onClick={() => {
                            onOpen();
                            setSelectedData(prescription);
                          }}
                          icon={
                            <FaTrash
                              fontSize={18}
                              color={theme.colors.red[500]}
                            />
                          }
                        />
                      </Td>
                      <Td padding={2}>{prescription.id}</Td>
                      <Td padding={2}>{prescription.appointment_id}</Td>
                      <Td
                        padding={
                          2
                        }>{`${prescription.patient_f_name} ${prescription.patient_l_name}`}</Td>
                      <Td padding={2}>{prescription.date}</Td>
                      <Td padding={2}>{prescription.pulse_rate}</Td>
                      <Td padding={2}>{prescription.temperature}</Td>
                      <Td
                        padding={2}
                        maxW={10}>
                        <Flex
                          alignItems={'center'}
                          justifyContent={'center'}>
                          <IconButton
                            as={Link}
                            aria-label="Print"
                            icon={<BiPrinter fontSize={22} />}
                            colorScheme="whatsapp"
                            size={'sm'}
                            variant={'ghost'}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              printPdf(
                                `${api}/prescription/generatePDF/${prescription.id}`
                              );
                            }}
                          />
                          {hasPermission('PRESCRIPTION_UPDATE') && (
                            <IconButton
                              as={RouterLink}
                              aria-label="View"
                              icon={<AiFillEye fontSize={24} />}
                              colorScheme="blue"
                              size={'sm'}
                              variant={'ghost'}
                              to={`/prescription/${prescription?.id}?appointmentID=${prescription?.appointment_id}&patientID=${prescription?.patient_id}`}
                            />
                          )}
                        </Flex>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={8}>
                      <Text align="center">{t('prescriptions.index.messages.noData')}</Text>
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </Box>
        </Box>
      )}

      <Flex
        justify={'center'}
        mt={4}>
        <Pagination
          currentPage={page}
          onPageChange={setPage}
          totalPages={totalPage}
        />
      </Flex>

      {isOpen && (
        <DeletePrescription
          isOpen={isOpen}
          onClose={onClose}
          data={selectedData}
        />
      )}
    </Box>
  );
}

export default AllPrescription;
