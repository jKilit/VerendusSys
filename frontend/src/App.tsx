import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { CssBaseline, Container, ThemeProvider, createTheme, Box, Typography } from '@mui/material';
import { client } from './services/apolloClient';
import { VehicleList } from './components/VehicleList';
import { VehicleFileUpload } from './components/VehicleFileUpload';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="xl">
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Fordonshantering
            </Typography>
            <VehicleFileUpload />
            <Box sx={{ mt: 4 }}>
              <VehicleList />
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App; 