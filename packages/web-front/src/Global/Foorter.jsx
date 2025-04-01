﻿/* eslint-disable react/prop-types */
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  useColorModeValue,
  Flex,
  Image,
  Link
} from '@chakra-ui/react';
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaReddit,
  FaSnapchat,
  FaTwitch,
  FaTwitter,
  FaYoutube,
  FaWhatsapp,
  FaDiscord,
  FaMedium
} from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { GET } from '../Controllers/ApiControllers';
import useSettingsData from '../Hooks/SettingData';
import imageBaseURL from '../Controllers/image';

const Logo = (props) => {
  const { settingsData } = useSettingsData();
  const logo = settingsData?.find((value) => value.id_name === 'logo');
  return (
    <Image
      w={12}
      src={`${imageBaseURL}/${logo?.value}`}
      alt="Logo"
      {...props}
    />
  );
};

const SocialButton = ({ children, label, href }) => {
  return (
    <Link
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200')
      }}
      isExternal>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Link>
  );
};

const getSocialMediaIcon = (platform) => {
  switch (platform) {
    case 'facebook':
      return <FaFacebook />;
    case 'twitter':
      return <FaTwitter />;
    case 'instagram':
      return <FaInstagram />;
    case 'linkedin':
      return <FaLinkedin />;
    case 'github':
      return <FaGithub />;
    case 'youtube':
      return <FaYoutube />;
    case 'snapchat':
      return <FaSnapchat />;
    case 'twitch':
      return <FaTwitch />;
    case 'pinterest':
      return <FaPinterest />;
    case 'reddit':
      return <FaReddit />;

    case 'whatsapp':
      return <FaWhatsapp />;
    case 'discord':
      return <FaDiscord />;
    case 'medium':
      return <FaMedium />;
    default:
      return null; // Return null for unknown platforms
  }
};

const ListHeader = ({ children }) => {
  return (
    <Text
      fontWeight={'500'}
      fontSize={'lg'}
      mb={2}>
      {children}
    </Text>
  );
};

const getData = async () => {
  const res = await GET('get_social_media');
  return res.data;
};

export default function Footer() {
  const { data: socialMedia } = useQuery({
    queryKey: ['social-media'],
    queryFn: getData
  });
  const { settingsData } = useSettingsData();
  const play_store_link = settingsData?.find(
    (value) => value.id_name === 'play_store_link'
  );
  const app_store_link = settingsData?.find(
    (value) => value.id_name === 'app_store_link'
  );
  const title = settingsData?.find((value) => value.id_name === 'clinic_name');
  return (
    <Box>
      {' '}
      <Box
        mt={-10}
        bg={'primary.main'}
        color={'#fff'}
        borderTopRadius={{ base: '30px', md: '100px' }}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={10}>
          <SimpleGrid
            templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }}
            spacing={8}
            mt={10}>
            <Stack spacing={6}>
              <Flex
                align={'center'}
                gap={2}>
                <Logo color={useColorModeValue('gray.700', 'white')} />
                <Text
                  fontFamily={'Quicksand, sans-serif'}
                  fontWeight={800}
                  fontSize={20}>
                  {title.value}
                </Text>
              </Flex>
              <Text fontSize={'sm'}>
                © 2024 {title.value}. All rights reserved
              </Text>
              <Stack
                direction={'row'}
                spacing={6}>
                {socialMedia?.map((platform, index) => (
                  <SocialButton
                    label={platform.title}
                    href={platform.url}
                    key={index}>
                    {getSocialMediaIcon(platform.title.toLowerCase())}
                  </SocialButton>
                ))}
              </Stack>
              <Flex
                gap={5}
                justifyContent={'start'}
                w={'100%'}>
                <Link
                  isExternal
                  href={play_store_link.value}>
                  <Image
                    src={'/play store.png'}
                    w={120}
                  />
                </Link>
                <Link
                  isExternal
                  href={app_store_link.value}>
                  <Image
                    src={'/app store.png'}
                    w={120}
                  />
                </Link>
              </Flex>
            </Stack>
            <Stack align={'flex-start'}>
              <ListHeader>Hospital</ListHeader>
              <Box
                as={RouterLink}
                to={'/about-us'}>
                About us
              </Box>
              <Box
                as={RouterLink}
                to={'/departments'}>
                Departments
              </Box>
              <Box
                as={RouterLink}
                to={'/doctors'}>
                Doctors
              </Box>
              {/* <Box as={RouterLink} to={"#"}>
                Labs
              </Box> */}
              <Box
                as={RouterLink}
                to={'/contact-us'}>
                Contact Us
              </Box>
            </Stack>
            <Stack align={'flex-start'}>
              <ListHeader>Support</ListHeader>
              {/* <Box as="a" href={"#"}>
                Help Center
              </Box> */}
              <Box
                as={RouterLink}
                to={'/terms-and-conditions'}>
                Terms of Service
              </Box>
              <Box
                as={RouterLink}
                to={'/legal'}>
                Legal
              </Box>
              <Box
                as={RouterLink}
                to={'/privacy-policy'}>
                Privacy Policy
              </Box>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
}
