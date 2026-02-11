import { AppBar, Toolbar, Typography, Button, Container, Stack, Avatar, IconButton, Tooltip } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { PersonAddAlt1, Login as LoginIcon, Logout as LogoutIcon, ShoppingCart } from '@mui/icons-material';

const NavBar = () => {
  const navigate = useNavigate();
  
  // Check for session
  const token = localStorage.getItem('token');
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <AppBar 
      position="fixed" 
      elevation={0} 
      sx={{ 
        bgcolor: 'rgba(10, 25, 47, 0.8)', 
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          
          <Typography 
            variant="h6" 
            fontWeight={900} 
            color="primary" 
            component={Link} 
            to="/" 
            sx={{ textDecoration: 'none', letterSpacing: 1 }}
          >
            TALALINK
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Button 
              color="inherit" 
              component={Link} 
              to="/home"
              sx={{ fontWeight: 600, textTransform: 'none', mr: 1 }}
            >
              Marketplace
            </Button>

            {token ? (
              // --- POSITIVE CONDITION: LOGGED IN ---
              <Stack direction="row" spacing={2} alignItems="center">
                <Tooltip title="View Cart">
                  <IconButton color="inherit" component={Link} to="/cart">
                    <ShoppingCart />
                  </IconButton>
                </Tooltip>

                <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.light', display: { xs: 'none', sm: 'block' } }}>
                  Hi, {user?.username || 'User'}
                </Typography>

                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32, 
                    bgcolor: 'primary.main', 
                    fontSize: '0.875rem',
                    fontWeight: 700 
                  }}
                >
                  {user?.username?.charAt(0).toUpperCase() || 'U'}
                </Avatar>

                <Button 
                  variant="outlined" 
                  color="error" 
                  onClick={handleLogout}
                  startIcon={<LogoutIcon />}
                  sx={{ 
                    fontWeight: 700, 
                    textTransform: 'none', 
                    borderRadius: '8px',
                    borderColor: 'rgba(211, 47, 47, 0.5)'
                  }}
                >
                  Logout
                </Button>
              </Stack>
            ) : (
              // --- ELSE: PUBLIC VIEW ---
              <>
                <Button 
                  variant="text" 
                  color="inherit" 
                  component={Link} 
                  to="/login" 
                  startIcon={<LoginIcon sx={{ fontSize: 18 }} />}
                  sx={{ fontWeight: 700, textTransform: 'none' }}
                >
                  Login
                </Button>

                <Button 
                  variant="contained" 
                  color="primary" 
                  component={Link} 
                  to="/signup" 
                  startIcon={<PersonAddAlt1 />}
                  sx={{ 
                    fontWeight: 700, 
                    textTransform: 'none',
                    borderRadius: '8px',
                    ml: 1
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;