import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, Container, Grid, Typography, Button, 
  Chip, Stack, Divider, Paper, CircularProgress, IconButton 
} from '@mui/material';
import { ArrowBack, LocationOn, WhatsApp, Phone, Build, ShoppingBag } from '@mui/icons-material';
import NavBar from '../components/Layout/NavBar';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/listings/${id}`)
      .then(res => res.json())
      .then(data => {
        setItem(data);
        setLoading(false);
      })
      .catch(err => console.error("Error:", err));
  }, [id]);

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <CircularProgress />
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f9fafb' }}>
      <NavBar />
      <Container maxWidth="lg" sx={{ pt: 12, pb: 8 }}>
        <Button 
          startIcon={<ArrowBack />} 
          onClick={() => navigate(-1)} 
          sx={{ mb: 4, textTransform: 'none', fontWeight: 700 }}
        >
          Back to Marketplace
        </Button>

        <Grid container spacing={6}>
          {/* Image Section */}
          <Grid item xs={12} md={7}>
            <Paper elevation={0} sx={{ borderRadius: 4, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
              <img 
                src={item.image_url || "https://via.placeholder.com/600x400"} 
                alt={item.title} 
                style={{ width: '100%', height: 'auto', display: 'block' }} 
              />
            </Paper>
          </Grid>

          {/* Details Section */}
          <Grid item xs={12} md={5}>
            <Stack spacing={3}>
              <Box>
                <Chip 
                  label={item.category} 
                  color="primary" 
                  icon={item.category === 'Service' ? <Build /> : <ShoppingBag />}
                  sx={{ mb: 2, fontWeight: 700 }} 
                />
                <Typography variant="h3" fontWeight={800} gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="h4" color="primary" fontWeight={900}>
                  KES {Number(item.price).toLocaleString()}
                </Typography>
              </Box>

              <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'text.secondary' }}>
                <LocationOn color="action" />
                <Typography variant="body1" fontWeight={600}>{item.location}</Typography>
              </Stack>

              <Divider />

              <Box>
                <Typography variant="h6" fontWeight={700} gutterBottom>Description</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {item.description}
                </Typography>
              </Box>

              <Paper sx={{ p: 3, bgcolor: 'primary.main', color: 'white', borderRadius: 4 }}>
                <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                  Interested in this {item.category.toLowerCase()}?
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
                  Contact the artisan directly to negotiate or arrange delivery.
                </Typography>
                <Stack spacing={2}>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    size="large"
                    startIcon={<WhatsApp />}
                    sx={{ bgcolor: '#25D366', '&:hover': { bgcolor: '#128C7E' }, fontWeight: 700 }}
                    href={`https://wa.me/${item.phone_number || '254700000000'}`} // Default Kenya code
                    target="_blank"
                  >
                    Chat on WhatsApp
                  </Button>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    size="large"
                    startIcon={<Phone />}
                    sx={{ borderColor: 'white', color: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }, fontWeight: 700 }}
                  >
                    Call Artisan
                  </Button>
                </Stack>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductDetail;