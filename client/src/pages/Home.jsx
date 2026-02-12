import { useState, useEffect } from 'react'; 
import { 
  Box, Container, Grid, Typography, TextField, 
  InputAdornment, Chip, Stack, CircularProgress, Fab, Tooltip 
} from '@mui/material';
import { Search, ErrorOutline, Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Component Imports
import NavBar from '../components/Layout/NavBar'; 
import ListingCard from '../components/Forms/ListingCard'; 

const Home = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Check if user is logged in for FAB visibility
  const token = localStorage.getItem('token');

  // API Configuration - Define the base URL here for easy changes
  const API_BASE_URL = 'http://127.0.0.1:5000'; 

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        // Using the full absolute address to avoid 404/Not Found errors
        const response = await fetch(`${API_BASE_URL}/listings`);
        
        if (!response.ok) {
           throw new Error(`Server responded with ${response.status}: Not Found`);
        }
        
        const data = await response.json();
        setItems(data);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Fetch error:", err);
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
            <Typography variant="h6">Cannot reach the TalaLink Server.</Typography>
            <Typography color="text.secondary">
              Check if your Flask app is running at <strong>{API_BASE_URL}</strong>
            </Typography>
          </Box>
        )}

        {/* Empty State */}
        {!loading && !error && filteredItems.length === 0 && (
          <Typography variant="h6" textAlign="center" color="text.secondary" py={10}>
            No listings found matching your search.
          </Typography>
        )}

        {/* Results Grid - Now using the ListingCard component */}
        <Grid container spacing={3}>
          {!loading && !error && filteredItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <ListingCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Floating Action Button - Only visible if logged in */}
      {token && (
        <Tooltip title="Add New Listing" placement="left">
          <Fab 
            color="primary" 
            aria-label="add" 
            onClick={() => navigate('/create-listing')}
            sx={{ 
              position: 'fixed', 
              bottom: 32, 
              right: 32,
              boxShadow: 4,
              '&:hover': { transform: 'scale(1.1)' },
              transition: '0.2s'
            }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      )}
    </Box>
  );
};

export default Home;