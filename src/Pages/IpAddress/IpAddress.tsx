import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, QueryClient } from '@tanstack/react-query';
import { useForm, FormProvider } from 'react-hook-form';
import { Box, Grid, Modal } from '@mui/material';
import { IpAddressColumns } from './Columns';
import { Add as AddIcon } from '@mui/icons-material';
import { GridPaginationModel } from '@mui/x-data-grid';
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
import { OptionType } from 'Component/FormElements/type';
import { InputElementType } from 'Utils/input-element-type';

type GetTableDataQueryKey = [string, any | null];

interface FormData {
  newIpAddress: string;
  newIpNamespace: OptionType;
  newIpType: string;
  newIpStatus: OptionType;
  newIpRole: OptionType;
  newIpDns: string;
  newIpDescription: string;
  newIpTenantGroup: OptionType;
  newIpTenant: OptionType;
  newIpLocation: OptionType;
  newIpRack: OptionType;
  newIpDevice: OptionType;
  newIpDeviceIp: OptionType;
  newIpCluster: OptionType;
  newIpVm: OptionType;
  newIpVmIp: OptionType;
  newIpVrf: OptionType;
  ipAddress: OptionType;
  newIpNote: string;
  newIpTags: OptionType;
  bulkIpAddress: string;
  bulkIpNamespace: OptionType;
  bulkIpType: string;
  bulkIpStatus: OptionType;
  bulkIpRole: OptionType;
  bulkIpDns: string;
  bulkIpDescription: string;
  bulkIpTenantGroup: OptionType;
  bulkIpTenant: OptionType;
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
  const [currentTablePage, setCurrentTablePage] = useState<GridPaginationModel>(
    { page: 0, pageSize: 25 }
  );
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [ipTabvalue, setIpTabValue] = useState<string>('1');
  const [natIpTabvalue, setNatIpTabValue] = useState<string>('1');
  const [ipAddressData, setIPaddressData] = useState<any>([]);
  const [rowCount, setRowCount] = useState<number>(0);

