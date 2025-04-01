/* eslint-disable react-hooks/rules-of-hooks */
import { AiOutlineDown } from 'react-icons/ai';
/* eslint-disable react/prop-types */
import { Box, Button, Card, CardBody, CloseButton, Divider, Flex, FormControl, FormLabel, Image, Input, InputGroup, InputLeftAddon, Select, Text, Tooltip, VStack, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ADD } from '../../Controllers/ApiControllers';
import { default as ShowToast, default as showToast } from '../../Controllers/ShowToast';

import admin from '../../Controllers/admin';
import ISDCODEMODAL from '../../Components/IsdModal';
import todayDate from '../../Controllers/today';
import useHasPermission from '../../Hooks/HasPermission';
import NotAuth from '../../Components/NotAuth';
import { useTranslation } from 'react-i18next';

export default function AddUser() {
  const { register, handleSubmit, reset } = useForm();
  
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const queryClient = useQueryClient();
  const toast = useToast();
  const [profilePicture, setprofilePicture] = useState(null);
  const [isd_code, setisd_code] = useState('+998');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const inputRef = useRef();

  const { t } = useTranslation();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setprofilePicture(selectedFile);
  };

  const AddNew = async (data) => {
    if (data.password != data.cnfPassword) {
      return showToast(toast, 'error', 'password does not match');
    }

    let formData = {
      image: profilePicture,
      isd_code: isd_code,
      ...data
    };
    try {
      setIsLoading(true);
      const res = await ADD(admin.token, 'add_user', formData);
      setIsLoading(false);
      if (res.response === 200) {
        ShowToast(toast, 'success', t('users.add.messages.success'));
        queryClient.invalidateQueries({ queryKey: ['users'] });
        reset();
        navigate('/users');
      } else {
        ShowToast(toast, 'error', t('users.add.messages.error'));
      }
    } catch (error) {
      setIsLoading(false);
      ShowToast(toast, 'error', t('users.add.messages.error'));
    }
  };

  const { hasPermission } = useHasPermission();
  if (!hasPermission('USER_UPDATE')) return <NotAuth />;

  return (
    <Box>
      <Flex
        justify={'space-between'}
        alignItems={'center'}>
        <Text
          fontSize={20}
          fontWeight={500}>
          {t('users.add.title')}
        </Text>
        <Button
          w={120}
          size={'sm'}
          variant={useColorModeValue('blackButton', 'gray')}
          onClick={() => {
            navigate(-1);
          }}>
          {t('users.add.back')}
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
              <FormControl>
                <FormLabel>{t('users.add.form.email.label')}</FormLabel>
                <Input
                  w={250}
                  type="email"
                  placeholder={t('users.add.form.email.placeholder')}
                  {...register('email')}
                />
              </FormControl>

              <FormControl>
                <FormLabel>{t('users.add.form.password.label')}</FormLabel>
                <Input
                  type="password"
                  placeholder={t('users.add.form.password.placeholder')}
                  {...register('password')}
                />
              </FormControl>
              <FormControl>
                <FormLabel>{t('users.add.form.confirmPassword.label')}</FormLabel>
                <Input
                  type="password"
                  placeholder={t('users.add.form.confirmPassword.placeholder')}
                  {...register('cnfPassword')}
                />
              </FormControl>
            </Flex>
            <Flex
              gap={10}
              mt={5}>
              <FormControl isRequired>
                <FormLabel>{t('users.add.form.firstName.label')}</FormLabel>
                <Input
                  placeholder={t('users.add.form.firstName.placeholder')}
                  {...register('f_name', { required: true })}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>{t('users.add.form.lastName.label')}</FormLabel>
                <Input
                  placeholder={t('users.add.form.lastName.placeholder')}
                  {...register('l_name', { required: true })}
                />
              </FormControl>
            </Flex>

            <Flex
              gap={10}
              mt={5}>
              <FormControl>
                <FormLabel>{t('users.add.form.phone.label')}</FormLabel>
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
                    placeholder={t('users.add.form.phone.placeholder')}
                    {...register('phone', {
                      pattern: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\\./0-9]*$/g
                    })}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>{t('users.add.form.dateOfBirth.label')}</FormLabel>
                <Input
                  max={todayDate()}
                  placeholder={t('users.add.form.dateOfBirth.placeholder')}
                  size="md"
                  type="date"
                  {...register('dob')}
                />
              </FormControl>
              <FormControl>
                <FormLabel>{t('users.add.form.gender.label')}</FormLabel>
                <Select
                  placeholder={t('users.add.form.gender.placeholder')}
                  {...register('gender')}>
                  <option value="Female">{t('users.add.form.gender.options.female')}</option>{' '}
                  <option value="Male">{t('users.add.form.gender.options.male')}</option>
                </Select>
              </FormControl>
            </Flex>

            <Button
              w={'100%'}
              mt={10}
              type="submit"
              colorScheme="green"
              size={'sm'}
              isLoading={isLoading}>
              {t('users.add.buttons.add')}
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
            <Text textAlign={'center'}>{t('users.add.form.profilePicture.label')}</Text>
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
                  label={t('users.add.form.profilePicture.clear')}
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
                {t('users.add.form.profilePicture.upload')}
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
