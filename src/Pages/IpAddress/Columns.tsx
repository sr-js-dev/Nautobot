import { Typography, Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
// Function to render the cell content
const renderCellContent = (value: string | undefined, fontSize: string, color: string = '#000000') => {
  return (
    <Typography variant="body1" sx={{ fontSize: fontSize, color: color }}>
      {value !== '' ? value : '—'}
    </Typography>
  );
};

export const IpAddressColumns = [
  {
    field: 'ipAddress',
    headerName: 'IpAddress',
    renderCell: (params: any) => renderCellContent(params.row[params.field], 'medium'),
    width: 150,
  },
  {
    field: 'nameSpace',
    headerName: 'Namespace',
    renderCell: (params: any) => renderCellContent(params.row[params.field], 'medium'),
    width: 180,
  },
  {
    field: 'type',
    headerName: 'Type',
    renderCell: (params: any) => renderCellContent(params.row[params.field], 'medium'),
    width: 80,
  },
  {
    field: 'status',
    headerName: 'Status',
    renderCell: (params: any) => {
      const statusColor = params.row[params.field] === 'Active' ? '#4caf50' : '#111111';
      return (
        <Box sx={{ bgcolor: statusColor, display: 'inline-block', p: 0.5, borderRadius: 1 }}>
          {renderCellContent(params.row[params.field], '12px', '#ffffff')}
        </Box>
      );
    },
    width: 90,
  },
  {
    field: 'role',
    headerName: 'Role',
    renderCell: (params: any) => renderCellContent(params.row[params.field], 'medium'),
    width: 90,
  },
  {
    field: 'tenant',
    headerName: 'Tenant',
    renderCell: (params: any) => renderCellContent(params.row[params.field], 'medium'),
    width: 150,
  },
  {
    field: 'assigned',
    headerName: 'Assigned',
    renderCell: (params: any) => {
      const statusColor = params.row.status === 'Active' ? '#4caf50' : '#111111';
      return (
        params.row[params.field] ? <CheckIcon /> : <ClearIcon />
      );
    },
    // renderCell: (params: any) => renderCellContent(params.row[params.field], 'medium'),
    width: 90,
  },
  {
    field: 'dnsName',
    headerName: 'DNS Name',
    renderCell: (params: any) => renderCellContent(params.row[params.field], 'medium'),
    width: 400,
  },
  {
    field: 'description',
    headerName: 'Description',
    renderCell: (params: any) => renderCellContent(params.row[params.field], 'medium'),
    width: 200,
  },
];