  const queryClient = new QueryClient();

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
      newIpNamespace: {},
      newIpType: '',
      newIpStatus: {},
      newIpRole: {},
      newIpDns: '',
      newIpDescription: '',
      newIpTenantGroup: {},
      newIpTenant: {},
      newIpLocation: {},
      newIpRack: {},
      newIpDevice: {},
      newIpDeviceIp: {},
      newIpCluster: {},
      newIpVm: {},
      newIpVmIp: {},
      newIpVrf: {},
      ipAddress: {},
      newIpNote: '',
      newIpTags: {},
      bulkIpAddress: '',
      bulkIpNamespace: {},
      bulkIpType: '',
      bulkIpStatus: {},
      bulkIpRole: {},
      bulkIpDns: '',
      bulkIpDescription: '',
      bulkIpTenantGroup: {},
      bulkIpTenant: {},
      bulkIpNote: '',
      bulkIpTags: '',
    },
  });

  const { getValues, handleSubmit, reset } = methods;

  // UseQuery hook
  const getTableData = async ({
    queryKey,
  }: {
    queryKey: GetTableDataQueryKey;
  }): Promise<any> => {
    const [, currentPage] = queryKey;
    const data = await axios.get(
      `${API_URLS.GET_TABLE_DATA}?limit=${currentPage.pageSize}&depth=${
        currentPage.page + 1
      }`
    );
    setRowCount(data.data.count);

    const ipAddressDataList = data.data.results?.map(
      (item: any, index: number) => {
        let ipAddress: any = {
          id: index,
          ipAddress: item.address ?? '',
          nameSpace: item.natural_slug ? item.natural_slug.split('_')[0] : '',
          type: item.type ?? '',
          status: item.status ? item.status.name ?? 'Null' : 'Null',
          role: item.role ?? '',
          tenant: item.tenant ? item.tenant.name ?? '' : '',
          assigned: item.status.name === 'Active' ? true : false,
          dnsName: item.dns_name ?? '',
          description: item.description ?? '',
        };
        return ipAddress;
      }
    );
    return ipAddressDataList;
  };

  const { data, isError, error, isLoading } = useQuery({
    queryKey: [QueryKeys.GET_TABLE_DATA, currentTablePage],
    queryFn: () =>
      getTableData({ queryKey: [QueryKeys.GET_TABLE_DATA, currentTablePage] }),
  });

  const onSubmit = () => {
    const formData = getValues();
    const params = {
      address: formData.newIpAddress,
      namespace: {
        id: formData.newIpNamespace.value.toString() ?? '',
        object_type: formData.newIpNamespace.label,
        url: 'string',
      },
      type: formData.newIpType,
      dns_name: formData.newIpDns,
      description: formData.newIpDescription,
      status: {
        id: formData.newIpStatus.value,
        object_type: formData.newIpStatus.label,
        url: 'string',
      },
      role: {
        id: formData.newIpRole.value,
        object_type: formData.newIpRole.label,
        url: 'string',
      },
      parent: {
        id: 'string',
        object_type: 'app_label.modelname',
        url: 'string',
      },
      tenant: {
        id: formData.newIpTenant.value,
        object_type: formData.newIpTenant.label,
        url: 'string',
      },
      nat_inside: {
        id: 'string',
        object_type: 'app_label.modelname',
        url: 'string',
      },
      tags: [
        {
          id: formData.newIpTags.value,
          object_type: formData.newIpTags.label,
          url: 'string',
        },
      ],
      custom_fields: {
        additionalProp1: 'string',
        additionalProp2: 'string',
        additionalProp3: 'string',
      },
      relationships: {
        additionalProp1: {
          source: {
            objects: [
              {
                id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                additionalProp1: {},
              },
            ],
          },
          destination: {
            objects: [
              {
                id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                additionalProp1: {},
              },
            ],
          },
          peer: {
            objects: [
              {
                id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                additionalProp1: {},
              },
            ],
          },
        },
        additionalProp2: {
          source: {
            objects: [
              {
                id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                additionalProp1: {},
              },
            ],
          },
          destination: {
            objects: [
              {
                id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                additionalProp1: {},
              },
            ],
          },
          peer: {
            objects: [
              {
                id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                additionalProp1: {},
              },
            ],
          },
        },
        additionalProp3: {
          source: {
            objects: [
              {
                id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                additionalProp1: {},
              },
            ],
          },
          destination: {
            objects: [
              {
                id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                additionalProp1: {},
              },
            ],
          },
          peer: {
            objects: [
              {
                id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                additionalProp1: {},
              },
            ],
          },
        },
      },
    };
    mutation.mutate(params);
  };

  const mutation = useMutation({
    mutationFn: (params: any) => {
      return axios.post(`${API_URLS.ADD_TABLE_DATA}?format=json`, params);
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: [QueryKeys.GET_TABLE_DATA, currentTablePage], type: 'active' });
    },
    onError: (error, variables) => {
      // An error happened!
      console.log(error)
    },
  });

  useEffect(() => {
    if (isError) console.log(error);
    if (data) setIPaddressData(data);
  }, [isError, error, data, setIPaddressData]);

  const handleCloseModal = () => {
    setOpenModal(false);
    reset();
  }

  const handleOpenModal = () => setOpenModal(true);

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
          <Box display={'flex'} justifyContent={'end'} py={2}>
            <Button
              color='primary'
              variant='contained'
              size='large'
              onClick={handleOpenModal}
            >
              <AddIcon />
              Add
            </Button>
          </Box>
          <Box height={600}>
            <DataTable
              loading={isLoading}
              rows={ipAddressData}
              columns={IpAddressColumns}
              rowCount={rowCount}
              onPageModelChange={(pageModel) => setCurrentTablePage(pageModel)}
              currentTablePage={currentTablePage}
              pageSizeOptions={[25, 50, 100, 250, 500, 1000]}
            />
          </Box>
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
                        <Box display={'flex'} flexDirection={'column'} gap={2}>
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
                            size='small'
                            fullWidth
                          />
                          <Input
                            name='newIpDeviceIp'
                            label='IP Address'
                            option={ip}
                            type={InputElementType.Autocomplete}
                            size='small'
                            fullWidth
                          />
                        </Box>
                      </TabPanel>
                      <TabPanel value='2'>
                        <Box display={'flex'} flexDirection={'column'} gap={2}>
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
                        </Box>
                      </TabPanel>
                      <TabPanel value='3'>
                        <Box display={'flex'} flexDirection={'column'} gap={2}>
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
                        </Box>
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
                      label='Address Pattern'
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
                <Box display={'flex'} justifyContent={'end'}>
                  <Button
                    type='submit'
                    color='secondary'
                    variant='contained'
                    size='large'
                  >
                    Submit
                  </Button>
                </Box>
              </form>
            </TabContext>
          </FormProvider>
        </Box>
      </Modal>
    </div>
  );
};
