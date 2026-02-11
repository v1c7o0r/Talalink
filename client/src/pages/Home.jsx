import { useState, useEffect } from 'react'; 
import { 
  Box, Container, Grid, Typography, TextField, 
  InputAdornment, Chip, Stack, Card, CardMedia, 
  CardContent, CardActions, Button, CircularProgress 
} from '@mui/material';
import { Search, LocationOn, Build, ShoppingBag, ErrorOutline } from '@mui/icons-material';

// Keeping your exact naming convention and path
import NavBar from '../components/Layout/NavBar'; 

const Home = () => {
  const [filter, setFilter] = useState('All');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch data from Flask API
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/listings');
        if (!response.ok) throw new Error('Failed to fetch marketplace data');
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Filter logic: Handles both Category chips and Search bar
  const filteredItems = items.filter(item => {
    const matchesFilter = filter === 'All' || item.category === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

        {/* Loading State */}
        {loading && (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
            <CircularProgress color="primary" />
          </Box>
        )}

        {/* Error State */}
        {error && (
          <Box textAlign="center" py={10}>
            <ErrorOutline sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
            <Typography variant="h6">TalaLink is having trouble connecting.</Typography>
            <Typography color="text.secondary">Make sure your Flask server is running at port 5000.</Typography>
          </Box>
        )}

        {/* Empty State */}
        {!loading && !error && filteredItems.length === 0 && (
          <Typography variant="h6" textAlign="center" color="text.secondary" py={10}>
            No listings found matching your search.
          </Typography>
        )}

        {/* Results Grid */}
        <Grid container spacing={3}>
          {!loading && !error && filteredItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{ 
                borderRadius: 4, 
                bgcolor: 'background.paper', 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-5px)' }
              }}>
                <CardMedia
                  component="img"
                  height="200"
                  // Default image if none provided by backend
                  image={item.image_url || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=60"}
                  alt={item.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                    <Chip 
                      icon={item.category === 'Service' ? <Build sx={{ fontSize: '14px !important' }}/> : <ShoppingBag sx={{ fontSize: '14px !important' }}/>} 
                      label={item.category} 
                      size="small" 
                      color="primary" 
                      variant="outlined" 
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationOn sx={{ fontSize: 16, mr: 0.5 }} /> {item.location || 'Thika'}
                    </Typography>
                  </Stack>
                  <Typography variant="h6" fontWeight={700} noWrap>
                    {item.title}
                  </Typography>
                  <Typography variant="h5" color="primary" fontWeight={800} sx={{ mt: 1 }}>
                    KES {item.price.toLocaleString()}
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