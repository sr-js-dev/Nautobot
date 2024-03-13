import React from 'react';
import { Grid, Paper } from '@mui/material';
import { DataTable } from '../../Component'

export const IpAddress: React.FC= () => {
  // Sample data
const rows = [
  { id: 1, ipAddress: 'John', lastName: 'Doe', age: 30 },
  { id: 2, ipAddress: 'Jane', lastName: 'Smith', age: 25 },
  { id: 3, ipAddress: 'Bob', lastName: 'Johnson', age: 35 },
];
// Columns definition
const columns = [
  { field: 'ipAddress', headerName: 'IpAddress', width: 90 },
  { field: 'nameSpace', headerName: 'Namespace', width: 150 },
  { field: 'type', headerName: 'Type', width: 150 },
  { field: 'status', headerName: 'Status', width: 90 },
  { field: 'role', headerName: 'Role', width: 90 },
  { field: 'tenant', headerName: 'Tenant', width: 90 },
  { field: 'assigned', headerName: 'Assigned', width: 90 },
  { field: 'dnsName', headerName: 'DNS Name', width: 90 },
  { field: 'description', headerName: 'Description', width: 90 },
];
  return (
    <Grid
      container
      justifyContent="center"  // Horizontally center the items
      alignItems="center"      // Vertically center the items
      style={{ minHeight: '100vh' }} // Set minimum height to occupy full viewport height
    >
      <Grid item>
        <DataTable rows={rows} columns={columns} />
      </Grid>
    </Grid>
  )
};