import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import Roles from './Role';
import AssignedUsers from './AssignedUsers';

function Index() {
  const { t } = useTranslation();
  return (
    <Box>
      <Tabs>
        <TabList>
          <Tab>{t('roles.tabs.roles')}</Tab>
          <Tab>{t('roles.tabs.assignedUsers')}</Tab>
        </TabList>

        <TabPanels>
          <TabPanel p={0}>
            <Box mt={5}>
              <Roles />
            </Box>
          </TabPanel>
          <TabPanel p={0}>
            <Box mt={5}>
              <AssignedUsers />
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default Index;
