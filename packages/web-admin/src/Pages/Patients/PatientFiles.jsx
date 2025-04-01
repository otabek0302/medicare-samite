/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { Box, Button, Divider, Flex, Heading, IconButton, Link, ListItem, OrderedList, Text, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GET } from '../../Controllers/ApiControllers';

import admin from '../../Controllers/admin';
import Loading from '../../Components/Loading';
import imageBaseURL from '../../Controllers/image';
import moment from 'moment';
import AddPatientFiles from './AddPatientFiles';
import UpdatePatientFiles from './UpdatePatientFiles';
import DeletePatientFiles from './DeletePatientFile';

// @ts-ignore
export default function PatientFiles({ id }) {
  const { t } = useTranslation();
  const [selectedData, setselectedData] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: EditisOpen, onOpen: EditionOpen, onClose: EditionClose } = useDisclosure();
  const { isOpen: DeleteisOpen, onOpen: DeleteonOpen, onClose: DeleteonClose } = useDisclosure();

  const getPatientFiles = async () => {
    const res = await GET(admin.token, `get_patient_file/patient/${id}`);
    return res.data;
  };

  const { data: patientFiles, isLoading: patientFilesLoading } = useQuery({
    queryKey: ['patient-files', id],
    queryFn: getPatientFiles
  });
  
  if (patientFilesLoading) return <Loading />;

  return (
    <Box>
      <Flex
        alignItems={'center'}
        justify={'space-between'}>
        {' '}
        <Heading as={'h3'} size={'sm'}>
          {t('patients.patientFiles.title')}
        </Heading>
        <Button size={'xs'} colorScheme={'blue'} onClick={onOpen}>
          {t('patients.patientFiles.actions.addNew')}
        </Button>
      </Flex>

      <Divider mt={2} mb={5} />
      <Box>
        <OrderedList spacing={3}>
          {/* @ts-ignore */}
          {patientFiles?.map((file, index) => (
            <ListItem key={index}>
              <Flex alignItems={'center'} gap={5}>
                <Link fontWeight={600} href={`${imageBaseURL}/${file.file}`} isExternal>
                  {file.file_name}
                </Link>
                <IconButton
                  aria-label={t('patients.patientFiles.actions.edit')}
                  size={'xs'}
                  icon={<FaEdit />}
                  colorScheme={'blue'}
                  onClick={() => {
                    setselectedData(file);
                    EditionOpen();
                  }}
                />{' '}
                <IconButton
                  aria-label={t('patients.patientFiles.actions.delete')}
                  size={'xs'}
                  icon={<FaTrash />}
                  colorScheme={'red'}
                  onClick={() => {
                    setselectedData(file);
                    DeleteonOpen();
                  }}
                />
              </Flex>
              <Text
                fontSize={'xs'}
                fontWeight={600}>
                {t('patients.patientFiles.updatedOn')} -{' '}
                {moment(file.updated_at).format('DD-MM-YY HH:mm A')}
              </Text>
            </ListItem>
          ))}
        </OrderedList>
      </Box>

      <AddPatientFiles
        isOpen={isOpen}
        onClose={onClose}
        id={id}
      />
      {EditisOpen ? (
        <UpdatePatientFiles
          isOpen={EditisOpen}
          onClose={EditionClose}
          data={selectedData}
        />
      ) : null}
      {DeleteisOpen ? (
        <DeletePatientFiles
          isOpen={DeleteisOpen}
          onClose={DeleteonClose}
          data={selectedData}
        />
      ) : null}
    </Box>
  );
}
