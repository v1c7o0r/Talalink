import { useState } from 'react';
import { 
  Box, Container, Paper, Typography, TextField, 
  Button, Stack, Link, IconButton, InputAdornment, Alert 
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Person, Login as LoginIcon } from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import NavBar from '../components/Layout/NavBar';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    is_artisan: true // Defaulted to true so everyone has selling capabilities
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        // Redirect to login after 2 seconds so they can see the success message
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(data.error || 'Registration failed. Try a different email.');
      }
    } catch {
      setError('Could not connect to the server. Is the Flask app running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      <NavBar />
      
      <Container maxWidth="sm" sx={{ mt: 12, mb: 4 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 5, 
            borderRadius: 4, 
            bgcolor: 'background.paper', 
            border: '1px solid', 
            borderColor: 'divider' 
          }}
        >
          <Box textAlign="center" sx={{ mb: 4 }}>
            <Typography variant="h4" fontWeight={900} color="primary">Create Account</Typography>
            <Typography variant="body2" color="text.secondary">
              Join the Thika community to trade technical goods and services
            </Typography>
          </Box>

          {/* Prompt for returning users at the top */}
          <Alert icon={<LoginIcon fontSize="inherit" />} severity="info" sx={{ mb: 3, borderRadius: 2 }}>
            Already have an account? {' '}
            <Link 
              component={RouterLink} 
              to="/login" 
              sx={{ fontWeight: 700, textDecoration: 'none', cursor: 'pointer' }}
            >
              Log in here
            </Link>
          </Alert>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 3 }}>Account created! Redirecting to login...</Alert>}

          <form onSubmit={handleSignup}>
            <Stack spacing={3}>
              <TextField
                label="Full Name"
                fullWidth
                required
                variant="outlined"
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Person color="primary" /></InputAdornment>,
                }}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />

              <TextField
                label="Email Address"
                type="email"
                fullWidth
                required
                variant="outlined"
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Email color="primary" /></InputAdornment>,
                }}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                required
                variant="outlined"
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Lock color="primary" /></InputAdornment>,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />

              <Button 
                type="submit" 
                variant="contained" 
                fullWidth 
                size="large"
                disabled={loading || success}
                sx={{ 
                  py: 1.5, 
                  borderRadius: 2, 
                  fontWeight: 700, 
                  fontSize: '1rem',
                  mt: 1 
                }}
              >
                {loading ? 'Creating Account...' : 'Get Started'}
              </Button>
            </Stack>
          </form>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              By signing up, you agree to join the verified Thika artisan network.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signup;