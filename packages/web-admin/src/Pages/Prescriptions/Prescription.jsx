import { BiPrinter } from 'react-icons/bi';
import { AiFillEye } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
/* eslint-disable react/prop-types */
import { Box, Button, Flex, IconButton, Input, Table, Thead, Tbody, Tr, Th, Td, Text, Skeleton, Link, useDisclosure } from '@chakra-ui/react';
import { GET } from '../../Controllers/ApiControllers';
import { useQuery } from '@tanstack/react-query';
import { SearchIcon } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import useSearchFilter from '../../Hooks/UseSearchFilter';
import admin from '../../Controllers/admin';
import api from '../../Controllers/api';
import useHasPermission from '../../Hooks/HasPermission';
import DeletePrescription from './DeletePrescription';

// @ts-ignore
function PrescriptionByAppID({ appointmentID, appointmntData }) {
  const { t } = useTranslation();
  const { hasPermission } = useHasPermission();
  const [selectedData, setselectedData] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getData = async () => {
    const res = await GET(
      admin.token,
      `get_prescription/appointment/${appointmentID}`
    );

    return res.data;
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ['prescriptions', appointmentID],
    queryFn: getData
  });

  const { handleSearchChange, filteredData } = useSearchFilter(data);
  if (error) {
    return <Text color="red.500">{t('prescriptions.prescription.messages.error')}</Text>;
  }

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

  return (
    <Box>
      {isLoading ? (
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
        <Box p={5}>
          <Flex mb={4} alignItems="center" justify={'space-between'}>
            <Input
              placeholder={t('prescriptions.prescription.search')}
              width="300px"
              mr={2}
              icon={<SearchIcon />}
              onChange={(e) => handleSearchChange(e.target.value)}
              size={'sm'}
            />

            {hasPermission('PRESCRIPTION_ADD') && (
              <Button colorScheme="blue" size={'sm'} as={RouterLink} to={`/add-prescription/?appointmentID=${appointmentID}&patientID=${appointmntData?.patient_id}`}>
                {t('prescriptions.prescription.buttons.newPrescription')}
              </Button>
            )}
          </Flex>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="scroll"
            maxW={'100%'}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>{t('prescriptions.prescription.table.patient')}</Th>
                  <Th>{t('prescriptions.prescription.table.doctor')}</Th>
                  <Th>{t('prescriptions.prescription.table.date')}</Th>
                  <Th>{t('prescriptions.prescription.table.pulseRate')}</Th>
                  <Th>{t('prescriptions.prescription.table.temperature')}</Th>
                  <Th>{t('prescriptions.prescription.table.action')}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.length > 0 ? (
                  filteredData.map((prescription) => (
                    <Tr key={prescription.id}>
                      <Td>{`${prescription.patient_f_name} ${prescription.patient_l_name}`}</Td>
                      <Td>{`${appointmntData.doct_f_name} ${appointmntData.doct_l_name}`}</Td>
                      <Td>{prescription.date}</Td>
                      <Td>{prescription.pulse_rate}</Td>
                      <Td>{prescription.temperature}</Td>

                      <Td>
                        <Flex alignItems={'center'}>
                          {' '}
                          <IconButton
                            as={Link}
                            aria-label="Filter"
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
                              aria-label="Filter"
                              icon={<AiFillEye fontSize={24} />}
                              colorScheme="blue"
                              size={'sm'}
                              variant={'ghost'}
                              to={`/prescription/${prescription?.id}/?appointmentID=${prescription?.appointment_id}&patientID=${prescription?.patient_id}`}
                            />
                          )}
                          <IconButton
                            aria-label="Filter"
                            icon={<BiTrash fontSize={20} />}
                            colorScheme="red"
                            size={'sm'}
                            variant={'ghost'}
                            onClick={() => {
                              onOpen();
                              setselectedData(prescription);
                            }}
                          />{' '}
                        </Flex>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={7}>
                      <Text align="center">{t('prescriptions.prescription.messages.noData')}</Text>
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </Box>
        </Box>
      )}

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

export default PrescriptionByAppID;
