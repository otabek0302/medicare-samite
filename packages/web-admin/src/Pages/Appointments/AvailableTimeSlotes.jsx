/* eslint-disable react/prop-types */
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Button, Box, Text, SimpleGrid, useToast } from '@chakra-ui/react';
import { GET } from '../../Controllers/ApiControllers';
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import moment from 'moment';
import admin from '../../Controllers/admin';
import ShowToast from '../../Controllers/ShowToast';

// Generate next 15 days
const Calender15Days = () => {
  const next15Days = [];
  for (let i = 0; i < 15; i++) {
    const date = moment().add(i, 'days').format('YYYY-MM-DD');
    next15Days.push(date);
  }
  return next15Days;
};

// @ts-ignore
const getFormattedDate = (dateString) => {
  const date = moment(dateString, 'YYYY-MM-DD');
  return {
    month: date.format('MMM'),
    date: date.format('DD'),
    year: date.format('ddd')
  };
};

// get time slotes
// @ts-ignore
const getDayName = (dateString) => {
  const date = moment(dateString, 'YYYYMMDD');
  return date.format('dddd');
};

// swiper params
const swiperParams = {
  spaceBetween: 20,
  centeredSlides: false,
  loop: false,
  slidesPerView: 7.5,
  breakpoints: {
    1024: { spaceBetween: 5, slidesPerView: 7.5 },
    768: { spaceBetween: 5, slidesPerView: 6.5 },
    640: {
      spaceBetween: 5,
      slidesPerView: 5.5
    },
    320: {
      spaceBetween: 5,
      slidesPerView: 5.5
    }
  }
};

// @ts-ignore
export default function AvailableTimeSlotes({ doctID, isOpen, onClose, selectedSlot, setselectedSlot, selectedDate, setselectedDate, type }) {
  const { t } = useTranslation();
  const [activeDate, setactiveDate] = useState(selectedDate || moment().format('YYYY-MM-DD'));
  
  const toast = useToast();

  // Fetch time slots for the selected date
  const { data: timeSlots = [], isLoading } = useQuery({
    queryKey: ['time-slots', doctID, activeDate, type],
    queryFn: async () => {
      try {
        const dayName = moment(activeDate).format('dddd');
        console.log('Fetching slots for:', dayName, 'doctID:', doctID);
        
        const res = await GET(
          admin.token,
          `get_doctor_time_interval/${doctID}/${dayName}`
        );
        
        if (!res.data || res.data.length === 0) {
          console.log('No slots available');
          return [];
        }
        
        console.log('Available slots:', res.data);
        return res.data;
      } catch (error) {
        console.error('Error fetching slots:', error);
        ShowToast(toast, 'error', error.message);
        return [];
      }
    },
    enabled: !!doctID && !!activeDate
  });

  console.log('timeSlots', timeSlots);

  // Handle date selection
  const handleDateSelect = (date) => {
    setactiveDate(date);
    setselectedDate(date);
    setselectedSlot(null); // Reset selected slot when date changes
  };

  // Handle slot selection
  const handleSlotSelect = (slot) => {
    setselectedSlot(slot);
    setselectedDate(activeDate);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'2xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={'md'} py={3}>
          {t('appointments.timeSlots.selectDateTime')}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Swiper
              spaceBetween={20}
              slidesPerView={7}
              className="mySwiper">
              {Calender15Days().map((date) => {
                const formattedDate = getFormattedDate(date);
                return (
                  <SwiperSlide key={date}>
                    <Button
                      h={'auto'}
                      p={2}
                      w={'100%'}
                      onClick={() => handleDateSelect(date)}
                      variant={activeDate === date ? 'solid' : 'outline'}
                      colorScheme={activeDate === date ? 'blue' : 'gray'}>
                      <Box>
                        <Text fontSize={'xs'}>{formattedDate.month}</Text>
                        <Text fontSize={'md'} fontWeight={600}>
                          {formattedDate.date}
                        </Text>
                        <Text fontSize={'xs'}>{formattedDate.year}</Text>
                      </Box>
                    </Button>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Box>

          <Box mt={5} border={'1px solid'} borderColor={'gray.200'} p={2} borderRadius={4}>
            <Text textAlign={'left'} fontWeight={600} fontSize={16} mb={1}>
              {t('appointments.timeSlots.available')}
            </Text>
            {isLoading ? (
              <Text>Loading...</Text>
            ) : timeSlots.length > 0 ? (
              <SimpleGrid columns={4} spacing={2}>
                {timeSlots.map((slot, index) => (
                  <Button key={index} size={'sm'} variant={selectedSlot?.time_start === slot.time_start ? 'solid' : 'outline'} colorScheme={selectedSlot?.time_start === slot.time_start ? 'blue' : 'gray'} onClick={() => handleSlotSelect(slot)} >
                    {moment(slot.time_start, 'HH:mm').format('hh:mm A')} -  {moment(slot.time_end, 'HH:mm').format('hh:mm A')}
                  </Button>
                ))}
              </SimpleGrid>
            ) : (
              <Text color={'red.400'} fontWeight={700} fontSize={'sm'}>
                {t('appointments.timeSlots.noAvailable')}
              </Text>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
