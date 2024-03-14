import { TabPanel as MuiTabPanel } from '@mui/lab';
import { TabPanelProps } from './type';

export const TabPanel: React.FC<TabPanelProps> = ({ children, value }) => {
  return (
    <MuiTabPanel value={value} sx={{ paddingX: 0 }}>
      {children}
    </MuiTabPanel>
  );
};