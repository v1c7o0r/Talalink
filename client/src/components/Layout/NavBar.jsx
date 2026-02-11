import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <AppBar position="fixed" elevation={0} sx={{ bgcolor: 'rgba(10, 25, 47, 0.8)', backdropFilter: 'blur(10px)' }}>
    <Container maxWidth="lg">
      <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" fontWeight={900} color="primary" component={Link} to="/" sx={{ textDecoration: 'none' }}>
          TALALINK
        </Typography>
        <Button variant="text" color="inherit" component={Link} to="/login" sx={{ fontWeight: 700 }}>
          Login
        </Button>
        <Button color="inherit" component={Link} to="/home">Marketplace</Button>
      </Toolbar>
    </Container>
  </AppBar>
);

export default NavBar;