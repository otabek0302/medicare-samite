/* eslint-disable react-hooks/rules-of-hooks */
import { AiOutlineDown } from 'react-icons/ai';
/* eslint-disable react/prop-types */
import { Box, Button, Card, CardBody, Divider, Flex, FormControl, FormLabel, Heading, IconButton, Image, Input, InputGroup, InputLeftAddon, Select, Text, Tooltip, VStack, useColorModeValue, useDisclosure, useToast, Tabs, TabList, TabPanels, Tab, TabPanel, Badge } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { ADD, GET } from '../../Controllers/ApiControllers';
import { default as ShowToast, default as showToast } from '../../Controllers/ShowToast';
import { FaTrash } from 'react-icons/fa';
import { walletMinAmount } from '../../Controllers/Wallet';

import admin from '../../Controllers/admin';
import imageBaseURL from '../../Controllers/image';
import Loading from '../../Components/Loading';
import ISDCODEMODAL from '../../Components/IsdModal';
import VitalsData from './VitalsData';
import FamilyMembersByUser from '../Family-Members/FamilyMembersByUser';
import todayDate from '../../Controllers/today';
import Wallet from '../Wallet/Wallet';
import useHasPermission from '../../Hooks/HasPermission';
import NotAuth from '../../Components/NotAuth';
import { useTranslation } from 'react-i18next';

