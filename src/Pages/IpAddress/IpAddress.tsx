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
import {
  cluster,
  device,
  ip,
  ipRole,
  ipType,
  ipstatus,
  location,
  nameSpace,
  natIpTabs,
  pageTabs,
  rack,
  tenant,
  tenantGroup,
  vm,
  vrf,
} from './const';
import { useAxios } from 'Lib/useAxios';
import { API_URLS } from 'Utils/api-urls';
import { QueryKeys } from 'Utils/query-key';
import { InputElementType } from 'Utils/input-element-type';

type GetTableDataQueryKey = [string, number | null];

interface FormData {
  newIpAddress: string;
  newIpNamespace: string;
  newIpType: string;
  newIpStatus: string;
  newIpRole: string;
  newIpDns: string;
  newIpDescription: string;
  newIpTenantGroup: string;
  newIpTenant: string;
  newIpLocation: string;
  newIpRack: string;
  newIpDevice: string;
  newIpDeviceIp: string;
  newIpCluster: string;
  newIpVm: string;
  newIpVmIp: string;
  newIpVrf: string;
  newIp: string;
  newIpNote: string;
  newIpTags: string;
  bulkIpAddress: string;
  bulkIpNamespace: string;
  bulkIpType: string;
  bulkIpStatus: string;
  bulkIpRole: string;
  bulkIpDns: string;
  bulkIpDescription: string;
  bulkIpTenantGroup: string;
  bulkIpTenant: string;
  bulkIpNote: string;
  bulkIpTags: string;
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
      newIpAddress: '',
      newIpNamespace: '',
      newIpType: '',
      newIpStatus: '',
      newIpRole: '',
      newIpDns: '',
      newIpDescription: '',
      newIpTenantGroup: '',
      newIpTenant: '',
      newIpLocation: '',
      newIpRack: '',
      newIpDevice: '',
      newIpDeviceIp: '',
      newIpCluster: '',
      newIpVm: '',
      newIpVmIp: '',
      newIpVrf: '',
      newIp: '',
      newIpNote: '',
      newIpTags: '',
      bulkIpAddress: '',
      bulkIpNamespace: '',
      bulkIpType: '',
      bulkIpStatus: '',
      bulkIpRole: '',
      bulkIpDns: '',
      bulkIpDescription: '',
      bulkIpTenantGroup: '',
      bulkIpTenant: '',
      bulkIpNote: '',
      bulkIpTags: '',
    },
  });

  const { getValues, handleSubmit } = methods;

  const onSubmit = () => {
    const formData = getValues();
    console.log('formData', formData);
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

  // const { data, isError, error } = useQuery({
  //   queryKey: [QueryKeys.GET_TABLE_DATA, currentTablePage],
  //   queryFn: () =>
  //     getTableData({ queryKey: [QueryKeys.GET_TABLE_DATA, currentTablePage] }),
  // });

  // useEffect(() => {
  //   if (isError) console.log(error);
  // }, [isError, error]);

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
          <FormProvider {...methods}>
            <TabContext
              tabs={pageTabs}
              value={ipTabvalue}
              scrollY
              handleChange={handleIpTabValue}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <TabPanel value='1'>
                  <Card cardName='IP Address'>
                    <Input
                      name='newIpAddress'
                      label='Address'
                      type={InputElementType.TextField}
                      style={{ size: 'small', fullWidth: true }}
                    />
                    <input type='submit' />

                    <Input
                      name='newIpNamespace'
                      label='Namespace'
                      option={nameSpace}
                      type={InputElementType.Autocomplete}
                      style={{ size: 'small', fullWidth: true }}
                    />
                    <Input
                      name='newIpType'
                      label='Type'
                      option={ipType}
                      type={InputElementType.Select}
                      style={{ size: 'small', fullWidth: true }}
                    />
                    <Input
                      name='newIpStatus'
                      label='Status'
                      option={ipstatus}
                      type={InputElementType.Autocomplete}
                      style={{ size: 'small', fullWidth: true }}
                    />
                    <Input
                      name='newIpRole'
                      label='Role'
                      option={ipRole}
                      type={InputElementType.Autocomplete}
                      style={{ size: 'small', fullWidth: true }}
                    />
                    <Input
                      name='newIpDns'
                      label='DNS'
                      type={InputElementType.TextField}
                      style={{ size: 'small', fullWidth: true }}
                    />
                    <Input
                      name='newIpDescription'
                      label='Description'
                      type={InputElementType.TextField}
                      style={{ size: 'small', fullWidth: true }}
                    />
                  </Card>
                  <Card cardName='Tenancy'>
                    <Input
                      name='newIpTenantGroup'
                      label='Tenant Group'
                      option={tenantGroup}
                      type={InputElementType.Autocomplete}
                      style={{ size: 'small', fullWidth: true }}
                    />
                    <Input
                      name='newIpTenant'
                      label='Tenant'
                      option={tenant}
                      type={InputElementType.Autocomplete}
                      style={{ size: 'small', fullWidth: true }}
                    />
                  </Card>
                  <Card cardName='NAT IP (Inside)'>
                    <TabContext
                      tabs={natIpTabs}
                      value={natIpTabvalue}
                      handleChange={handleNatIpTabValue}
                    >
                      <TabPanel value='1'>
                        <Input
                          name='newIpLocation'
                          label='Location'
                          option={location}
                          type={InputElementType.Autocomplete}
                          style={{ size: 'small', fullWidth: true }}
                        />
                        <Input
                          name='newIpRack'
                          label='Rack'
                          option={rack}
                          type={InputElementType.Autocomplete}
                          style={{ size: 'small', fullWidth: true }}
                        />
                        <Input
                          name='newIpDevice'
                          label='Device'
                          option={device}
                          type={InputElementType.Autocomplete}
                          style={{ size: 'small', fullWidth: true }}
                        />
                        <Input
                          name='newIpDeviceIp'
                          label='IP Address'
                          option={ip}
                          type={InputElementType.Autocomplete}
                          style={{ size: 'small', fullWidth: true }}
                        />
                      </TabPanel>
                      <TabPanel value='2'>
                        <Input
                          name='newIpCluster'
                          label='Cluster'
                          option={cluster}
                          type={InputElementType.Autocomplete}
                          style={{ size: 'small', fullWidth: true }}
                        />
                        <Input
                          name='newIpVm'
                          label='Virtual Machine'
                          option={vm}
                          type={InputElementType.Autocomplete}
                          style={{ size: 'small', fullWidth: true }}
                        />
                        <Input
                          name='newIpVmIp'
                          label='IP Address'
                          option={ip}
                          type={InputElementType.Autocomplete}
                          style={{ size: 'small', fullWidth: true }}
                        />
                      </TabPanel>
                      <TabPanel value='3'>
                        <Input
                          name='vrf'
                          label='VRF'
                          option={vrf}
                          type={InputElementType.Autocomplete}
                          style={{ size: 'small', fullWidth: true }}
                        />
                        <Input
                          name='ipAddress'
                          label='IP Address'
                          option={ip}
                          type={InputElementType.Autocomplete}
                          style={{ size: 'small', fullWidth: true }}
                        />
                      </TabPanel>
                    </TabContext>
                  </Card>
                  <Card cardName='Note'>
                    <Input
                      name='newIpNote'
                      label='Note'
                      type={InputElementType.Textarea}
                      style={{ size: 'small', fullWidth: true }}
                    />
                  </Card>
                  <Card cardName='Tags'>
                    <Input
                      name='tags'
                      label='Tags'
                      type={InputElementType.Autocomplete}
                      style={{ size: 'small', fullWidth: true }}
                    />
                  </Card>
                </TabPanel>
                <TabPanel value='2'>
                  <Card cardName='IP Address'>
                    <Input
                      name='bulkIpAddress'
                      label='Address'
                      type={InputElementType.TextField}
                      style={{ size: 'small', fullWidth: true }}
                    />
                    <Input
                      name='bulkIpNamespace'
                      label='Namespace'
                      option={nameSpace}
                      type={InputElementType.Autocomplete}
                      style={{ size: 'small', fullWidth: true }}
                    />
                    <Input
                      name='bulkIpType'
                      label='Type'
                      option={ipType}
                      type={InputElementType.Select}
                      style={{ size: 'small', fullWidth: true }}
                    />
                    <Input
                      name='bulkIpStatus'
                      label='Status'
                      option={ipstatus}
                      type={InputElementType.Autocomplete}
                      style={{ size: 'small', fullWidth: true }}
                    />
                    <Input
                      name='bulkIpRole'
                      label='Role'
                      option={ipRole}
                      type={InputElementType.Autocomplete}
                      style={{ size: 'small', fullWidth: true }}
                    />
                    <Input
                      name='bulkIpDns'
                      label='DNS'
                      type={InputElementType.TextField}
                      style={{ size: 'small', fullWidth: true }}
                    />
                    <Input
                      name='bulkIpDescription'
                      label='Description'
                      type={InputElementType.TextField}
                      style={{ size: 'small', fullWidth: true }}
                    />
                  </Card>
                  <Card cardName='Tenancy'>
                    <Input
                      name='bulkIpTenantGroup'
                      label='Tenant Group'
                      option={tenantGroup}
                      type={InputElementType.Autocomplete}
                      style={{ size: 'small', fullWidth: true }}
                    />
                    <Input
                      name='bulkIpTenant'
                      label='Tenant'
                      option={tenant}
                      type={InputElementType.Autocomplete}
                      style={{ size: 'small', fullWidth: true }}
                    />
                  </Card>
                  <Card cardName='Note'>
                    <Input
                      name='bulkIpNote'
                      label='Note'
                      type={InputElementType.Textarea}
                      style={{ size: 'small', fullWidth: true }}
                    />
                  </Card>
                  <Card cardName='Tags'>
                    <Input
                      name='bulkIpTags'
                      label='Tags'
                      type={InputElementType.Autocomplete}
                      style={{ size: 'small', fullWidth: true }}
                    />
                  </Card>
                </TabPanel>
              </form>
            </TabContext>
          </FormProvider>
        </Box>
      </Modal>
    </div>
  );
};
