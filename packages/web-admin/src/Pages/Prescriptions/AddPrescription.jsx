import { BsFillClipboardPlusFill } from 'react-icons/bs';
/* eslint-disable react-hooks/rules-of-hooks */
import { BsFillTrashFill } from 'react-icons/bs';
import { Box, Button, Flex, Heading, useColorModeValue, FormControl, FormLabel, Input, CardBody, Card, Divider, Select, HStack, Textarea, IconButton, useToast, useDisclosure } from '@chakra-ui/react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { MedicineAutocomplete } from '../../Components/MedicineAutocomplete';
import { useTranslation } from 'react-i18next';
import { ADD } from '../../Controllers/ApiControllers';

import admin from '../../Controllers/admin';
import useMedicineData from '../../Hooks/Medicines';
import Loading from '../../Components/Loading';
import ShowToast from '../../Controllers/ShowToast';
import AddMedicine from '../Medicines/AddMedicine';

// @ts-ignore
const handleUpdate = async (data) => {
  const res = await ADD(admin.token, 'add_prescription', data);
  if (res.response !== 200) {
    throw new Error(res.message);
  }
  return res;
};
// @ts-ignore
function hasEmptyValue(arr) {
  // @ts-ignore
  return arr.some((item) =>
    Object.entries(item).some(
      ([key, value]) =>
        key !== 'notes' &&
        (value === null || value === '' || value === undefined)
    )
  );
}

