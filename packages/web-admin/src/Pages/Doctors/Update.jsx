import { Box, Button, FormControl, FormLabel, Heading, Input, Select, Stack, useToast, Switch } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { GET, UPDATE } from '../../Controllers/ApiControllers';
import { useTranslation } from 'react-i18next';
import ShowToast from '../../Controllers/ShowToast';
import admin from '../../Controllers/admin';
import Loading from '../../Components/Loading';

// API functions
const getSpclizeList = async () => {
  const res = await GET(admin.token, 'get_specialization');
  return res.data;
};

const getDepartmentList = async () => {
  const res = await GET(admin.token, 'get_department');
  return res.data;
};

export default function UpdateDoctor() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Fetch doctor details
  const { data: doctor, isLoading: isDoctorLoading } = useQuery({
    queryKey: ['doctor', id],
    queryFn: async () => {
      const res = await GET(admin.token, `get_doctor/${id}`);
      if (res.data) {
        reset(res.data);
      }
      return res.data;
    }
  });

  // Fetch departments
  const { data: departments } = useQuery({
    queryKey: ['departments'],
    queryFn: getDepartmentList
  });

  // Fetch specializations
  const { data: specializations } = useQuery({
    queryKey: ['specializations'],
    queryFn: getSpclizeList
  });

  // Update doctor mutation
  const updateDoctor = useMutation({
    mutationFn: async (data) => {
      // @ts-ignore
      return await UPDATE(admin.token, 'update_doctor', { id, ...data });
    },
    onSuccess: (res) => {
      if (res.response === 200) {
        ShowToast(toast, 'success', t('doctors.update.messages.doctorUpdated'));
        navigate(-1);
      } else {
        ShowToast(toast, 'error', res.message);
      }
    }
  });
  // @ts-ignore
  const onSubmit = (data) => {
    // @ts-ignore
    updateDoctor.mutate(data);
  };

  if (isDoctorLoading) return <Loading />;

  return (
    <Box p={4}>
      <Heading mb={6}>
        {t('doctors.update.title')} #{id}
      </Heading>

      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4} maxW="xl">
          {/* Basic Information */}
          <Heading size="md" mt={4}>{t('doctors.update.basicDetails')}</Heading>

          {/* Existing fields */}
          <FormControl isRequired isInvalid={!!errors.f_name}>
            <FormLabel>{t('doctors.update.form.firstName')}</FormLabel>
            <Input {...register('f_name')} defaultValue={doctor?.f_name} />
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.l_name}>
            <FormLabel>{t('doctors.update.form.lastName')}</FormLabel>
            <Input {...register('l_name')} defaultValue={doctor?.l_name} />
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.dob}>
            <FormLabel>{t('doctors.update.form.dob')}</FormLabel>
            <Input
              type="date"
              {...register('dob')}
              defaultValue={doctor?.dob}
            />
          </FormControl>

          {/* Contact Information */}
          <Heading size="md" mt={4}>{t('doctors.update.contactDetails')}</Heading>

          <FormControl isRequired isInvalid={!!errors.email}>
            <FormLabel>{t('doctors.update.form.email')}</FormLabel>
            <Input type="email" {...register('email')} defaultValue={doctor?.email} />
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.phone}>
            <FormLabel>{t('doctors.update.form.phone')}</FormLabel>
            <Input {...register('phone')} defaultValue={doctor?.phone} />
          </FormControl>

          <FormControl>
            <FormLabel>{t('doctors.update.form.secondaryPhone')}</FormLabel>
            <Input {...register('phone_sec')} defaultValue={doctor?.phone_sec} />
          </FormControl>

          {/* Address Information */}
          <Heading size="md" mt={4}>{t('doctors.update.addressDetails')}</Heading>

          <FormControl>
            <FormLabel>{t('doctors.update.form.state')}</FormLabel>
            <Input {...register('state')} defaultValue={doctor?.state} />
          </FormControl>

          <FormControl>
            <FormLabel>{t('doctors.update.form.city')}</FormLabel>
            <Input {...register('city')} defaultValue={doctor?.city} />
          </FormControl>

          <FormControl>
            <FormLabel>{t('doctors.update.form.postalCode')}</FormLabel>
            <Input {...register('postal_code')} defaultValue={doctor?.postal_code} />
          </FormControl>

          <FormControl>
            <FormLabel>{t('doctors.update.form.address')}</FormLabel>
            <Input {...register('address')} defaultValue={doctor?.address} />
          </FormControl>

          {/* Professional Information */}
          <Heading size="md" mt={4}>{t('doctors.update.professionalInfo')}</Heading>

          <FormControl isRequired isInvalid={!!errors.department}>
            <FormLabel>{t('doctors.update.form.department')}</FormLabel>
            <Select {...register('department')} defaultValue={doctor?.department}>
              <option value="">{t('doctors.update.form.selectDepartment')}</option>
              {departments?.map((
                // @ts-ignore
                dept) => (
                <option key={dept.id} value={dept.id}>{dept.title}</option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.specialization}>
            <FormLabel>{t('doctors.update.form.specialization')}</FormLabel>
            <Select {...register('specialization')} defaultValue={doctor?.specialization}>
              <option value="">{t('doctors.update.form.selectSpecialization')}</option>
              {/* @ts-ignore */}
              {specializations?.map((spec) => (
                <option key={spec.id} value={spec.title}>{spec.title}</option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.ex_year}>
            <FormLabel>{t('doctors.update.form.experience.label')}</FormLabel>
            <Input
              type="number"
              {...register('ex_year')}
              defaultValue={doctor?.ex_year}
            />
          </FormControl>

          <FormControl>
            <FormLabel>{t('doctors.update.form.description')}</FormLabel>
            <Input {...register('description')} defaultValue={doctor?.description} />
          </FormControl>

          {/* Fees */}
          <Heading size="md" mt={4}>{t('doctors.update.fees.title')}</Heading>

          <FormControl>
            <FormLabel>{t('doctors.update.fees.opd')}</FormLabel>
            <Input
              type="number"
              {...register('opd_fee')}
              defaultValue={doctor?.opd_fee}
            />
          </FormControl>

          <FormControl>
            <FormLabel>{t('doctors.update.fees.video')}</FormLabel>
            <Input
              type="number"
              {...register('video_fee')}
              defaultValue={doctor?.video_fee}
            />
          </FormControl>

          <FormControl>
            <FormLabel>{t('doctors.update.fees.emergency')}</FormLabel>
            <Input
              type="number"
              {...register('emg_fee')}
              defaultValue={doctor?.emg_fee}
            />
          </FormControl>

          {/* Appointment Settings */}
          <Heading size="md" mt={4}>{t('doctors.update.appointmentSettings')}</Heading>

          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0">{t('doctors.update.active')}</FormLabel>
            <Switch
              {...register('active')}
              defaultChecked={doctor?.active === 1}
            />
          </FormControl>

          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0">{t('doctors.update.stopBooking')}</FormLabel>
            <Switch
              {...register('stop_booking')}
              defaultChecked={doctor?.stop_booking === 1}
            />
          </FormControl>

          {/* Submit Button */}
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={updateDoctor.isPending}
            mt={8}
          >
            {t('doctors.update.buttons.update')}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
