import React from 'react';
import { 
  Box, Container, Grid, Typography, 
  Link, Stack, IconButton, Divider 
} from '@mui/material';
import { 
  Facebook, Twitter, LinkedIn, Instagram, 
  GitHub, Business, Email, Phone 
} from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box sx={{ bgcolor: '#0a192f', color: 'white', pt: 8, pb: 4, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 4 }}>
          
          {/* Brand Column */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight={900} color="primary" sx={{ mb: 2 }}>
              TALALINK
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 2, maxWidth: 300 }}>
              The digital bridge for Thika's technical talent. Connecting artisans, 
              engineers, and creators to a global marketplace.
            </Typography>
            <Stack direction="row" spacing={1}>
              {[Facebook, Twitter, LinkedIn, Instagram, GitHub].map((Icon, index) => (
                <IconButton 
                  key={index} 
                  sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: 'primary.main' } }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
              Marketplace
            </Typography>
            <Stack spacing={1}>
              <Link href="/home" color="inherit" underline="hover" variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>Browse Services</Link>
              <Link href="/home" color="inherit" underline="hover" variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>Technical Goods</Link>
              <Link href="/login" color="inherit" underline="hover" variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>Start Selling</Link>
            </Stack>
          </Grid>

          {/* Platform */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
              Platform
            </Typography>
            <Stack spacing={1}>
              <Link href="/dashboard" color="inherit" underline="hover" variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>Dashboard</Link>
              <Link href="/maintenance" color="inherit" underline="hover" variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>Maintenance Log</Link>
              <Link href="#" color="inherit" underline="hover" variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>Safety Guidelines</Link>
            </Stack>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
              Contact Thika Hub
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Business color="primary" fontSize="small" />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                  Section 9, Thika, Kenya
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Email color="primary" fontSize="small" />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                  support@talalink.co.ke
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Phone color="primary" fontSize="small" />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                  +254 700 000 000
                </Typography>
              </Box>
            </Stack>
          </Grid>

        </Grid>

        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 4 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
            © {currentYear} TalaLink. Built for the Artisans of Thika.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link href="#" variant="caption" color="inherit" sx={{ color: 'rgba(255,255,255,0.4)' }}>Privacy Policy</Link>
            <Link href="#" variant="caption" color="inherit" sx={{ color: 'rgba(255,255,255,0.4)' }}>Terms of Service</Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;