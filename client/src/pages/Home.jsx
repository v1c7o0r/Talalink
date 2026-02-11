import { useState } from 'react'; // Added this so 'setFilter' works
import { 
  Box, Container, Grid, Typography, TextField, 
  InputAdornment, Chip, Stack, Card, CardMedia, 
  CardContent, CardActions, Button 
} from '@mui/material';
import { Search, LocationOn, Build, ShoppingBag } from '@mui/icons-material';

// Keeping your exact naming convention and path
import NavBar from '../components/Layout/NavBar'; 

const MOCK_ITEMS = [
  { id: 1, title: "Solar Inverter Repair", price: "2,500", category: "Service", location: "Thika Sec 9", image: "https://images.unsplash.com/photo-1509391366360-fe5bb6523e5c?auto=format&fit=crop&w=500&q=60" },
  { id: 2, title: "Handmade Leather Boots", price: "4,200", category: "Product", location: "Makongeni", image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=500&q=60" },
  { id: 3, title: "Custom Wood Coffee Table", price: "12,000", category: "Product", location: "Nanyuki Rd", image: "https://images.unsplash.com/photo-1554001535-8510034a7a31?auto=format&fit=crop&w=500&q=60" },
  { id: 4, title: "Laptop Motherboard Fix", price: "3,000", category: "Service", location: "Thika Town", image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=500&q=60" },
];

const Home = () => { // Keeping your exact naming convention and path
  const [filter, setFilter] = useState('All');

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <NavBar />
      
      <Container maxWidth="lg" sx={{ pt: 12, pb: 8 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Marketplace
          </Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
            <TextField 
              fullWidth 
              placeholder="Search for technical goods or services in Thika..."
              InputProps={{
                startAdornment: <InputAdornment position="start"><Search color="primary"/></InputAdornment>,
              }}
              sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
            />
            <Stack direction="row" spacing={1}>
              {['All', 'Service', 'Product'].map((cat) => (
                <Chip 
                  key={cat} 
                  label={cat} 
                  clickable 
                  color={filter === cat ? 'primary' : 'default'}
                  onClick={() => setFilter(cat)}
                  sx={{ fontWeight: 700, px: 2 }}
                />
              ))}
            </Stack>
          </Stack>
        </Box>

        <Grid container spacing={3}>
          {MOCK_ITEMS.filter(item => filter === 'All' || item.category === filter).map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{ 
                borderRadius: 4, 
                bgcolor: 'background.paper', 
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-5px)' }
              }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.title}
                />
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                    <Chip 
                      icon={item.category === 'Service' ? <Build sx={{ fontSize: '14px !important' }}/> : <ShoppingBag sx={{ fontSize: '14px !important' }}/>} 
                      label={item.category} 
                      size="small" 
                      color="primary" 
                      variant="outlined" 
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationOn sx={{ fontSize: 16, mr: 0.5 }} /> {item.location}
                    </Typography>
                  </Stack>
                  <Typography variant="h6" fontWeight={700} noWrap>
                    {item.title}
                  </Typography>
                  <Typography variant="h5" color="primary" fontWeight={800} sx={{ mt: 1 }}>
                    KES {item.price}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button variant="contained" fullWidth sx={{ borderRadius: 2, fontWeight: 700 }}>
                    {item.category === 'Service' ? 'Request Service' : 'View Details'}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;