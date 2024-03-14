import { TabPanel as MuiTabPanel } from '@mui/lab';
import { TabPanelProps } from './type';

export const TabPanel: React.FC<TabPanelProps> = ({ children, value }) => {
  return (
    <MuiTabPanel
      value={value}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        paddingX: 0,
        paddingTop: 2,
        paddingBottom: 0,
      }}
    >
      {children}
    </MuiTabPanel>
  );
};
