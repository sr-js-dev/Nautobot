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
        sx={{
          display: 'flex',
          flexDirection: 'column',
          ...(scrollY && { height: '500px' }),
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
        <Box sx={{ flex: 1, ...(scrollY && { overflowY: 'scroll' }) }}>
          {children}
        </Box>
      </Box>
    </MuiTabContext>
  );
};