function AddPrescription() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, getValues } = useForm();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const appointment_id = searchParams.get('appointmentID');
  const patient_id = searchParams.get('patientID');
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();

  const { medicinesData } = useMedicineData();

  const [medicines, setMedicines] = useState([
    {
      medicine_name: '',
      dosage: 1,
      duration: 'For 3 days',
      time: 'After Meal',
      dose_interval: 'Once a Day',
      notes: ''
    }
  ]);
  const [medicine, setMedicine] = useState({
    medicine_name: '',
    dosage: 1,
    duration: 'For 3 days',
    time: 'After Meal',
    dose_interval: 'Once a Day',
    notes: ''
  });

  // @ts-ignore
  const handleMedicineChange = (index, field, value) => {
    setMedicines((prevMedicines) => {
      // Update the specific medicine entry
      const updatedMedicines = prevMedicines.map((med, i) =>
        i === index ? { ...med, [field]: value } : med
      );
      return updatedMedicines;
    });
  };

  // @ts-ignore
  const handleAdd = () => {
    setMedicines([...medicines, medicine]);
    setMedicine({
      medicine_name: '',
      dosage: 1,
      duration: 'For 3 days',
      time: 'After Meal',
      dose_interval: 'Once a Day',
      notes: ''
    });
  };
  // @ts-ignore
  const handleDelete = (indexToRemove) => {
    setMedicines((prevItems) =>
      prevItems.filter((_, index) => index !== indexToRemove)
    );
  };

  // @ts-ignore
  const mutation = useMutation({
    mutationFn: async () => {
      if (hasEmptyValue(medicines)) {
        throw new Error('Please fill all the fields in medicines');
      }
      const values = getValues();
      const formData = {
        ...values,
        appointment_id: appointment_id,
        patient_id: patient_id,
        medicines: medicines
      };
      await handleUpdate(formData);
    },
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(['prescription', id]);
      // @ts-ignore
      queryClient.invalidateQueries(['prescriptios', appointment_id]);
      navigate(`/appointment/${appointment_id}`);
    },
    onError: (error) => {
      ShowToast(toast, 'error', error.message);
    }
  });

  if (mutation.isPending) return <Loading />;

  return (
    <Box>
      <Flex
        justify={'space-between'}
        alignItems={'center'}>
        <Heading
          as={'h1'}
          size={'md'}>
          {t('prescriptions.add.title')}
        </Heading>
        <Button
          w={120}
          size={'sm'}
          variant={useColorModeValue('blackButton', 'gray')}
          onClick={() => {
            navigate(-1);
          }}>
          {t('prescriptions.add.buttons.back')}
        </Button>
      </Flex>
      <Box>
        {' '}
        <Card
          mt={5}
          bg={useColorModeValue('white', 'gray.700')}>
          <CardBody p={3} as={'form'}>
            <Flex justify={'space-between'}>
              {' '}
              <Heading as={'h3'} size={'sm'}>
                Medicines -
              </Heading>{' '}
              <Button size="sm" colorScheme={'blue'} onClick={onOpen}>
                {t('prescriptions.add.buttons.newMedicine')}
              </Button>
            </Flex>

            <Divider mt={2} mb={5} />

            {medicines.map((med, index) => (
              <Box key={index}>
                {' '}
                <HStack spacing={4} w="full" mb={5} align={'flex-end'}>
                  <FormControl>
                    <FormLabel fontSize={'sm'} mb={0}>
                      {t('prescriptions.add.medicine')}
                    </FormLabel>
                    {/* @ts-ignore */}
                    <MedicineAutocomplete name={'Medicine'} data={medicinesData} defaultName={med.medicine_name} handleChange={handleMedicineChange} mainIndex={index} />
                  </FormControl>
                  <FormControl w={'150px'}>
                    <FormLabel
                      fontSize={'sm'}
                      mb={0}>
                      {t('prescriptions.add.dosage')}
                    </FormLabel>
                    <Select
                      name="dosage"
                      value={med.dosage}
                      onChange={(e) =>
                        handleMedicineChange(index, 'dosage', e.target.value)
                      }
                      size={'md'}>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize={'sm'} mb={0}>
                      {t('prescriptions.add.duration.label')}
                    </FormLabel>
                    <Select name="duration" value={med.duration}
                      onChange={(e) =>
                        handleMedicineChange(index, 'duration', e.target.value)
                      }
                      size={'md'}>
                      <option value="For 3 days">
                        {t('prescriptions.add.duration.options.threeDays')}
                      </option>
                      <option value="For 5 days">
                        {t('prescriptions.add.duration.options.fiveDays')}
                      </option>
                      <option value="For 7 days">
                        {t('prescriptions.add.duration.options.sevenDays')}
                      </option>
                      <option value="For 15 days">
                        {t('prescriptions.add.duration.options.fifteenDays')}
                      </option>
                      <option value="For 1 Month">
                        {t('prescriptions.add.duration.options.oneMonth')}
                      </option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel
                      fontSize={'sm'}
                      mb={0}>
                      {t('prescriptions.add.time.label')}
                    </FormLabel>

                    <Select
                      size={'md'}
                      name="time"
                      value={med.time}
                      onChange={(e) =>
                        handleMedicineChange(index, 'time', e.target.value)
                      }>
                      <option value="After Meal">
                        {t('prescriptions.add.time.options.afterMeal')}
                      </option>
                      <option value="Before Meal">
                        {t('prescriptions.add.time.options.beforeMeal')}
                      </option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel
                      fontSize={'sm'}
                      mb={0}>
                      {t('prescriptions.add.doseInterval.label')}
                    </FormLabel>
                    <Select
                      size={'md'}
                      name="dose_interval"
                      value={med.dose_interval}
                      onChange={(e) =>
                        handleMedicineChange(
                          index,
                          'dose_interval',
                          e.target.value
                        )
                      }>
                      {' '}
                      <option value="Once a Day">
                        {t('prescriptions.add.doseInterval.options.onceADay')}
                      </option>
                      <option value="Every Morning & Evening">
                        {t('prescriptions.add.doseInterval.options.everyMorningAndEvening')}
                      </option>
                      <option value="3 Times a day">
                        {t('prescriptions.add.doseInterval.options.threeTimesADay')}
                      </option>
                      <option value="4 Times a day">
                        {t('prescriptions.add.doseInterval.options.fourTimesADay')}
                      </option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel
                      fontSize={'sm'}
                      mb={0}>
                      {t('prescriptions.add.notes.label')}
                    </FormLabel>
                    <Input
                      size={'md'}
                      name="notes"
                      value={med.notes}
                      onChange={(e) =>
                        handleMedicineChange(index, 'notes', e.target.value)
                      }
                    />
                  </FormControl>{' '}
                  <Flex mb={'2px'}>
                    {' '}
                    {medicines.length > 1 && (
                      <IconButton
                        aria-label="Delete Medicine"
                        size={'md'}
                        colorScheme={'red'}
                        icon={<BsFillTrashFill />}
                        onClick={() => {
                          handleDelete(index);
                        }}
                      />
                    )}
                  </Flex>
                </HStack>
              </Box>
            ))}
            <Button
              onClick={handleAdd}
              size={'sm'}
              colorScheme={'facebook'}
              rightIcon={<BsFillClipboardPlusFill />}>
              {t('prescriptions.add.buttons.newMedicine')}
            </Button>
          </CardBody>
        </Card>
        {/* tests and advise  */}
        <Card
          mt={5}
          bg={useColorModeValue('white', 'gray.700')}>
          <CardBody
            p={3}
            as={'form'}>
            <Flex justify={'space-between'}>
              {' '}
              <Heading
                as={'h3'}
                size={'sm'}>
                {t('prescriptions.add.form.physicalInformation.label')}
              </Heading>{' '}
            </Flex>
            <Divider
              mt={2}
              mb={5}
            />
            <Flex
              flexWrap={'wrap'}
              gap={5}>
              <FormControl
                mt={3}
                w={'300px'}>
                <FormLabel fontSize={'sm'}>
                  {t('prescriptions.add.form.foodAllergies.label')}
                </FormLabel>
                <Input
                  size={'md'}
                  {...register('food_allergies')}
                />
              </FormControl>
              <FormControl
                mt={3}
                w={'300px'}>
                <FormLabel fontSize={'sm'}>
                  {t('prescriptions.add.form.tendencyToBleed.label')}
                </FormLabel>
                <Input
                  size={'md'}
                  {...register('tendency_bleed')}
                />
              </FormControl>
              <FormControl
                mt={3}
                w={'300px'}>
                <FormLabel fontSize={'sm'}>
                  {t('prescriptions.add.form.heartDisease.label')}
                </FormLabel>
                <Input
                  size={'md'}
                  {...register('heart_disease')}
                />
              </FormControl>
              <FormControl
                mt={3}
                w={'300px'}>
                <FormLabel fontSize={'sm'}>
                  {t('prescriptions.add.form.bloodPressure.label')}
                </FormLabel>
                <Input
                  size={'md'}
                  {...register('blood_pressure')}
                />
              </FormControl>
              <FormControl
                mt={3}
                w={'300px'}>
                <FormLabel fontSize={'sm'}>
                  {t('prescriptions.add.form.diabetic.label')}
                </FormLabel>
                <Input
                  size={'md'}
                  {...register('diabetic')}
                />
              </FormControl>
              <FormControl
                mt={3}
                w={'300px'}>
                <FormLabel fontSize={'sm'}>
                  {t('prescriptions.add.form.surgery.label')}
                </FormLabel>
                <Input
                  size={'md'}
                  {...register('surgery')}
                />
              </FormControl>
              <FormControl
                mt={3}
                w={'300px'}>
                <FormLabel fontSize={'sm'}>
                  {t('prescriptions.add.form.accident.label')}
                </FormLabel>
                <Input
                  size={'md'}
                  {...register('accident')}
                />
              </FormControl>
              <FormControl
                mt={3}
                w={'300px'}>
                <FormLabel fontSize={'sm'}>
                  {t('prescriptions.add.form.others.label')}
                </FormLabel>
                <Input
                  size={'md'}
                  {...register('others')}
                />
              </FormControl>
              <FormControl
                mt={3}
                w={'300px'}>
                <FormLabel fontSize={'sm'}>
                  {t('prescriptions.add.form.medicalHistory.label')}
                </FormLabel>
                <Input
                  size={'md'}
                  {...register('medical_history')}
                />
              </FormControl>
              <FormControl
                mt={3}
                w={'300px'}>
                <FormLabel fontSize={'sm'}>
                  {t('prescriptions.add.form.currentMedication.label')}
                </FormLabel>
                <Input
                  size={'md'}
                  {...register('current_medication')}
                />
              </FormControl>
              <FormControl
                mt={3}
                w={'300px'}>
                <FormLabel fontSize={'sm'}>
                  {t('prescriptions.add.form.femalePregnancy.label')}
                </FormLabel>
                <Input
                  size={'md'}
                  {...register('female_pregnancy')}
                />
              </FormControl>
              <FormControl
                mt={3}
                w={'300px'}>
                <FormLabel fontSize={'sm'}>
                  {t('prescriptions.add.form.breastFeeding.label')}
                </FormLabel>
                <Input
                  size={'md'}
                  {...register('breast_feeding')}
                />
              </FormControl>
              <FormControl
                mt={3}
                w={'300px'}>
                <FormLabel fontSize={'sm'}>
                  {t('prescriptions.add.form.pulseRate.label')}
                </FormLabel>
                <Input
                  size={'md'}
                  {...register('pulse_rate')}
                />
              </FormControl>
              <FormControl
                mt={3}
                w={'300px'}>
                <FormLabel fontSize={'sm'}>
                  {t('prescriptions.add.form.temperature.label')}
                </FormLabel>
                <Input
                  size={'md'}
                  {...register('temperature')}
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
            <Flex justify={'space-between'}>
              {' '}
              <Heading
                as={'h3'}
                size={'sm'}>
                {t('prescriptions.add.form.problemAndAdvice.label')}
              </Heading>{' '}
            </Flex>
            <Divider
              mt={2}
              mb={5}
            />
            <FormControl>
              <FormLabel
                fontSize={'md'}
                mb={1}>
                {t('prescriptions.add.form.problem.label')}
              </FormLabel>
              <Textarea
                height={100}
                {...register('problem_desc')}
              />
            </FormControl>
            <FormControl>
              <FormLabel
                fontSize={'md'}
                mb={1}>
                {t('prescriptions.add.form.tests.label')}
              </FormLabel>
              <Textarea
                height={100}
                {...register('test')}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel
                fontSize={'md'}
                mb={1}>
                {t('prescriptions.add.form.advice.label')}
              </FormLabel>
              <Textarea
                height={100}
                {...register('advice')}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel
                fontSize={'md'}
                mb={1}>
                {t('prescriptions.add.form.nextVisit.label')}
              </FormLabel>
              <Flex
                gap={5}
                alignItems={'center'}>
                {t('prescriptions.add.form.nextVisit.after')}
                <Input
                  w={16}
                  type="number"
                  {...register('next_visit')}
                  min={1}
                  defaultValue={1}
                />
                {t('prescriptions.add.form.nextVisit.days')}
              </Flex>
            </FormControl>
          </CardBody>
        </Card>
        <Flex
          w={'100%'}
          justify={'end'}
          mt={5}>
          <Button w={96} colorScheme={'green'} size={'sm'} onClick={() => {mutation.mutate() }}>
            {t('prescriptions.add.buttons.save')}
          </Button>
        </Flex>
      </Box>

      <AddMedicine isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export default AddPrescription;
