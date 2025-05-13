import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Snackbar, Alert } from '@mui/material';
import { UPLOAD_VEHICLE_FILE } from '../services/queries';

export const VehicleFileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadVehiclesFile, { loading }] = useMutation(UPLOAD_VEHICLE_FILE);
  const [snackbar, setSnackbar] = useState<{ open: boolean, message: string, severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      const result = await uploadVehiclesFile({
        variables: { filePath: file.name }
      });

      setSnackbar({
        open: true,
        message: `Successfully updated vehicles. Added: ${result.data.updateVehicles.added}, Updated: ${result.data.updateVehicles.updated}`,
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Error uploading file: ${error instanceof Error ? error.message : 'Unknown error'}`,
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <input
        type="file"
        accept=".txt"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="vehicle-file-upload"
      />
      <label htmlFor="vehicle-file-upload">
        <Button
          variant="contained"
          component="span"
          disabled={loading}
        >
          Select File
        </Button>
      </label>
      {file && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={loading}
          style={{ marginLeft: '1rem' }}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </Button>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};