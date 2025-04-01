/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Button, Flex, Heading, useColorModeValue, Card, Tabs, TabList, TabPanels, Tab, TabPanel, Divider, Alert, AlertIcon } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { GET } from '../../Controllers/ApiControllers';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import BloodPressure from '../../Components/Vitals/BloodPressure';
import admin from '../../Controllers/admin';
import Loading from '../../Components/Loading';
import UsersCombobox from '../../Components/UsersComboBox';
import DateRangeCalender from '../../Components/DateRangeCalender';
import moment from 'moment';
import BloodSugar from '../../Components/Vitals/BloodSugar';
import SpO2 from '../../Components/Vitals/Spo2';
import Temperature from '../../Components/Vitals/Temp';
import Weight from '../../Components/Vitals/Weigjht';

const Last30 = moment().subtract(30, 'days').format('YYYY-MM-DD');
const today = moment().format('YYYY-MM-DD');

function VitalsData() {
  const navigate = useNavigate();
  const [selectedFamilyMember, setselectedFamilyMember] = useState();
  const [dateRange, setdateRange] = useState({
    startDate: Last30,
    endDate: today
  });
  const { id } = useParams();
  const { data: family, isLoading } = useQuery({
    queryFn: async () => {
      const res = await GET(admin.token, `get_family_members/user/${id}`);
      return res.data;
    },
    queryKey: ['family-member', id]
  });
  const { t } = useTranslation();

  useEffect(() => {
    if (family) {
      setselectedFamilyMember(family[0]);
    }
  }, [family]);

  if (isLoading) return <Loading />;
  return (
    <Box>
      <Flex justify={'space-between'} alignItems={'center'}>
        <Heading as={'h1'} size={'lg'}>
          {t('users.vitals.title')}
        </Heading>
        <Button
          w={120}
          size={'sm'}
          variant={useColorModeValue('blackButton', 'gray')}
          onClick={() => {
            navigate(-1);
          }}>
          {t('users.vitals.back')}
        </Button>
      </Flex>
      <Divider my={2} />
      <Flex
        mt={4}
        gap={3}>
        <Box w={360}>
          {' '}
          <UsersCombobox
            name={t('users.vitals.form.familyMember.label')}
            data={family}
            setState={setselectedFamilyMember}
            defaultData={selectedFamilyMember}
          />
        </Box>
        <DateRangeCalender
          setDateRange={setdateRange}
          daysBack={30}
          size={'md'}
        />
      </Flex>
      <Box mt={3}>
        <Tabs>
          <TabList>
            <Tab>{t('users.vitals.tabs.bloodPressure')}</Tab>
            <Tab>{t('users.vitals.tabs.bloodSugar')}</Tab>
            <Tab>{t('users.vitals.tabs.spo2')}</Tab>
            <Tab>{t('users.vitals.tabs.temperature')}</Tab>
            <Tab>{t('users.vitals.tabs.weight')}</Tab>
          </TabList>

          {selectedFamilyMember ? (
            <TabPanels>
              <TabPanel px={0}>
                {' '}
                <Card p={2}>
                  {' '}
                  <BloodPressure
                    userID={id}
                    id={selectedFamilyMember?.id}
                    startDate={dateRange.startDate}
                    endDate={dateRange.endDate}
                  />
                </Card>
              </TabPanel>
              <TabPanel px={0}>
                {' '}
                <Card p={2}>
                  {' '}
                  <BloodSugar
                    userID={id}
                    id={selectedFamilyMember?.id}
                    startDate={dateRange.startDate}
                    endDate={dateRange.endDate}
                  />
                </Card>
              </TabPanel>
              <TabPanel px={0}>
                {' '}
                <Card p={2}>
                  {' '}
                  <SpO2
                    userID={id}
                    id={selectedFamilyMember?.id}
                    startDate={dateRange.startDate}
                    endDate={dateRange.endDate}
                  />
                </Card>
              </TabPanel>
              <TabPanel px={0}>
                {' '}
                <Card p={2}>
                  {' '}
                  <Temperature
                    userID={id}
                    id={selectedFamilyMember?.id}
                    startDate={dateRange.startDate}
                    endDate={dateRange.endDate}
                  />
                </Card>
              </TabPanel>
              <TabPanel px={0}>
                {' '}
                <Card p={2}>
                  {' '}
                  <Weight
                    userID={id}
                    id={selectedFamilyMember?.id}
                    startDate={dateRange.startDate}
                    endDate={dateRange.endDate}
                  />
                </Card>
              </TabPanel>
            </TabPanels>
          ) : (
            <Alert
              status="error"
              py={1}
              fontWeight={600}
              mt={3}
              fontSize={14}>
              <AlertIcon />
              {t('users.vitals.form.alert')}
            </Alert>
          )}
        </Tabs>
      </Box>
    </Box>
  );
}

export default VitalsData;
