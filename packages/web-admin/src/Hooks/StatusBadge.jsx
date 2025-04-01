import { Badge } from '@chakra-ui/react';

const getStatusBadge = (status, translatedText) => {
  switch (status) {
    case 'Pending':
      return (
        <Badge
          colorScheme="yellow"
          fontSize={12}
          letterSpacing={0.5}
          p={'5px'}>
          {translatedText || status}
        </Badge>
      );
    case 'Confirmed':
      return (
        <Badge
          colorScheme="green"
          fontSize={12}
          letterSpacing={0.5}
          p={'5px'}>
          {translatedText || status}
        </Badge>
      );
    case 'Rejected':
      return (
        <Badge
          colorScheme="red"
          fontSize={12}
          letterSpacing={0.5}
          p={'5px'}>
          {translatedText || status}
        </Badge>
      );
    case 'Cancelled':
      return (
        <Badge
          colorScheme="red"
          fontSize={12}
          letterSpacing={0.5}
          p={'5px'}>
          {translatedText || status}
        </Badge>
      );
    case 'Completed':
      return (
        <Badge
          colorScheme="blue"
          fontSize={12}
          letterSpacing={0.5}
          p={'5px'}>
          {translatedText || status}
        </Badge>
      );
    case 'Rescheduled':
      return (
        <Badge
          colorScheme="orange"
          fontSize={12}
          letterSpacing={0.5}
          p={'5px'}>
          {translatedText || status}
        </Badge>
      );
    case 'Visited':
      return (
        <Badge
          colorScheme="purple"
          fontSize={12}
          letterSpacing={0.5}
          p={'5px'}>
          {translatedText || status}
        </Badge>
      );
    default:
      return (
        <Badge
          colorScheme="gray"
          fontSize={12}
          letterSpacing={0.5}
          p={'5px'}>
          {translatedText || status}
        </Badge>
      );
  }
};

export default getStatusBadge;
