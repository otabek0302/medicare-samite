import PropTypes from 'prop-types';
import { Box, Heading, Text, Image, Button, useColorModeValue } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Logout from '../Controllers/logout';

// @ts-ignore
const ErrorPage = ({ message }) => {
  const { t } = useTranslation();
  const textColor = useColorModeValue('gray.700', 'gray.300');

  useEffect(() => {
    document.title = t('errors.500');
  }, [t]);

  const baseURL = import.meta.env.BASE_URL;

  return (
    <Box textAlign="center" py={10} px={6} bg={useColorModeValue('gray.50', 'gray.800')} minH="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Image
        src={`${baseURL}/broken.gif`}
        alt="Error Illustration"
        boxSize="200px"
        mb={6}
      />

      <Heading as="h1" size="2xl" color={textColor}>
        <Text fontSize="6xl" fontWeight="bold" color="red.500">
          {t('errors.500')}
        </Text>
        {t('errors.internalServerError')}
      </Heading>

      <Text fontSize="lg" mt={4} color={textColor}>
        {message}
      </Text>

      <Text fontSize="md" mt={2} color={textColor}>
        {t('errors.pleaseTryRefreshing')}
      </Text>

      <Button colorScheme="blue" mt={6} onClick={() => window.location.reload()}>
        {t('errors.tryAgain')}
      </Button>
      <Button w={48} colorScheme="red" mt={6} onClick={() => { Logout() }}>
        {t('errors.logout')}
      </Button>
    </Box>
  );
};

ErrorPage.propTypes = {
  message: PropTypes.string
};

export default ErrorPage;
