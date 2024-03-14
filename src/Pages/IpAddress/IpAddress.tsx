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
import { useAxios } from 'Lib/useAxios';
import { API_URLS } from 'Utils/api-urls';
import { QueryKeys } from 'Utils/query-key';
import theme from '../../theme';

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
        <Box sx={{ ...style, width: 800 }} >
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
                  // className={classes.form}
                >
                  <Card cardName='IP Address'>
                    <Input
                      name='address'
                      label='Address'
                      size='small'
                      fullWidth
                    />
                  </Card>
                  <Card cardName='Tenancy'>
                    <Input
                      name='address'
                      label='Address'
                      size='small'
                      fullWidth
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
                          size='small'
                          fullWidth
                        />
                      </TabPanel>
                      <TabPanel value='2'>
                        <Input
                          name='description'
                          label='Description'
                          size='small'
                          fullWidth
                        />
                      </TabPanel>
                      <TabPanel value='3'>
                        <Input
                          name='description'
                          label='Description'
                          size='small'
                          fullWidth
                        />
                      </TabPanel>
                    </TabContext>
                  </Card>
                  <Card cardName='Notes'>
                    <Input
                      name='description'
                      label='Description'
                      size='small'
                      fullWidth
                    />
                  </Card>
                  <Card cardName='Tags'>
                    <Input
                      name='other'
                      label='Other'
                      size='small'
                      fullWidth
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
