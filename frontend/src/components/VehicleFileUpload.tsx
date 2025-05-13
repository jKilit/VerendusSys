import React, { useState } from 'react';
import { Button, Alert, CircularProgress, Box, Typography, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

/**
 * Component for handling vehicle data file uploads. Provides UI for file selection
 * and upload functionality, with error handling and success notifications.
 */

export const VehicleFileUpload: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ added: number; updated: number } | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string>('');

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      
      // Read file content
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setFileContent(content);
      };
      reader.readAsText(file);
      
      setSelectedFile(file);
    }
  };

  const handleUpdate = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ett fel uppstod vid uppladdningen');
      }

      const data = await response.json();
      setResult(data);
      setSelectedFile(null);
      setFileContent('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ett fel uppstod vid uppladdningen');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Uppdatera fordon
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Välj en .txt fil med fordonsdata för att uppdatera registret
      </Typography>
      
      <input
        accept=".txt"
        style={{ display: 'none' }}
        id="vehicle-file-upload"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="vehicle-file-upload">
        <Button
          variant="contained"
          component="span"
          startIcon={<CloudUploadIcon />}
          disabled={loading}
        >
          Välj fil
        </Button>
      </label>

      {selectedFile && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" gutterBottom>
            Vald fil: {selectedFile.name}
          </Typography>
          
          {fileContent && (
            <Paper 
              elevation={2} 
              sx={{ 
                p: 2, 
                mt: 2, 
                mb: 2, 
                maxHeight: '200px', 
                overflow: 'auto',
                backgroundColor: '#f5f5f5'
              }}
            >
              <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
                {fileContent.split('\n').slice(0, 5).join('\n')}
                {fileContent.split('\n').length > 5 ? '\n...' : ''}
              </Typography>
            </Paper>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            disabled={loading}
            sx={{ mt: 1 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Uppdatera fordon'}
          </Button>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {result && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Fordonen har uppdaterats! {result.added} nya fordon tillagda och {result.updated} fordon uppdaterade.
        </Alert>
      )}
    </Box>
  );
}; 