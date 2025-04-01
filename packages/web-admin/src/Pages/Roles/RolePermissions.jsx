/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Checkbox, Text, Grid, Box, Input } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import useAllPermissions from '../../Hooks/UseAllPermissions';

// @ts-ignore
const RolePermissions = ({ selectedPermissions, setSelectedPermissions }) => {
  const { t } = useTranslation();
  const { allPermissionsData } = useAllPermissions();

  const [searchQuery, setSearchQuery] = useState('');

  // @ts-ignore
  const handleCheckboxChange = (permissionId) => {
    // @ts-ignore
    setSelectedPermissions((prevSelected) =>
      prevSelected.includes(permissionId)
        // @ts-ignore
        ? prevSelected.filter((id) => id !== permissionId)
        : [...prevSelected, permissionId]
    );
  };
  
  // @ts-ignore
  const filteredPermissions = allPermissionsData?.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      {/* Search Box */}
      <Input placeholder={t('roles.permissions.search.placeholder')} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} mb={4} />

      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <Checkbox size={'md'} fontSize={'sm'} isChecked={selectedPermissions?.length === allPermissionsData?.length} 
          onChange={() => {
            // @ts-ignore
            let permissionIDs = allPermissionsData.map((item) => item.id);
            if (selectedPermissions.length === allPermissionsData.length) {
              setSelectedPermissions([]);
            } else {
              setSelectedPermissions(permissionIDs);
            }
          }}>
          <Text
            fontSize={'xs'}
            fontWeight={600}>
            {t('roles.permissions.all')}
          </Text>
        </Checkbox>
        {/* @ts-ignore */}
        {filteredPermissions?.map((item) => (
          <Checkbox
            size={'md'}
            fontSize={'sm'}
            key={item.id}
            isChecked={selectedPermissions.includes(item.id)}
            onChange={() => handleCheckboxChange(item.id)}>
            <Text fontSize={'xs'} fontWeight={600}>
              {item.name}
            </Text>
          </Checkbox>
        ))}
      </Grid>
    </Box>
  );
};

export default RolePermissions;
