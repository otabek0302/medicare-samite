/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { Box, Button, Card, CardBody, Divider, Flex, FormControl, FormLabel, Heading, IconButton, Image, Input, InputGroup, InputLeftAddon, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Textarea, Tooltip, useColorModeValue, useDisclosure, useToast, VStack } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaTrash } from 'react-icons/fa';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { ADD, GET } from '../../Controllers/ApiControllers';

import admin from '../../Controllers/admin';
import ISDCODEMODAL from '../../Components/IsdModal';
import Loading from '../../Components/Loading';
import showToast from '../../Controllers/ShowToast';
import imageBaseURL from '../../Controllers/image';
import ShowToast from '../../Controllers/ShowToast';
import PatientFiles from './PatientFiles';
import todayDate from '../../Controllers/today';
import AppointmentsByPatientID from '../Appointments/AppointmentsByPatientID';
import PrescriptionByPatientID from '../Prescriptions/PrescriptionByPatientID';
import useHasPermission from '../../Hooks/HasPermission';
import NotAuth from '../../Components/NotAuth';

export default function UpdatePatient() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setsLoading] = useState();
  const { register, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const toast = useToast();
  const [isd_code, setisd_code] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputRef = useRef();
  const { hasPermission } = useHasPermission();

  const getPatient = async () => {
    const res = await GET(admin.token, `get_patients/${id}`);
    setisd_code(res.data.isd_code);
    return res.data;
  };

  const { data: patientDetails, isLoading: patientLoading } = useQuery({
    queryKey: ['patient', id],
    queryFn: getPatient
  });
  // @ts-ignore
  const AddNew = async (data) => {
    let formData = {
      id: id,
      isd_code,
      ...data
    };

    try {
      // @ts-ignore
      setsLoading(true);
      const res = await ADD(admin.token, 'update_patient', formData);
      // @ts-ignore
      setsLoading(false);
      if (res.response === 200) {
        showToast(toast, 'success', t('patients.messages.success'));
        // @ts-ignore
        queryClient.invalidateQueries(['patient', id]);
        // @ts-ignore
        queryClient.invalidateQueries(['patients']);
      } else {
        showToast(toast, 'error', t('patients.messages.error'));
      }
    } catch (error) {
      // @ts-ignore
      setsLoading(false);
      showToast(toast, 'error', JSON.stringify(error));
    }
  };

  // @ts-ignore
  const handleFileUpload = async (image) => {
    try {
      // @ts-ignore
      setsLoading(true);
      const res = await ADD(admin.token, 'update_patient', {
        id: id,
        image: image
      });
      // @ts-ignore
      setsLoading(false);
      if (res.response === 200) {
        showToast(toast, 'success', t('patients.messages.success'));
        // @ts-ignore
        queryClient.invalidateQueries(['patient', id]);
        // @ts-ignore
        queryClient.invalidateQueries(['patients']);
      } else {
        showToast(toast, 'error', t('patients.messages.error'));
      }
    } catch (error) {
      // @ts-ignore
      setsLoading(false);
      showToast(toast, 'error', JSON.stringify(error));
    }
  };

  //   handle file upload
  // @ts-ignore
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    handleFileUpload(selectedFile);
  };

  const handleFileDelete = async () => {
    try {
      // @ts-ignore
      setsLoading(true);
      const res = await ADD(admin.token, 'remove_patient_image', {
        id: id
      });
      // @ts-ignore
      setsLoading(false);
      if (res.response === 200) {
        ShowToast(toast, 'success', 'Image Deleted!');
        // @ts-ignore
        queryClient.invalidateQueries('patient', id);
      } else {
        ShowToast(toast, 'error', res.message);
      }
    } catch (error) {
      // @ts-ignore
      setsLoading(false);
      ShowToast(toast, 'error', JSON.stringify(error));
    }
  };

  if (patientLoading || isLoading) return <Loading />;
  if (!hasPermission('PATIENT_UPDATE')) return <NotAuth />;

  return (
    <Box>
      <Flex
        justify={'space-between'}
        alignItems={'center'}>
        <Heading
          as={'h1'}
          size={'lg'}>
          {t('patients.update.title')}
        </Heading>
        <Button
          w={120}
          size={'sm'}
          variant={useColorModeValue('blackButton', 'gray')}
          onClick={() => {
            navigate(-1);
          }}>
          {t('patients.update.actions.back')}
        </Button>
      </Flex>
      <Divider
        mb={2}
        mt={3}
      />
      <Tabs>
        <TabList>
          <Tab>{t('patients.update.details')}</Tab>
          <Tab>{t('patients.update.files')}</Tab>
          <Tab>{t('patients.update.appointments')}</Tab>
          <Tab>{t('patients.update.prescriptions')}</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Flex
              gap={10}
              mt={2}
              as={'form'}
              onSubmit={handleSubmit(AddNew)}>
              <Box w={'60%'}>
                {' '}
                <Card
                  mt={5}
                  bg={useColorModeValue('white', 'gray.700')}>
                  <CardBody
                    p={3}
                    as={'form'}>
                    <Flex
                      align={'center'}
                      justify={'space-between'}>
                      {' '}
                      <Heading
                        as={'h3'}
                        size={'sm'}>
                        {t('patients.update.basicDetails')}
                      </Heading>{' '}
                    </Flex>

                    <Divider
                      mt={2}
                      mb={5}
                    />

                    <Flex
                      gap={10}
                      mt={5}
                      align={'flex-end'}>
                      <FormControl isRequired>
                        <FormLabel>{t('patients.update.form.firstName.label')}</FormLabel>
                        <Input
                          size={'sm'}
                          borderRadius={6}
                          placeholder={t('patients.update.form.firstName.placeholder')}
                          {...register('f_name', { required: true })}
                          defaultValue={patientDetails?.f_name}
                        />
                      </FormControl>

                      <FormControl isRequired>
                        <FormLabel>{t('patients.update.form.lastName.label')}</FormLabel>
                        <Input
                          size={'sm'}
                          borderRadius={6}
                          placeholder={t('patients.update.form.lastName.placeholder')}
                          {...register('l_name', { required: true })}
                          defaultValue={patientDetails?.l_name}
                        />
                      </FormControl>
                    </Flex>

                    <Flex
                      gap={10}
                      mt={5}>
                      <FormControl isRequired>
                        <FormLabel>{t('patients.update.form.dateOfBirth.label')}</FormLabel>
                        <Input
                          max={todayDate()}
                          size={'sm'}
                          borderRadius={6}
                          placeholder={t('patients.update.form.dateOfBirth.placeholder')}
                          type="date"
                          {...register('dob', { required: true })}
                          defaultValue={patientDetails?.dob}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>{t('patients.update.form.gender.label')}</FormLabel>
                        <Select
                          size={'sm'}
                          borderRadius={6}
                          placeholder={t('patients.update.form.gender.placeholder')}
                          {...register('gender')}
                          defaultValue={patientDetails?.gender}>
                          <option value="Female">{t('patients.update.form.gender.options.female')}</option>{' '}
                          <option value="Male">{t('patients.update.form.gender.options.male')}</option>
                        </Select>
                      </FormControl>
                    </Flex>
                    <Flex
                      gap={10}
                      mt={5}>
                      <FormControl>
                        <FormLabel>{t('patients.update.form.notes.label')}</FormLabel>
                        <Textarea
                          placeholder={t('patients.update.form.notes.placeholder')}
                          size="sm"
                          resize={'vertical'}
                          {...register('notes')}
                          defaultValue={patientDetails?.notes}
                        />
                      </FormControl>
                    </Flex>
                  </CardBody>
                </Card>
                <Card
                  mt={5}
                  bg={useColorModeValue('white', 'gray.700')}>
                  <CardBody
                    p={3}
                    as={'form'}>
                    <Flex
                      align={'center'}
                      justify={'space-between'}>
                      {' '}
                      <Heading
                        as={'h3'}
                        size={'sm'}>
                        {t('patients.update.contactDetails')}
                      </Heading>{' '}
                    </Flex>

                    <Divider
                      mt={2}
                      mb={5}
                    />

                    <Flex
                      gap={10}
                      mt={5}>
                      <FormControl>
                        <FormLabel>{t('patients.update.form.email.label')}</FormLabel>
                        <Input
                          size={'sm'}
                          borderRadius={6}
                          type="email"
                          placeholder={t('patients.update.form.email.placeholder')}
                          {...register('email')}
                          defaultValue={patientDetails?.email}
                        />
                      </FormControl>
                      <FormControl
                        mt={0}
                        isRequired>
                        <FormLabel>{t('patients.update.form.phone.label')}</FormLabel>
                        <InputGroup size={'sm'}>
                          <InputLeftAddon
                            cursor={'pointer'}
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpen();
                            }}>
                            {isd_code}
                          </InputLeftAddon>
                          <Input
                            borderRadius={6}
                            placeholder={t('patients.update.form.phone.placeholder')}
                            type="Tel"
                            fontSize={16}
                            {...register('phone', { required: true })}
                            defaultValue={patientDetails?.phone}
                          />
                        </InputGroup>
                      </FormControl>
                    </Flex>
                  </CardBody>
                </Card>
                <Card
                  mt={5}
                  bg={useColorModeValue('white', 'gray.700')}>
                  <CardBody
                    p={3}
                    as={'form'}>
                    <Flex
                      align={'center'}
                      justify={'space-between'}>
                      {' '}
                      <Heading
                        as={'h3'}
                        size={'sm'}>
                        {t('patients.update.form.address.label')}
                      </Heading>{' '}
                    </Flex>

                    <Divider
                      mt={2}
                      mb={5}
                    />
                    <Flex gap={10}>
                      <FormControl>
                        <FormLabel>{t('patients.update.form.state.label')}</FormLabel>
                        <Input
                          size={'sm'}
                          borderRadius={6}
                          type="email"
                          placeholder={t('patients.update.form.state.placeholder')}
                          {...register('state')}
                          defaultValue={patientDetails?.state}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>{t('patients.update.form.city.label')}</FormLabel>
                        <Input
                          size={'sm'}
                          borderRadius={6}
                          type="text"
                          placeholder={t('patients.update.form.city.placeholder')}
                          {...register('city')}
                          defaultValue={patientDetails.city}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>{t('patients.update.form.postalCode.label')}</FormLabel>
                        <Input
                          size={'sm'}
                          borderRadius={6}
                          type="number"
                          placeholder={t('patients.update.form.postalCode.placeholder')}
                          {...register('postal_code')}
                          defaultValue={patientDetails.postal_code}
                        />
                      </FormControl>
                    </Flex>

                    <Flex
                      gap={10}
                      mt={5}>
                      <FormControl>
                        <FormLabel>{t('patients.update.form.address.label')}</FormLabel>
                        <Textarea
                          placeholder={t('patients.update.form.address.placeholder')}
                          size="sm"
                          resize={'vertical'}
                          {...register('address')}
                          defaultValue={patientDetails?.address}
                        />
                      </FormControl>
                    </Flex>
                  </CardBody>
                </Card>
                <Button
                  w={'100%'}
                  mt={10}
                  type="submit"
                  colorScheme="green"
                  size={'sm'}
                  isLoading={isLoading}>
                  {t('patients.update.actions.update')}
                </Button>
              </Box>

              <Box w={'35%'}>
                <Card
                  mt={5}
                  bg={useColorModeValue('white', 'gray.700')}
                  h={'fit-content'}
                  pb={5}>
                  <CardBody p={2}>
                    <Heading
                      as={'h3'}
                      size={'sm'}
                      textAlign="center">
                      {t('patients.update.form.profilePicture.label')}
                    </Heading>
                    <Divider mt={2} />
                    <Flex
                      p={2}
                      justify={'center'}
                      mt={5}
                      position={'relative'}>
                      <Image
                        borderRadius={'50%'}
                        h={150}
                        objectFit={'cover'}
                        w={150}
                        src={
                          patientDetails?.image
                            ? `${imageBaseURL}/${patientDetails?.image}` // Use profilePicture
                            : '/admin/profilePicturePlaceholder.png' // Fallback placeholder image
                        }
                      />
                      {patientDetails?.image && (
                        <Tooltip
                          label="Delete"
                          fontSize="md">
                          <IconButton
                            aria-label={t('patients.update.form.delete.label')}
                            size={'sm'}
                            colorScheme="red"
                            variant={'solid'}
                            position={'absolute'}
                            right={5}
                            icon={<FaTrash />}
                            onClick={() => {
                              handleFileDelete();
                            }}
                          />
                        </Tooltip>
                      )}
                    </Flex>
                    <VStack
                      spacing={4}
                      align="stretch"
                      mt={10}>
                      <Input
                        size={'sm'}
                        borderRadius={6}
                        type="file"
                        display="none" // Hide the actual file input
                        aria-label={t('patients.update.form.uploadProfilePicture.label')}
                        // @ts-ignore
                        ref={inputRef}
                        onChange={handleFileChange}
                        accept=".jpeg, .svg, .png , .jpg"
                      />
                      <Button
                        size={'sm'}
                        onClick={() => {
                          // @ts-ignore
                          inputRef.current.click();
                        }}
                        colorScheme="blue">
                        {t('patients.update.form.uploadProfilePicture.label')}
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>

                <Card
                  mt={5}
                  bg={useColorModeValue('white', 'gray.700')}
                  h={'fit-content'}
                  pb={5}>
                  <CardBody p={2}>
                    <PatientFiles id={id} />
                  </CardBody>
                </Card>
              </Box>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Box maxW={500}>
              <PatientFiles id={id} />
            </Box>
          </TabPanel>
          <TabPanel>
            <AppointmentsByPatientID patientID={id} />
          </TabPanel>
          <TabPanel>
            <PrescriptionByPatientID
              patientID={id}
              queryActive={true}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <ISDCODEMODAL
        isOpen={isOpen}
        onClose={onClose}
        setisd_code={setisd_code}
      />
    </Box>
  );
}
