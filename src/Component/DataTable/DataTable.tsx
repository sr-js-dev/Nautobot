import React from 'react';
import { DataGrid, GridColDef, GridPaginationModel, GridCallbackDetails } from '@mui/x-data-grid';
interface DataTableProps {
  rows: any[];
  columns: GridColDef[];
  rowCount: number;
  currentTablePage: GridPaginationModel;
  onPageModelChange: (value: GridPaginationModel) => void;
  loading?: boolean;
  pageSizeOptions: number[];
}
 
export const DataTable: React.FC<DataTableProps>= ({ rows, columns, rowCount, currentTablePage, pageSizeOptions, loading, onPageModelChange }) => {

  const paginationModelChange = (model: GridPaginationModel, details: GridCallbackDetails) => {
    onPageModelChange(model);
  };

  return (
    <DataGrid
      loading={loading}
      rows={rows}
      columns={columns}
      paginationMode={'server'}
      rowCount={rowCount}
      paginationModel={currentTablePage}
      checkboxSelection
      pagination
      pageSizeOptions={pageSizeOptions}
      onPaginationModelChange={paginationModelChange}
    />
  );
};