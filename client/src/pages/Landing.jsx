import { Box, Container, Typography, Button, Stack, Grid, Paper, Link } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Explore, PersonAddAlt1, Login as LoginIcon } from '@mui/icons-material'; 
import NavBar from '../components/Layout/NavBar';
import Footer from '../components/Layout/Footer';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar />
      
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: 15, pb: 10, flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <Typography variant="h2" fontWeight={900} gutterBottom sx={{ lineHeight: 1.1 }}>
              Verifying Every <span style={{ color: '#196ee6' }}>Origin.</span> <br />
              Tracking Every <span style={{ color: '#196ee6' }}>Fix.</span>
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: '500px' }}>
              The digital hub for Thika’s artisans. Buy local goods with GPS-verified origin and manage technical repairs through a transparent lifecycle.
            </Typography>
            
            <Stack direction="column" spacing={2} sx={{ alignItems: 'flex-start' }}>
              <Stack direction="row" spacing={2}>
                <Button 
                  variant="contained" 
                  size="large" 
                  onClick={() => navigate('/home')} 
                  startIcon={<Explore />}
                  sx={{ px: 4, py: 1.5, borderRadius: '8px', fontWeight: 700 }}
                >
                  Explore Goods
                </Button>
                
                <Button 
                  variant="outlined" 
                  size="large" 
                  onClick={() => navigate('/signup')} 
                  startIcon={<PersonAddAlt1 />} 
                  sx={{ 
                    px: 4, 
                    py: 1.5, 
                    borderRadius: '8px', 
                    fontWeight: 700,
                    borderWidth: 2,
                    '&:hover': { borderWidth: 2 }
                  }}
                >
                  Get Started
                </Button>
              </Stack>

              {/* Returning User Quick Link */}
              <Box sx={{ ml: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Returning member?{' '}
                  <Link 
                    component={RouterLink} 
                    to="/login" 
                    sx={{ 
                      color: 'primary.main', 
                      fontWeight: 700, 
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.5,
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    <LoginIcon sx={{ fontSize: 16 }} /> Log In here
                  </Link>
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        {/* Features Row */}
        <Grid container spacing={4} sx={{ mt: 10 }}>
          {[
            { title: "Eco-Trace Origin", desc: "Every product is geotagged to Thika districts to ensure 100% local authenticity." },
            { title: "Technical Lifecycle", desc: "Track maintenance from 'Request' to 'Fixed' with digital service logs." },
            { title: "Secure Chat", desc: "Direct communication between clients and verified technical experts." }
          ].map((feature, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Paper 
                sx={{ 
                  p: 4, 
                  height: '100%', 
                  borderRadius: 4, 
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider'
                }} 
                elevation={0}
              >
                <Typography variant="h6" fontWeight={800} gutterBottom color="primary">
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
};

export default Landing;