import { BiPrinter } from 'react-icons/bi';
/* eslint-disable react-hooks/rules-of-hooks */
import { BiPlus } from 'react-icons/bi';
import { BsFillTrashFill } from 'react-icons/bs';
import { Box, Button, Flex, Heading, useColorModeValue, FormControl, FormLabel, Input, CardBody, Card, Divider, Select, HStack, Textarea, IconButton, useToast, useDisclosure } from '@chakra-ui/react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { GET, UPDATE } from '../../Controllers/ApiControllers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { MedicineAutocomplete } from '../../Components/MedicineAutocomplete';
import { useForm } from 'react-hook-form';

import useMedicineData from '../../Hooks/Medicines';
import admin from '../../Controllers/admin';
import Loading from '../../Components/Loading';
import showToast from '../../Controllers/ShowToast';
import AddMedicine from '../Medicines/AddMedicine';
import api from '../../Controllers/api';
import { useTranslation } from 'react-i18next';

function hasEmptyValue(arr) {
  return arr.some((item) =>
    Object.entries(item).some(
      ([key, value]) =>
        key !== 'notes' &&
        (value === null || value === '' || value === undefined)
    )
  );
}

function UpdatePrescription() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, getValues } = useForm();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const appointment_id = searchParams.get('appointmentID');
  const patient_id = searchParams.get('patientID');
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { medicinesData } = useMedicineData();
  const getData = async () => {
    const res = await GET(admin.token, `get_prescription/${id}`);
    return res.data;
  };

  const { data: prescriptionData, isLoading } = useQuery({
    queryKey: ['prescription', id],
    queryFn: getData
  });

  const [medicines, setMedicines] = useState(prescriptionData?.items || []);
  const [medicine, setMedicine] = useState({
    medicine_name: '',
    dosage: '',
    duration: '',
    time: '',
    dose_interval: '',
    notes: ''
  });
  useEffect(() => {
    setMedicines(
      prescriptionData?.items || [
        {
          medicine_name: '',
          dosage: '',
          duration: '',
          time: '',
          dose_interval: '',
          notes: ''
        }
      ]
    );
  }, [prescriptionData]);

  const handleMedicineChange = (index, field, value) => {
    console.log(field, value, medicines);
    setMedicines((prevMedicines) => {
      // Update the specific medicine entry
      const updatedMedicines = prevMedicines.map((med, i) =>
        i === index ? { ...med, [field]: value } : med
      );
      return updatedMedicines;
    });
  };

  const handleAdd = () => {
    setMedicines([...medicines, medicine]);
    setMedicine({
      medicine_name: '',
      dosage: '',
      duration: '',
      time: '',
      dose_interval: '',
      notes: ''
    });
  };
  const handleDelete = (indexToRemove) => {
    setMedicines((prevItems) =>
      prevItems.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleUpdate = async () => {
    if (hasEmptyValue(medicines)) {
      return showToast(toast, 'error', 'Please fill all the medicine details');
    }
    const values = getValues();

    console.log(values);
    const data = {
      ...values,
      id: id,
      appointment_id: appointment_id,
      patient_id: patient_id,
      medicines: medicines
    };

    try {
      const res = await UPDATE(admin.token, 'update_prescription', data);
      if (res.response === 200) {
        showToast(toast, 'success', 'Patient Updated!');
      } else {
        showToast(toast, 'error', res.message);
      }
    } catch (error) {
      showToast(toast, 'error', JSON.stringify(error));
    }
  };

  const mutation = useMutation({
    mutationFn: async () => {
      await handleUpdate();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['prescription', id]);
      queryClient.invalidateQueries(['prescriptios', appointment_id]);
    }
  });

  const printPdf = () => {
    const pdfUrl = `${api}/prescription/generatePDF/${id}`;
    const newWindow = window.open(pdfUrl, '_blank');
    if (newWindow) {
      newWindow.focus();
      newWindow.onload = () => {
        newWindow.load();
        newWindow.onafterprint = () => {
          newWindow.close();
        };
      };
    }
  };

  if (isLoading || mutation.isPending) return <Loading />;

  return (
    <Box>
      <Flex
        justify={'space-between'}
        alignItems={'center'}>
        <Heading
          as={'h1'}
          size={'md'}>
          {t('prescriptions.update.title')}
        </Heading>
        <Button
          w={120}
          size={'sm'}
          variant={useColorModeValue('blackButton', 'gray')}
          onClick={() => {
            navigate(-1);
          }}>
          {t('prescriptions.update.buttons.back')}
        </Button>
      </Flex>
      <Box>
        {' '}
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
                Medicines -
              </Heading>{' '}
              <Flex gap={3}>
                {' '}
                <Button
                  size="sm"
                  colorScheme={'facebook'}
                  onClick={printPdf}
                  leftIcon={<BiPrinter fontSize={18} />}>
                  Print
                </Button>{' '}
                <Button
                  size="sm"
                  colorScheme={'blue'}
                  onClick={onOpen}>
                  {t('prescriptions.update.buttons.newMedicine')}
                </Button>
              </Flex>
            </Flex>

            <Divider
              mt={2}
              mb={5}
            />

            {medicines.map((med, index) => (
              <HStack
                key={index}
                spacing={4}
                w="full"
                mb={5}
                align={'flex-end'}>
                <FormControl>
                  <FormLabel
                    fontSize={'sm'}
                    mb={0}>
                    Medicine
                  </FormLabel>
                  <MedicineAutocomplete
                    name={'Medicine'}
                    data={medicinesData}
                    defaultName={med.medicine_name}
                    handleChange={handleMedicineChange}
                    mainIndex={index}
                  />
                </FormControl>
                <FormControl w={'150px'}>
                  <FormLabel
                    fontSize={'sm'}
                    mb={0}>
                    {t('prescriptions.update.form.dosage')}
                  </FormLabel>
                  <Select
                    name="dosage"
                    value={med.dosage}
                    onChange={(e) =>
                      handleMedicineChange(index, 'dosage', e.target.value)
                    }
                    size={'md'}
                    placeholder="Select">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((d) => (
                      <option
                        key={d}
                        value={d}>
                        {d}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel
                    fontSize={'sm'}
                    mb={0}>
                    {t('prescriptions.update.form.duration.label')}
                  </FormLabel>
                  <Select
                    name="duration"
                    value={med.duration}
                    onChange={(e) =>
                      handleMedicineChange(index, 'duration', e.target.value)
                    }
                    size={'md'}
                    placeholder="Select">
                    <option value="For 3 days">{t('prescriptions.update.form.duration.options.threeDays')}</option>
                    <option value="For 5 days">{t('prescriptions.update.form.duration.options.fiveDays')}</option>
                    <option value="For 7 days">{t('prescriptions.update.form.duration.options.sevenDays')}</option>
                    <option value="For 15 days">{t('prescriptions.update.form.duration.options.fifteenDays')}</option>
                    <option value="For 1 Month">{t('prescriptions.update.form.duration.options.oneMonth')}</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel
                    fontSize={'sm'}
                    mb={0}>
                    {t('prescriptions.update.form.time')}
                  </FormLabel>

                  <Select
                    size={'md'}
                    name="time"
                    value={med.time}
                    onChange={(e) =>
                      handleMedicineChange(index, 'time', e.target.value)
                    }
                    placeholder="Select">
                    <option value="After Meal">{t('prescriptions.update.form.time.options.afterMeal')}</option>
                    <option value="Before Meal">{t('prescriptions.update.form.time.options.beforeMeal')}</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel
                    fontSize={'sm'}
                    mb={0}>
                    {t('prescriptions.update.form.doseInterval.label')}
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
                    }
                    placeholder="Select">
                    {' '}
                    <option value="Once a Day">{t('prescriptions.update.form.doseInterval.options.onceADay')}</option>
                    <option value="Every Morning & Evening">
                      {t('prescriptions.update.form.doseInterval.options.everyMorningAndEvening')}
                    </option>
                    <option value="3 Times a day">{t('prescriptions.update.form.doseInterval.options.threeTimesADay')}</option>
                    <option value="4 Times a day">{t('prescriptions.update.form.doseInterval.options.fourTimesADay')}</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel
                    fontSize={'sm'}
                    mb={0}>
                    {t('prescriptions.update.form.notes.label')}
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
                <Flex
                  mb={'2px'}
                  gap={3}>
                  <IconButton
                    size={'sm'}
                    colorScheme={'blue'}
                    icon={<BiPlus fontSize={20} />}
                    onClick={handleAdd}
                  />
                  {medicines?.length > 1 && (
                    <IconButton
                      size={'sm'}
                      colorScheme={'red'}
                      icon={<BsFillTrashFill />}
                      onClick={() => {
                        handleDelete(index);
                      }}
                    />
                  )}
                </Flex>
              </HStack>
            ))}
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
                {t('prescriptions.update.form.physicalInformation.label')}
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
                  {t('prescriptions.update.form.foodAllergies.label')}
                </FormLabel>
                <Input
                  size={'md'}
                  {...register('food_allergies')}
                  defaultValue={prescriptionData.food_allergies}
                />
              </FormControl>
              <FormControl
                mt={3}
                w={'300px'}>
                <FormLabel fontSize={'sm'}>
                  {t('prescriptions.update.form.tendencyToBleed.label')}
                </FormLabel>
                <Input
                  size={'md'}
                  {...register('tendency_bleed')}
                  defaultValue={prescriptionData.tendency_bleed}
                />
              </FormControl>
              <FormControl
                mt={3}
                w={'300px'}>
                <FormLabel fontSize={'sm'}>
                  {t('prescriptions.update.form.heartDisease.label')}
                </FormLabel>
                <Input
                  size={'md'}
                  {...register('heart_disease')}
                  defaultValue={prescriptionData.heart_disease}
                />
              </FormControl>
              <FormControl
                mt={3}
                w={'300px'}>
                <FormLabel fontSize={'sm'}>
                  {t('prescriptions.update.form.bloodPressure.label')}
                </FormLabel>
                <Input
                  size={'md'}
                  {...register('blood_pressure')}
                  defaultValue={prescriptionData.blood_pressure}
                />
              </FormControl>
              <FormControl
                mt={3}
                w={'300px'}>
                <FormLabel fontSize={'sm'}>
                  {t('prescriptions.update.form.diabetic.label')}
                </FormLabel>
                <Input
                  size={'md'}
                  {...register('diabetic')}
                  defaultValue={prescriptionData.diabetic}
                />
              </FormControl>
              <FormControl
                mt={3}
                w={'300px'}>
                <FormLabel fontSize={'sm'}>
                  {t('prescriptions.update.form.surgery.label')}
                </FormLabel>
                <Input
                  size={'md'}
                  {...register('surgery')}
                  defaultValue={prescriptionData.surgery}
                />
              </FormControl>
              <FormControl
                mt={3}
                w={'300px'}>
                <FormLabel fontSize={'sm'}>
                  {t('prescriptions.update.form.accident.label')}
                </FormLabel>
                <Input
                  size={'md'}
                  {...register('accident')}
                  defaultValue={prescriptionData.accident}
                />
              </FormControl>
              <FormControl
                mt={3}
                w={'300px'}>
                <FormLabel fontSize={'sm'}>
                  {t('prescriptions.update.form.others.label')}
                </FormLabel>
                <Input
                  size={'md'}
                  {...register('others')}
                  defaultValue={prescriptionData.others}
                />
              </FormControl>
              <FormControl
                mt={3}
                w={'300px'}>
                <FormLabel fontSize={'sm'}>
                  {t('prescriptions.update.form.medicalHistory.label')}
                </FormLabel>
                <Input
                  size={'md'}
                  {...register('medical_history')}
                  defaultValue={prescriptionData.medical_history}
                />
              </FormControl>
              <FormControl
                mt={3}
                w={'300px'}>
                <FormLabel fontSize={'sm'}>
                  {t('prescriptions.update.form.currentMedication.label')}
                </FormLabel>
                <Input
                  size={'md'}
                  {...register('current_medication')}
                  defaultValue={prescriptionData.current_medication}
                />
              </FormControl>
              <FormControl
                mt={3}
                w={'300px'}>
                <FormLabel fontSize={'sm'}>
                  {t('prescriptions.update.form.femalePregnancy.label')}
                </FormLabel>
                <Input
                  size={'md'}
                  {...register('female_pregnancy')}
                  defaultValue={prescriptionData.female_pregnancy}
                />
              </FormControl>
              <FormControl
                mt={3}
                w={'300px'}>
                <FormLabel fontSize={'sm'}>
                  {t('prescriptions.update.form.breastFeeding.label')}
                </FormLabel>
                <Input
                  size={'md'}
                  {...register('breast_feeding')}
                  defaultValue={prescriptionData.breast_feeding}
                />
              </FormControl>
              <FormControl
                mt={3}
                w={'300px'}>
                <FormLabel fontSize={'sm'}>
                  {t('prescriptions.update.form.pulseRate.label')}
                </FormLabel>
                <Input
                  size={'md'}
                  {...register('pulse_rate')}
                  defaultValue={prescriptionData.pulse_rate}
                />
              </FormControl>
              <FormControl
                mt={3}
                w={'300px'}>
                <FormLabel fontSize={'sm'}>
                  {t('prescriptions.update.form.temperature.label')}
                </FormLabel>
                <Input
                  size={'md'}
                  {...register('temperature')}
                  defaultValue={prescriptionData.temperature}
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
                Other -
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
                {t('prescriptions.update.form.problem.label')}
              </FormLabel>
              <Textarea
                height={100}
                {...register('problem_desc')}
                defaultValue={prescriptionData.problem_desc}
              />
            </FormControl>
            <FormControl>
              <FormLabel
                fontSize={'md'}
                mb={1}>
                {t('prescriptions.update.form.tests.label')}
              </FormLabel>
              <Textarea
                height={100}
                {...register('tests')}
                defaultValue={prescriptionData.test}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel
                fontSize={'md'}
                mb={1}>
                {t('prescriptions.update.form.advice.label')}
              </FormLabel>
              <Textarea
                height={100}
                {...register('advice')}
                defaultValue={prescriptionData.advice}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel
                fontSize={'md'}
                mb={1}>
                {t('prescriptions.update.form.nextVisit.label')}
              </FormLabel>
              <Flex
                gap={5}
                alignItems={'center'}>
                {t('prescriptions.update.form.nextVisit.options.after')}
                <Input
                  w={16}
                  type="number"
                  {...register('next_visit')}
                  min={1}
                  defaultValue={prescriptionData.next_visit}
                />
                {t('prescriptions.update.form.nextVisit.options.days')}
              </Flex>
            </FormControl>
          </CardBody>
        </Card>
        <Flex
          w={'100%'}
          justify={'end'}
          mt={5}>
          <Button
            w={96}
            colorScheme={'green'}
            size={'sm'}
            onClick={() => {
              mutation.mutate();
            }}>
            {t('prescriptions.update.buttons.save')}
          </Button>
        </Flex>
      </Box>

      <AddMedicine
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
}

export default UpdatePrescription;
