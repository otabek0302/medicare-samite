/* eslint-disable react/prop-types */
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Divider, FormControl, FormLabel, Input, Grid, Select, useDisclosure, InputGroup, InputLeftAddon, useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { ADD } from '../../Controllers/ApiControllers';

import ISDCODEMODAL from '../../Components/IsdModal';
import moment from 'moment';
import admin from '../../Controllers/admin';
import ShowToast from '../../Controllers/ShowToast';
import todayDate from '../../Controllers/today';

// @ts-ignore
const addPatient = async (data) => {
  const res = await ADD(admin.token, 'add_patient', data);
  if (res.response !== 200) {
    throw new Error(res.message);
  }
  return res;
};

// @ts-ignore
function AddPatients({ nextFn, isOpen, onClose }) {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { register, handleSubmit, reset, watch } = useForm();
  const [isd_code, setisd_code] = useState('+998');
  const { isOpen: isIsdOpen, onOpen: onIsdOpen, onClose: onIsdClose } = useDisclosure();
  const { t } = useTranslation();

  const mutation = useMutation({
    mutationFn: async (data) => {
      await addPatient(data);
    },
    onError: (error) => {
      ShowToast(toast, 'error', JSON.stringify(error));
    },
    onSuccess: () => {
      if (nextFn) {
        nextFn({
          f_name: watch('f_name'),
          l_name: watch('l_name'),
          phone: watch('phone')
        });
      }
      ShowToast(toast, 'success', t('patients.add.messages.success'));
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      onClose();
      reset();
    }
  });

  // @ts-ignore
  const onSubmit = (data) => {
    if (!isd_code) {
      return ShowToast(toast, 'error', t('patients.add.messages.errors.selectIsd'));
    }
    let formData = { ...data, isd_code, dob: data.dob ? moment(data.dob).format('YYYY-MM-DD') : ''};

    mutation.mutate(formData);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={'xl'} scrollBehavior="inside">
      <ModalOverlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent borderRadius={8} overflow={'hidden'} zIndex={99999999}>
          <ModalHeader py={4} fontSize={'md'} bg={'blue.700'} color={'#fff'}>
            {t('patients.add.title')}
          </ModalHeader>
          <ModalCloseButton top={0} color={'#fff'}/>
          <Divider />

          <ModalBody>
            <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={3}>
              <FormControl isRequired gridColumn={'span 3'}>
                <FormLabel mb={-1}>{t('patients.add.form.firstName.label')}</FormLabel>
                <Input
                  size="sm"
                  variant="flushed"
                  {...register('f_name')}
                  placeholder={t('patients.add.form.firstName.placeholder')}
                />
              </FormControl>

              <FormControl isRequired gridColumn={'span 3'}>
                <FormLabel mb={-1}>{t('patients.add.form.lastName.label')}</FormLabel>
                <Input
                  size="sm"
                  variant="flushed"
                  {...register('l_name')}
                  placeholder={t('patients.add.form.lastName.placeholder')}
                />
              </FormControl>

              <FormControl isRequired gridColumn={'span 3'}>
                <FormLabel mb={-1}>{t('patients.add.form.phone.label')}</FormLabel>
                <InputGroup>
                  <InputLeftAddon
                    h={8}
                    bg={'none'}
                    borderTop={0}
                    borderLeft={0}
                    p={0}
                    pr={2}
                    borderRadius={0}
                    cursor={'pointer'}
                    onClick={(e) => {
                      e.stopPropagation();
                      onIsdOpen();
                    }}
                    fontSize={'sm'}>
                    {isd_code} <AiOutlineDown style={{ marginLeft: '10px' }} />
                  </InputLeftAddon>
                  <Input
                    size="sm"
                    variant="flushed"
                    type="tel"
                    placeholder={t('patients.add.form.phone.placeholder')}
                    {...register('phone', {
                      required: true,
                      pattern: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\\./0-9]*$/g
                    })}
                  />
                </InputGroup>
              </FormControl>

              <FormControl isRequired gridColumn={'span 3'}>
                <FormLabel mb={-1}>{t('patients.add.form.gender.label')}</FormLabel>
                <Select
                  size="sm"
                  variant="flushed"
                  defaultValue={t('patients.add.form.gender.options.male')}
                  {...register('gender')}
                  placeholder={t('patients.add.form.gender.placeholder')}>
                  <option value={'Male'}>{t('patients.add.form.gender.options.male')}</option>
                  <option value={'Female'}>{t('patients.add.form.gender.options.female')}</option>
                </Select>
              </FormControl>

              <FormControl isRequired gridColumn={'span 3'}>
                <FormLabel mb={-1}>{t('patients.add.form.dob.label')}</FormLabel>
                <Input
                  max={todayDate()}
                  size="sm"
                  variant="flushed"
                  type="date"
                  {...register('dob')}
                />
              </FormControl>

              <FormControl gridColumn={'span 3'}>
                <FormLabel mb={-1}>{t('patients.add.form.city.label')}</FormLabel>
                <Input
                  size="sm"
                  variant="flushed"
                  {...register('city')}
                />
              </FormControl>

              <FormControl gridColumn={'span 3'}>
                <FormLabel mb={-1}>{t('patients.add.form.state.label')}</FormLabel>
                <Input
                  size="sm"
                  variant="flushed"
                  {...register('state')}
                />
              </FormControl>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose} size={'sm'}>
              {t('patients.add.buttons.close')}
            </Button>
            <Button colorScheme={'blue'} size={'sm'} type="submit" isLoading={mutation.isPending}>
              {t('patients.add.buttons.add')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
      <ISDCODEMODAL isOpen={isIsdOpen} onClose={onIsdClose} setisd_code={setisd_code} />
    </Modal>
  );
}

export default AddPatients;
