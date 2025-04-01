import { Box, Tab, TabList, Tabs, TabPanels, TabPanel } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import AllCoupons from './AllCoupon';
import UsedCoupons from './UsedCoupons';

function Coupons() {
  const { t } = useTranslation();

  return (
    <Box>
      <Tabs>
        <TabList>
          <Tab>{t('coupons.index.tabs.all')}</Tab>
          <Tab>{t('coupons.index.tabs.used')}</Tab>
        </TabList>

        <TabPanels>
          <TabPanel px={0}>
            <AllCoupons />
          </TabPanel>
          <TabPanel px={0}>
            <UsedCoupons />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default Coupons;
