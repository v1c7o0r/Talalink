import { useState } from 'react';
import { 
  Box, Container, Paper, Typography, TextField, 
  Button, Stack, Link, IconButton, InputAdornment, Alert 
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import NavBar from '../components/Layout/NavBar';

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        navigate('/home'); 
      } else {
        setError(data.error || 'Login failed. Please check your credentials.');
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
      
      <Container maxWidth="sm" sx={{ mt: 15, mb: 4 }}>
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
            <Typography variant="h4" fontWeight={900} color="primary">Welcome Back</Typography>
            <Typography variant="body2" color="text.secondary">
              Access your Talalink account to manage verified goods in Thika
            </Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          <form onSubmit={handleLogin}>
            <Stack spacing={3}>
              <TextField
                label="Email Address"
                fullWidth
                required
                variant="outlined"
                value={formData.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="primary" sx={{ fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                required
                variant="outlined"
                value={formData.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="primary" sx={{ fontSize: 20 }} />
                    </InputAdornment>
                  ),
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

              <Box textAlign="right">
                <Link component={RouterLink} to="/forgot-password" variant="caption" sx={{ color: 'primary.main', fontWeight: 600 }}>
                  Forgot password?
                </Link>
              </Box>

              <Button 
                type="submit" 
                variant="contained" 
                fullWidth 
                size="large"
                disabled={loading}
                sx={{ py: 1.5, borderRadius: 2, fontWeight: 700, fontSize: '1rem' }}
              >
                {loading ? 'Authenticating...' : 'Login to Dashboard'}
              </Button>
            </Stack>
          </form>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Link component={RouterLink} to="/signup" sx={{ color: 'primary.main', fontWeight: 700, textDecoration: 'none' }}>
                Create Account
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;