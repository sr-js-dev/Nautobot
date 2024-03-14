import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm, FormProvider } from 'react-hook-form';
import { Box, Grid, Modal, useStepContext, Typography } from '@mui/material';
import { IpAddressColumns } from './Columns';
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
import theme from '../../theme';

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
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export const IpAddress: React.FC = () => {
  const [currentTablePage, setCurrentTablePage] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [ipTabvalue, setIpTabValue] = useState<string>('1');
  const [natIpTabvalue, setNatIpTabValue] = useState<string>('1');
  const [ipAddressData, setIPaddressData] = useState<any>([]);

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
    const ipAddressDataList = data.data.results?.map((item: any, index: number) => {
      let ipAddress: any = {
        id: index,
        ipAddress: item.address ?? '',
        nameSpace: item.natural_slug ? item.natural_slug.split('_')[0] : '',
        type: item.type ?? '',
        status: item.status ? item.status.name ?? 'Null' : 'Null',
        role: item.role ??  '',
        tenant: item.tenant ? item.tenant.name ?? '' : '',
        assigned: item.status.name === 'Active' ? true : false,
        dnsName: item.dns_name ?? '',
        description: item.description ?? ''
      }
      return ipAddress
    });
    return ipAddressDataList;
  };

  const { data, isError, error } = useQuery({
    queryKey: [QueryKeys.GET_TABLE_DATA, currentTablePage],
    queryFn: () =>
      getTableData({ queryKey: [QueryKeys.GET_TABLE_DATA, currentTablePage] }),
  });

  useEffect(() => {
    if (isError) console.log(error);
    if (data) setIPaddressData(data);
  }, [isError, error, data, setIPaddressData]);

  return (
    <div>
      <Grid
        container
        justifyContent='center' // Horizontally center the items
        alignItems='center' // Vertically center the items
        style={{ minHeight: '100vh' }} // Set minimum height to occupy full viewport height
        minHeight='100vh'
        direction='column'
        gap={2}
      >
        <Grid item display={'flex'} flexDirection={'column'}>
          <Box display={'flex'} justifyContent={'end'}>
            <Button
              color='secondary'
              variant='contained'
              size='large'
              onClick={handleOpenModal}
            >
              ADD
            </Button>
          </Box>
          <DataTable rows={ipAddressData} columns={IpAddressColumns} />
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
                      size='small'
                      fullWidth
                    />
                    <input type='submit' />

                    <Input
                      name='newIpNamespace'
                      label='Namespace'
                      option={nameSpace}
                      type={InputElementType.Autocomplete}
                      size='small'
                      fullWidth
                    />
                    <Input
                      name='newIpType'
                      label='Type'
                      option={ipType}
                      type={InputElementType.Select}
                      size='small'
                      fullWidth
                    />
                    <Input
                      name='newIpStatus'
                      label='Status'
                      option={ipstatus}
                      type={InputElementType.Autocomplete}
                      size='small'
                      fullWidth
                    />
                    <Input
                      name='newIpRole'
                      label='Role'
                      option={ipRole}
                      type={InputElementType.Autocomplete}
                      size='small'
                      fullWidth
                    />
                    <Input
                      name='newIpDns'
                      label='DNS'
                      type={InputElementType.TextField}
                      size='small'
                      fullWidth
                    />
                    <Input
                      name='newIpDescription'
                      label='Description'
                      type={InputElementType.TextField}
                      size='small'
                      fullWidth
                    />
                  </Card>
                  <Card cardName='Tenancy'>
                    <Input
                      name='newIpTenantGroup'
                      label='Tenant Group'
                      option={tenantGroup}
                      type={InputElementType.Autocomplete}
                      size='small'
                      fullWidth
                    />
                    <Input
                      name='newIpTenant'
                      label='Tenant'
                      option={tenant}
                      type={InputElementType.Autocomplete}
                      size='small'
                      fullWidth
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
                          size='small'
                          fullWidth
                        />
                        <Input
                          name='newIpRack'
                          label='Rack'
                          option={rack}
                          type={InputElementType.Autocomplete}
                          size='small'
                          fullWidth
                        />
                        <Input
                          name='newIpDevice'
                          label='Device'
                          option={device}
                          type={InputElementType.Autocomplete}
                        />
                        <Input
                          name='newIpDeviceIp'
                          label='IP Address'
                          option={ip}
                          type={InputElementType.Autocomplete}
                          size='small'
                          fullWidth
                        />
                      </TabPanel>
                      <TabPanel value='2'>
                        <Input
                          name='newIpCluster'
                          label='Cluster'
                          option={cluster}
                          type={InputElementType.Autocomplete}
                          size='small'
                          fullWidth
                        />
                        <Input
                          name='newIpVm'
                          label='Virtual Machine'
                          option={vm}
                          type={InputElementType.Autocomplete}
                          size='small'
                          fullWidth
                        />
                        <Input
                          name='newIpVmIp'
                          label='IP Address'
                          option={ip}
                          type={InputElementType.Autocomplete}
                          size='small'
                          fullWidth
                        />
                      </TabPanel>
                      <TabPanel value='3'>
                        <Input
                          name='vrf'
                          label='VRF'
                          option={vrf}
                          type={InputElementType.Autocomplete}
                          size='small'
                          fullWidth
                        />
                        <Input
                          name='ipAddress'
                          label='IP Address'
                          option={ip}
                          type={InputElementType.Autocomplete}
                          size='small'
                          fullWidth
                        />
                      </TabPanel>
                    </TabContext>
                  </Card>
                  <Card cardName='Note'>
                    <Input
                      name='newIpNote'
                      label='Note'
                      type={InputElementType.Textarea}
                      size='small'
                      fullWidth
                    />
                  </Card>
                  <Card cardName='Tags'>
                    <Input
                      name='tags'
                      label='Tags'
                      type={InputElementType.Autocomplete}
                      size='small'
                      fullWidth
                    />
                  </Card>
                </TabPanel>
                <TabPanel value='2'>
                  <Card cardName='IP Address'>
                    <Input
                      name='bulkIpAddress'
                      label='Address'
                      type={InputElementType.TextField}
                      size='small'
                      fullWidth
                    />
                    <Input
                      name='bulkIpNamespace'
                      label='Namespace'
                      option={nameSpace}
                      type={InputElementType.Autocomplete}
                      size='small'
                      fullWidth
                    />
                    <Input
                      name='bulkIpType'
                      label='Type'
                      option={ipType}
                      type={InputElementType.Select}
                      size='small'
                      fullWidth
                    />
                    <Input
                      name='bulkIpStatus'
                      label='Status'
                      option={ipstatus}
                      type={InputElementType.Autocomplete}
                      size='small'
                      fullWidth
                    />
                    <Input
                      name='bulkIpRole'
                      label='Role'
                      option={ipRole}
                      type={InputElementType.Autocomplete}
                      size='small'
                      fullWidth
                    />
                    <Input
                      name='bulkIpDns'
                      label='DNS'
                      type={InputElementType.TextField}
                      size='small'
                      fullWidth
                    />
                    <Input
                      name='bulkIpDescription'
                      label='Description'
                      type={InputElementType.TextField}
                      size='small'
                      fullWidth
                    />
                  </Card>
                  <Card cardName='Tenancy'>
                    <Input
                      name='bulkIpTenantGroup'
                      label='Tenant Group'
                      option={tenantGroup}
                      type={InputElementType.Autocomplete}
                      size='small'
                      fullWidth
                    />
                    <Input
                      name='bulkIpTenant'
                      label='Tenant'
                      option={tenant}
                      type={InputElementType.Autocomplete}
                      size='small'
                      fullWidth
                    />
                  </Card>
                  <Card cardName='Note'>
                    <Input
                      name='bulkIpNote'
                      label='Note'
                      type={InputElementType.Textarea}
                      size='small'
                      fullWidth
                    />
                  </Card>
                  <Card cardName='Tags'>
                    <Input
                      name='bulkIpTags'
                      label='Tags'
                      type={InputElementType.Autocomplete}
                      size='small'
                      fullWidth
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
