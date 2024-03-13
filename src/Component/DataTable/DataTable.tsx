import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface DataTableProps {
  rows: any[];
  columns: GridColDef[];
}

export const DataTable: React.FC<DataTableProps>= ({ rows, columns }) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      checkboxSelection
    />
  );
};