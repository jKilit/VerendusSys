import React from 'react';
import { useQuery } from '@apollo/client';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { format, parse } from 'date-fns';
import { GET_VEHICLES } from '../services/queries';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

const columns: GridColDef[] = [
  { field: 'identity', headerName: 'Identity', width: 130 },
  { field: 'chassisNumber', headerName: 'Chassis Number', width: 200 },
  { field: 'modelYear', headerName: 'Model Year', width: 100 },
  { field: 'color', headerName: 'Color', width: 120 },
  {
    field: 'lastInspection',
    headerName: 'Last Inspection',
    width: 150,
    valueFormatter: (params) => {
      const date = params.value as string;
      if (!date) return '';
      try {
        const parsedDate = parse(date, 'yyyyMMdd', new Date());
        return format(parsedDate, 'yyyy-MM-dd');
      } catch (error) {
        return date;
      }
    },
  },
  {
    field: 'nextInspection',
    headerName: 'Next Inspection',
    width: 150,
    valueFormatter: (params) => {
      const date = params.value as string;
      if (!date) return '';
      try {
        const parsedDate = parse(date, 'yyyyMMdd', new Date());
        return format(parsedDate, 'yyyy-MM-dd');
      } catch (error) {
        return date;
      }
    },
  },
  {
    field: 'lastRegistration',
    headerName: 'Last Registration',
    width: 150,
    valueFormatter: (params) => {
      const date = params.value as string;
      if (!date) return '';
      try {
        const parsedDate = parse(date, 'yyyyMMdd', new Date());
        return format(parsedDate, 'yyyy-MM-dd');
      } catch (error) {
        return date;
      }
    },
  },
];

export const VehicleList: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(GET_VEHICLES);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Typography color="error">Error loading vehicles: {error.message}</Typography>
      </Box>
    );
  }

  const vehicles = data?.vehicles || [];

  return (
    <Box sx={{ height: 600, width: '100%', p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">
          Vehicle Inspection List
        </Typography>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={() => refetch()}
          disabled={loading}
        >
          Uppdatera lista
        </Button>
      </Box>
      <DataGrid
        rows={vehicles}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
        getRowId={(row) => row.chassisNumber}
      />
    </Box>
  );
}; 