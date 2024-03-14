import { Typography, Box, Link } from '@mui/material';
import { Check as CheckIcon, Clear as ClearIcon } from '@mui/icons-material';

enum CellType {
  LINK='link',
  TEXT='text',
}
// Function to render the cell content
const renderCellContent = (type: CellType, value: string | undefined, fontSize: string, color: string = '#000000') => {
  if(type===CellType.LINK)
    return (
      <Link textTransform={'capitalize'} href="#" underline="hover" color="primary">
        {value}
      </Link>
    );
  else
    return (
      <Typography textTransform={'capitalize'} variant="body1" sx={{ fontSize: fontSize, color: color }}>
        {value !== '' ? value : '—'}
      </Typography>
    );
};

export const IpAddressColumns = [
  {
    field: 'ipAddress',
    headerName: 'IpAddress',
    renderCell: (params: any) => renderCellContent(CellType.LINK, params.row[params.field], 'medium'),
    width: 150,
  },
  {
    field: 'nameSpace',
    headerName: 'Namespace',
    renderCell: (params: any) => renderCellContent(CellType.LINK, params.row[params.field], 'medium'),
    width: 180,
  },
  {
    field: 'type',
    headerName: 'Type',
    renderCell: (params: any) => renderCellContent(CellType.TEXT, params.row[params.field], 'medium'),
    width: 80,
  },
  {
    field: 'status',
    headerName: 'Status',
    renderCell: (params: any) => {
      const statusColor = params.row[params.field] === 'Active' ? '#4caf50' : '#111111';
      return (
        <Box sx={{ bgcolor: statusColor, display: 'inline-block', p: 0.5, borderRadius: 1 }}>
          {renderCellContent(CellType.TEXT, params.row[params.field], '12px', '#ffffff')}
        </Box>
      );
    },
    width: 90,
  },
  {
    field: 'role',
    headerName: 'Role',
    renderCell: (params: any) => renderCellContent(CellType.TEXT, params.row[params.field], 'medium'),
    width: 90,
  },
  {
    field: 'tenant',
    headerName: 'Tenant',
    renderCell: (params: any) => renderCellContent(CellType.LINK, params.row[params.field], 'medium'),
    width: 150,
  },
  {
    field: 'assigned',
    headerName: 'Assigned',
    renderCell: (params: any) => {
      const statusColor = params.row.status === 'Active' ? '#169F32' : '#dc3545';
      return (
        params.row[params.field] ? <CheckIcon sx={{ fill: statusColor }}/> : <ClearIcon sx={{ fill: statusColor }} />
      );
    },
    width: 90,
  },
  {
    field: 'dnsName',
    headerName: 'DNS Name',
    renderCell: (params: any) => renderCellContent(CellType.TEXT, params.row[params.field], 'medium'),
    width: 400,
  },
  {
    field: 'description',
    headerName: 'Description',
    renderCell: (params: any) => renderCellContent(CellType.TEXT, params.row[params.field], 'medium'),
    width: 200,
  },
];