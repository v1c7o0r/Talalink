import React, { useState } from 'react';
import { 
  Box, Container, Typography, Tabs, Tab, 
  Paper, Stack, Chip, Button, Divider, Avatar 
} from '@mui/material';
import { Engineering, AssignmentReturn, Timer, CheckCircle, Chat } from '@mui/icons-material';
import SideBar from '../components/Layout/SideBar';

// Mock Data for the Lifecycle
const MOCK_REPAIRS = [
  { id: 1, type: 'incoming', item: 'Solar Inverter', client: 'John Doe', status: 'Pending', date: '2026-02-10' },
  { id: 2, type: 'incoming', item: 'Water Pump', client: 'Jane Smith', status: 'In Progress', date: '2026-02-08' },
  { id: 3, type: 'outgoing', item: 'Laptop Battery', artisan: 'TechFix Thika', status: 'Completed', date: '2026-02-05' },
];

const Maintenance = () => {
  const [tabValue, setTabValue] = useState(0);

  const getStatusColor = (status) => {
    if (status === 'Completed') return 'success';
    if (status === 'In Progress') return 'warning';
    return 'error';
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f7fa' }}>
      <SideBar isLoggedIn={true} />
      
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, mt: 2 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>Maintenance Hub</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Track the technical lifecycle of your repairs and service requests.
          </Typography>

          <Paper sx={{ borderRadius: 4, overflow: 'hidden' }}>
            <Tabs 
              value={tabValue} 
              onChange={(e, val) => setTabValue(val)} 
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab icon={<Engineering />} label="Incoming Tasks" sx={{ fontWeight: 700 }} />
              <Tab icon={<AssignmentReturn />} label="My Outgoing Items" sx={{ fontWeight: 700 }} />
            </Tabs>

            <Box sx={{ p: 3 }}>
              {MOCK_REPAIRS
                .filter(r => tabValue === 0 ? r.type === 'incoming' : r.type === 'outgoing')
                .map((repair) => (
                  <Paper 
                    key={repair.id} 
                    variant="outlined" 
                    sx={{ p: 2, mb: 2, borderRadius: 3, '&:hover': { borderColor: 'primary.main' } }}
                  >
                    <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          {repair.item[0]}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={700}>{repair.item}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {tabValue === 0 ? `From: ${repair.client}` : `Artisan: ${repair.artisan}`} • {repair.date}
                          </Typography>
                        </Box>
                      </Stack>

                      <Stack direction="row" spacing={2} alignItems="center">
                        <Chip 
                          label={repair.status} 
                          color={getStatusColor(repair.status)} 
                          size="small" 
                          icon={repair.status === 'Completed' ? <CheckCircle /> : <Timer />}
                          sx={{ fontWeight: 700 }}
                        />
                        <Divider orientation="vertical" flexItem />
                        <Button startIcon={<Chat />} size="small" variant="text">Discuss</Button>
                        <Button variant="outlined" size="small">Update Status</Button>
                      </Stack>
                    </Stack>
                  </Paper>
                ))}
              
              {/* Empty State */}
              {MOCK_REPAIRS.filter(r => tabValue === 0 ? r.type === 'incoming' : r.type === 'outgoing').length === 0 && (
                <Box textAlign="center" sx={{ py: 10 }}>
                  <Typography color="text.secondary">No active maintenance logs found.</Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Maintenance;