import { TabPanel as MuiTabPanel } from '@mui/lab';
import { TabPanelProps } from './type';

export const TabPanel: React.FC<TabPanelProps> = ({ children, value }) => {
  return (
    <MuiTabPanel value={value} style={{ paddingLeft: '0', paddingRight: '0' }}>
      {children}
    </MuiTabPanel>
  );
};
