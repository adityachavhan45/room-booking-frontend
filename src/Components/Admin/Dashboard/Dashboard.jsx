import React, { useState } from 'react';
import {
  Box,
  Tab,
  Tabs,
  Container,
  Typography,
} from '@mui/material';
import AdminUsers from '../AdminUsers/AdminUsers';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Dashboard = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Overview" />
          <Tab label="Admin Users" />
          {/* Add more tabs as needed */}
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Typography variant="h6">Welcome to the Admin Dashboard</Typography>
        {/* Add overview content */}
      </TabPanel>
      
      <TabPanel value={value} index={1}>
        <AdminUsers />
      </TabPanel>
    </Container>
  );
};

export default Dashboard;
