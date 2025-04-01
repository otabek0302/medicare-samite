import { AiOutlineDown } from 'react-icons/ai';
/* eslint-disable react/prop-types */
import { Box, Button, Card, CardBody, CloseButton, Divider, Flex, FormControl, FormLabel, Image, Input, InputGroup, InputLeftAddon, Select, Text, Tooltip, VStack, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ComboboxDemo } from '../../Components/ComboBox';
import { MultiTagInput } from '../../Components/MultiTaginput';
import { ADD, GET } from '../../Controllers/ApiControllers';
import { default as ShowToast, default as showToast } from '../../Controllers/ShowToast';
import { useTranslation } from 'react-i18next';

import admin from '../../Controllers/admin';
import ISDCODEMODAL from '../../Components/IsdModal';
import todayDate from '../../Controllers/today';

export default function AddDoctor() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toast = useToast();
  const { t } = useTranslation();
  
  const [isLoading, setisLoading] = useState();
  const { register, handleSubmit, reset } = useForm();
  const [profilePicture, setprofilePicture] = useState(null);
  const [departmentID, setdepartmentID] = useState();
  const [specializationID, setspecializationID] = useState([]);
  const [isd_code, setisd_code] = useState('+91');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const inputRef = useRef();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setprofilePicture(selectedFile);
  };

  const AddNew = async (data) => {
    if (data.password != data.cnfPassword) {
      return showToast(toast, 'error', t('doctors.add.errors.passwordMismatch'));
    }

    if (!departmentID) {
      return showToast(toast, 'error', t('doctors.add.errors.selectDepartment'));
    }

    if (!specializationID) {
      return showToast(toast, 'error', t('doctors.add.errors.selectSpecialization'));
    }

    let formData = {
      image: profilePicture,
      department: departmentID,
      specialization: specializationID.join(', '),
      active: 0,
      ...data
    };

    try {
      setisLoading(true);
      const res = await ADD(admin.token, 'add_doctor', formData);
      setisLoading(false);
      if (res.response === 200) {
        ShowToast(toast, 'success', t('doctors.add.success'));
        queryClient.invalidateQueries('doctors');
        reset();
        navigate(`/doctor/update/${res.id}`);
      } else {
        console.log(res);
        ShowToast(toast, 'error', `${res.message} - ${res.response}`);
      }
    } catch (error) {
      console.log(error);
      setisLoading(false);
      ShowToast(toast, 'error', JSON.stringify(error));
    }
  };
  const getDepartmentList = async () => {
    const res = await GET(admin.token, 'get_department_active');
    return res.data;
  };

  const { data: departmentList } = useQuery({
    queryKey: ['department-active'],
    queryFn: getDepartmentList
  });

  const getSpclizeList = async () => {
    const res = await GET(admin.token, 'get_specialization');
    return res.data;
  };

  const { data: specializationList } = useQuery({
    queryKey: ['specialization'],
    queryFn: getSpclizeList
  });

  return (
    <Box>
      <Flex
        justify={'space-between'}
        alignItems={'center'}>
        <Text
          fontSize={20}
          fontWeight={500}>
          {t('doctors.add.title')}
        </Text>
        <Button
          w={120}
          size={'sm'}
          variant={useColorModeValue('blackButton', 'gray')}
          onClick={() => {
            navigate(-1);
          }}>
          {t('doctors.add.back')}
        </Button>
      </Flex>

      <Flex gap={10}>
        <Card
          mt={5}
          bg={useColorModeValue('white', 'gray.700')}
          w={'70%'}>
          <CardBody
            p={3}
            as={'form'}
            onSubmit={handleSubmit(AddNew)}>
            <Flex gap={10}>
              <FormControl isRequired>
                <FormLabel>{t('doctors.add.form.email')}</FormLabel>
                <Input
                  w={250}
                  type="email"
                  placeholder={t('doctors.add.form.email')}
                  {...register('email', { required: true })}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>{t('doctors.add.form.password')}</FormLabel>
                <Input
                  type="password"
                  placeholder={t('doctors.add.form.password')}
                  {...register('password', { required: true })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>{t('doctors.add.form.confirmPassword')}</FormLabel>
                <Input
                  type="password"
                  placeholder={t('doctors.add.form.confirmPassword')}
                  {...register('cnfPassword', { required: true })}
                />
              </FormControl>
            </Flex>
            <Flex
              gap={10}
              mt={5}>
              <FormControl isRequired>
                <FormLabel>{t('doctors.add.form.firstName')}</FormLabel>
                <Input
                  placeholder={t('doctors.add.form.firstName')}
                  {...register('f_name', { required: true })}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>{t('doctors.add.form.lastName')}</FormLabel>
                <Input
                  placeholder={t('doctors.add.form.lastName')}
                  {...register('l_name', { required: true })}
                />
              </FormControl>
            </Flex>

            <Flex
              gap={10}
              mt={5}>
              <FormControl isRequired>
                <FormLabel>{t('doctors.add.form.phone')}</FormLabel>
                <InputGroup>
                  <InputLeftAddon
                    cursor={'pointer'}
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpen();
                    }}>
                    {isd_code} <AiOutlineDown style={{ marginLeft: '10px' }} />
                  </InputLeftAddon>
                  <Input
                    type="tel"
                    placeholder={t('doctors.add.form.phone')}
                    {...register('phone', {
                      required: true,
                      pattern: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\\./0-9]*$/g
                    })}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>{t('doctors.add.form.dateOfBirth')}</FormLabel>
                <Input
                  max={todayDate()}
                  placeholder={t('doctors.add.form.dateOfBirth')}
                  size="md"
                  type="date"
                  {...register('dob', { required: true })}
                />
              </FormControl>
            </Flex>

            <Flex
              gap={10}
              mt={5}>
              <FormControl isRequired>
                <FormLabel>{t('doctors.add.form.gender.label')}</FormLabel>
                <Select
                  placeholder={t('doctors.add.form.gender.select')}
                  {...register('gender', { required: true })}>
                  <option value="Female">{t('doctors.add.form.gender.female')}</option>{' '}
                  <option value="Male">{t('doctors.add.form.gender.male')}</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>{t('doctors.add.form.experience')}</FormLabel>
                <Input
                  type="number"
                  placeholder={t('doctors.add.form.experience')}
                  {...register('ex_year', { required: true })}
                />
              </FormControl>
            </Flex>

            <Flex
              gap={10}
              mt={5}>
              <FormControl isRequired>
                <FormLabel>{t('doctors.add.form.department')}</FormLabel>
                <ComboboxDemo
                  name={'Department'}
                  data={departmentList}
                  setState={setdepartmentID}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>{t('doctors.add.form.specialization')}</FormLabel>
                <MultiTagInput
                  data={specializationList}
                  setState={setspecializationID}
                  name={'Specialization'}
                />
              </FormControl>
            </Flex>

            <Button
              w={'100%'}
              mt={10}
              type="submit"
              colorScheme="green"
              size={'sm'}
              isLoading={isLoading}>
              {t('doctors.add.form.submit')}
            </Button>
          </CardBody>
        </Card>
        <Card
          mt={5}
          bg={useColorModeValue('white', 'gray.700')}
          w={'25%'}
          h={'fit-content'}
          pb={10}>
          <CardBody p={2}>
            <Text textAlign={'center'}>{t('doctors.add.profilePicture.title')}</Text>
            <Divider></Divider>
            <Flex
              p={2}
              justify={'center'}
              mt={5}
              position={'relative'}>
              <Image
                borderRadius={'50%'}
                h={200}
                objectFit={'cover'}
                w={200}
                src={
                  profilePicture
                    ? URL.createObjectURL(profilePicture)
                    : '/admin/profilePicturePlaceholder.png'
                }
              />
              {profilePicture && (
                <Tooltip
                  label={t('doctors.add.profilePicture.clear')}
                  fontSize="md">
                  <CloseButton
                    colorScheme="red"
                    variant={'solid'}
                    position={'absolute'}
                    right={2}
                    onClick={() => {
                      setprofilePicture(null);
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
                type="file"
                display="none" // Hide the actual file input
                ref={inputRef}
                onChange={handleFileChange}
                accept=".jpeg, .svg, .png , .jpg"
              />
              <Button
                size={'sm'}
                onClick={() => {
                  inputRef.current.click();
                }}
                colorScheme="blue">
                {t('doctors.add.profilePicture.upload')}
              </Button>
            </VStack>
          </CardBody>
        </Card>
      </Flex>

      <ISDCODEMODAL
        isOpen={isOpen}
        onClose={onClose}
        setisd_code={setisd_code}
      />
    </Box>
  );
}