export default function UpdateUser() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { hasPermission } = useHasPermission();
  if (!hasPermission('USER_UPDATE')) return <NotAuth />;
  return (
    <Box>
      <Tabs>
        <TabList>
          <Tab>{t('users.update.tabs.overview')}</Tab>
          <Tab>{t('users.update.tabs.familyMembers')}</Tab>
          <Tab>{t('users.update.tabs.familyVitals')}</Tab>
          <Tab>{t('users.update.tabs.wallet')}</Tab>
        </TabList>

        <TabPanels>
          <TabPanel px={0}>
            <UserDetails />
          </TabPanel>
          <TabPanel px={0}>
            <FamilyMembersByUser userID={id} />
          </TabPanel>
          <TabPanel px={0}>
            <VitalsData />
          </TabPanel>
          <TabPanel px={0}>
            <Wallet userID={id} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

function UserDetails() {
  const { t } = useTranslation();
  const param = useParams();
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState();
  const { register, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const toast = useToast();
  const inputRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // get doctor details

  const { data: userDetails, isLoading: isUserLoading } = useQuery({
    queryKey: ['user', param.id],
    queryFn: async () => {
      const res = await GET(admin.token, `get_user/${param.id}`);
      setisd_code(res.data.isd_code);
      return res.data;
    }
  });

  const [isd_code, setisd_code] = useState(userDetails?.isd_code || undefined);

  const AddNew = async (data) => {
    if (data.password && data.password != data.cnfPassword) {
      return showToast(toast, 'error', 'password does not match');
    }
    let formData = {
      id: param.id,
      isd_code,
      ...data
    };

    try {
      setisLoading(true);
      const res = await ADD(admin.token, 'update_user', formData);
      setisLoading(false);
      if (res.response === 200) {
        ShowToast(toast, 'success', 'User Updated!');
        queryClient.invalidateQueries(['user', param.id]);
        queryClient.invalidateQueries('users');
      } else {
        ShowToast(toast, 'error', res.message);
      }
    } catch (error) {
      setisLoading(false);
      ShowToast(toast, 'error', JSON.stringify(error));
    }
  };

  const handleFileUpload = async (image) => {
    try {
      setisLoading(true);
      const res = await ADD(admin.token, 'update_user', {
        id: param.id,
        image: image
      });
      setisLoading(false);
      if (res.response === 200) {
        ShowToast(toast, 'success', 'User Updated!');
        queryClient.invalidateQueries(['user', param.id]);
        queryClient.invalidateQueries('users');
      } else {
        ShowToast(toast, 'error', res.message);
      }
    } catch (error) {
      setisLoading(false);
      ShowToast(toast, 'error', JSON.stringify(error));
    }
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    handleFileUpload(selectedFile);
  };

  const handleFileDelete = async () => {
    try {
      setisLoading(true);
      const res = await ADD(admin.token, 'remove_user_image', {
        id: param.id
      });
      setisLoading(false);
      if (res.response === 200) {
        ShowToast(toast, 'success', 'Image Deleted!');
        queryClient.invalidateQueries('doctor', param.id);
      } else {
        ShowToast(toast, 'error', res.message);
      }
    } catch (error) {
      setisLoading(false);
      ShowToast(toast, 'error', JSON.stringify(error));
    }
  };

  if (isUserLoading || isLoading) return <Loading />;

  return (
    <Box>
      <Flex
        justify={'space-between'}
        alignItems={'center'}>
        <Flex
          alignItems={'center'}
          gap={2}>
          {' '}
          <Heading
            as={'h1'}
            size={'lg'}>
            {admin.id === param.id ? t('users.update.title.admin') : t('users.update.title.user')}
          </Heading>{' '}
          <Badge
            p={2}
            fontSize="sm"
            textAlign="center"
            borderRadius={6}
            colorScheme={
              userDetails.wallet_amount < walletMinAmount ? 'red' : 'green'
            }
            my={2}>
            {t('users.update.wallet')} - {userDetails.wallet_amount}
          </Badge>
        </Flex>
        <Button
          w={120}
          size={'sm'}
          variant={useColorModeValue('blackButton', 'gray')}
          onClick={() => {
            navigate(-1);
          }}>
          {t('users.update.back')}
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
                <FormLabel>{t('users.update.form.firstName.label')}</FormLabel>
                <Input
                  placeholder={t('users.update.form.firstName.placeholder')}
                  {...register('f_name', { required: true })}
                  defaultValue={userDetails.f_name}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>{t('users.update.form.lastName.label')}</FormLabel>
                <Input
                  placeholder={t('users.update.form.lastName.placeholder')}
                  {...register('l_name', { required: true })}
                  defaultValue={userDetails.l_name}
                />
              </FormControl>
            </Flex>

            <Flex
              gap={10}
              mt={5}>
              <FormControl>
                <FormLabel>{t('users.update.form.email.label')}</FormLabel>
                <Input
                  type="email"
                  placeholder={t('users.update.form.email.placeholder')}
                  {...register('email')}
                  defaultValue={userDetails.email}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>{t('users.update.form.phone.label')}</FormLabel>
                <InputGroup>
                  <InputLeftAddon
                    cursor={'pointer'}
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpen();
                    }}>
                    {isd_code || userDetails?.isd_code}{' '}
                    <AiOutlineDown style={{ marginLeft: '10px' }} />
                  </InputLeftAddon>
                  <Input
                    type="tel"
                    placeholder={t('users.update.form.phone.placeholder')}
                    {...register('phone', {
                      required: true,
                      pattern: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\\./0-9]*$/g
                    })}
                    defaultValue={userDetails.phone}
                  />
                </InputGroup>
              </FormControl>
            </Flex>

            <Flex
              gap={10}
              mt={5}>
              <FormControl isRequired>
                <FormLabel>{t('users.update.form.dateOfBirth.label')}</FormLabel>
                <Input
                  max={todayDate()}
                  placeholder={t('users.update.form.dateOfBirth.placeholder')}
                  size="md"
                  type="date"
                  {...register('dob', { required: true })}
                  defaultValue={userDetails.dob}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>{t('users.update.form.gender.label')}</FormLabel>
                <Select
                  placeholder={t('users.update.form.gender.placeholder')}
                  {...register('gender', { required: true })}
                  defaultValue={userDetails.gender}>
                  <option value="Female">{t('users.update.form.gender.options.female')}</option>{' '}
                  <option value="Male">{t('users.update.form.gender.options.male')}</option>
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
              {t('users.update.buttons.update')}
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
            <Text textAlign={'center'}>{t('users.update.form.profilePicture.label')}</Text>
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
                  userDetails?.image
                    ? `${imageBaseURL}/${userDetails?.image}`
                    : '/admin/profilePicturePlaceholder.png'
                }
              />
              {userDetails?.image && (
                <Tooltip
                  label={t('users.update.form.profilePicture.clear')}
                  fontSize="md">
                  <IconButton
                    aria-label={t('users.update.form.profilePicture.clear')}
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
                type="file"
                display="none" // Hide the actual file input
                ref={inputRef}
                onChange={handleFileChange}
                accept=".jpeg, .svg, .png , .jpg"
              />
              <Button
                isDisabled={userDetails?.image !== null}
                size={'sm'}
                onClick={() => {
                  inputRef.current.click();
                }}
                colorScheme="blue">
                {t('users.update.form.profilePicture.change')}
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
