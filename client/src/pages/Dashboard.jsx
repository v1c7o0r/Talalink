import React, { useState } from 'react';
import { Box, Container, Grid, Paper, Typography, Button, Stack } from '@mui/material';
import { Add, Inventory, Engineering, BarChart } from '@mui/icons-material';
import SideBar from '../components/Layout/SideBar';
import ListingForms from '../components/Forms/ListingForms';
import LocationPicker from '../components/Map/LocationPicker';

const Dashboard = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: '', description: '' });
  const [coords, setCoords] = useState(null);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f7fa' }}>
      <SideBar isLoggedIn={true} />
      
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, mt: 2 }}>
        <Container maxWidth="lg">
          
          {/* Header Section */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
            <Box>
              <Typography variant="h4" fontWeight={800} color="text.primary">Artisan Console</Typography>
              <Typography variant="body1" color="text.secondary">Manage your Thika-based goods and services</Typography>
            </Box>
            <Button 
              variant="contained" 
              startIcon={<Add />} 
              onClick={() => setShowUpload(!showUpload)}
              sx={{ borderRadius: 2, px: 3 }}
            >
              {showUpload ? "View Analytics" : "New Listing"}
            </Button>
          </Stack>

          {showUpload ? 
                       /* Upload Workflow Section */
                       <Grid container spacing={4}>
                         <Grid item xs={12} md={7}>
                           <Paper sx={{ p: 4, borderRadius: 4 }}>
                             <ListingForms formData={formData} setFormData={setFormData} />
                           </Paper>
                         </Grid>
                         
                         <Grid item xs={12} md={5}>
                           <Paper sx={{ p: 4, borderRadius: 4, height: '100%' }}>
                             <Typography variant="h6" fontWeight={700} gutterBottom>Verify Origin</Typography>
                             <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                               Pin your workshop location in Thika to earn the "Eco-Trace" badge.
                             </Typography>
                             <LocationPicker coords={coords} setCoords={setCoords} />
                             
                             <Button 
                               fullWidth 
                               variant="contained" 
                               size="large" 
                               disabled={!coords || !formData.title}
                               sx={{ mt: 4, py: 2, borderRadius: 3 }}
                             >
                               Publish to Marketplace
                             </Button>
                           </Paper>
                         </Grid>
                       </Grid>
                      : 
                       /* Dashboard Overview Stats */
                       <Grid container spacing={3}>
                         {[
                           { label: 'Active Listings', value: '12', icon: <Inventory />, color: '#196ee6' },
                           { label: 'Pending Repairs', value: '5', icon: <Engineering />, color: '#f59e0b' },
                           { label: 'Total Earnings', value: 'KES 45k', icon: <BarChart />, color: '#10b981' },
                         ].map((stat, i) => (
                           <Grid item xs={12} md={4} key={i}>
                             <Paper sx={{ p: 3, borderRadius: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                               <Box sx={{ bgcolor: `${stat.color}20`, p: 2, borderRadius: 3, color: stat.color }}>
                                 {stat.icon}
                               </Box>
                               <Box>
                                 <Typography variant="caption" color="text.secondary" fontWeight={600}>{stat.label}</Typography>
                                 <Typography variant="h5" fontWeight={800}>{stat.value}</Typography>
                               </Box>
                             </Paper>
                           </Grid>
                         ))}
                       </Grid>}

        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;