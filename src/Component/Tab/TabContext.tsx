import React from 'react';
import { Tab, Box, Typography } from '@mui/material';
import { TabContext as MuiTabContext, TabList } from '@mui/lab';
import { TabContextProps } from './type';

export const TabContext: React.FC<TabContextProps> = ({
  tabs,
  value,
  children,
  scrollY = false,
  handleChange,
}) => {
  const tabWithTitle = tabs.find((tab) => tab.value === value)?.title;
  return (
    <MuiTabContext value={value}>
      <Box
        display='flex'
        flexDirection='column'
        height={scrollY ? '500px' : 'auto'}
      >
        <Box
          borderBottom={1}
          borderColor='divider'
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          {tabWithTitle && (
            <Typography>
              {tabs.map((tab) => tab.value === value && tab.title)}
            </Typography>
          )}
          <TabList onChange={handleChange}>
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </TabList>
        </Box>
        <Box flex={1} overflow={scrollY ? 'scroll' : 'visible'}>
          {children}
        </Box>
      </Box>
    </MuiTabContext>
  );
};
