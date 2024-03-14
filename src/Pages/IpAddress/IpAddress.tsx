import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm, FormProvider } from 'react-hook-form';
import { Box, Grid, Modal } from '@mui/material';

import {
  DataTable,
  Card,
  Input,
  Button,
  TabPanel,
  TabContext,
} from 'Component';
import { useAxios } from 'Lib/useAxios';
import { API_URLS } from 'Utils/api-urls';
import { QueryKeys } from 'Utils/query-key';

type GetTableDataQueryKey = [string, number | null];

interface FormData {
  address: string;
  dns: string;
  description: string;
  other: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  maxHeight: '80%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 8,
  p: 4,
};

export const IpAddress: React.FC = () => {
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

  const [currentTablePage, setCurrentTablePage] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [ipTabvalue, setIpTabValue] = useState<string>('1');
  const [natIpTabvalue, setNatIpTabValue] = useState<string>('1');

  const handleIpTabValue = (
    event: React.SyntheticEvent,
    newIpTabValue: string
  ) => {
    event.preventDefault();
    setIpTabValue(newIpTabValue);
  };

  const handleNatIpTabValue = (
    event: React.SyntheticEvent,
    newNatIpValue: string
  ) => {
    event.preventDefault();
    setNatIpTabValue(newNatIpValue);
  };

  const axios = useAxios();

  const methods = useForm<FormData>({
    defaultValues: {
      dns: '',
      address: '',
      description: '',
    },
  });

  const { getValues, handleSubmit } = methods;

  const onSubmit = () => {
    const formData = getValues();
    console.log('123123123', formData);
  };

  // UseQuery hook
  const getTableData = async ({
    queryKey,
  }: {
    queryKey: GetTableDataQueryKey;
  }): Promise<any> => {
    const [, currentPage] = queryKey;
    const data = await axios.get(`${API_URLS.GET_TABLE_DATA}${currentPage}`);
    return data;
  };

  const { data, isError, error } = useQuery({
    queryKey: [QueryKeys.GET_TABLE_DATA, currentTablePage],
    queryFn: () =>
      getTableData({ queryKey: [QueryKeys.GET_TABLE_DATA, currentTablePage] }),
  });

  useEffect(() => {
    if (isError) console.log(error);
  }, [isError, error]);

  return (
    <div>
      <Grid
        container
        justifyContent='center' // Horizontally center the items
        alignItems='center' // Vertically center the items
        style={{ minHeight: '100vh' }} // Set minimum height to occupy full viewport height
        direction='column'
        gap={2}
      >
        <Grid item justifyContent='flex-start' style={{ width: '980px' }}>
          <Button
            color='secondary'
            variant='contained'
            size='large'
            style={{ float: 'right' }}
            onClick={handleOpenModal}
          >
            ADD
          </Button>
        </Grid>
        <Grid item>
          <DataTable rows={rows} columns={columns} />
        </Grid>
      </Grid>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby='scrollable-modal-title'
        aria-describedby='scrollable-modal-description'
      >
        <Box sx={{ ...style, width: 800 }}>
          <TabContext
            tabs={[
              { label: 'New IP', title: 'Add a new IP address', value: '1' },
              {
                label: 'Bulk Create',
                title: 'Bulk Add IP Addresses',
                value: '2',
              },
            ]}
            value={ipTabvalue}
            scrollY
            handleChange={handleIpTabValue}
          >
            <TabPanel value='1'>
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  <Card cardName='IP Address'>
                    <Input
                      name='address'
                      label='Address'
                      style={{ size: 'small', fullWidth: true }}
                    />
                  </Card>
                  <Card cardName='Tenancy'>
                    <Input
                      name='address'
                      label='Address'
                      style={{ size: 'small', fullWidth: true }}
                    />
                  </Card>
                  <Card cardName='NAT IP (Inside)'>
                    <TabContext
                      tabs={[
                        {
                          label: 'By Device',
                          value: '1',
                        },
                        {
                          label: 'By VM',
                          value: '2',
                        },
                        {
                          label: 'By IP',
                          value: '3',
                        },
                      ]}
                      value={natIpTabvalue}
                      handleChange={handleNatIpTabValue}
                    >
                      <TabPanel value='1'>
                        <Input
                          name='description'
                          label='Description'
                          style={{ size: 'small', fullWidth: true }}
                        />
                      </TabPanel>
                      <TabPanel value='2'>
                        <Input
                          name='description'
                          label='Description'
                          style={{ size: 'small', fullWidth: true }}
                        />
                      </TabPanel>
                      <TabPanel value='3'>
                        <Input
                          name='description'
                          label='Description'
                          style={{ size: 'small', fullWidth: true }}
                        />
                      </TabPanel>
                    </TabContext>
                  </Card>
                  <Card cardName='Notes'>
                    <Input
                      name='description'
                      label='Description'
                      style={{ size: 'small', fullWidth: true }}
                    />
                  </Card>
                  <Card cardName='Tags'>
                    <Input
                      name='other'
                      label='Other'
                      style={{ size: 'small', fullWidth: true }}
                    />
                    <input type='submit' />
                  </Card>
                </form>
              </FormProvider>
            </TabPanel>
            <TabPanel value='2'>Bulk Create</TabPanel>
          </TabContext>
        </Box>
      </Modal>
    </div>
  );
};
