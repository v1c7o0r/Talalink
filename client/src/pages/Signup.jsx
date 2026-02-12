import { useState, useEffect } from 'react'; // Added useEffect for cleanup
import { 
  Box, Container, Paper, Typography, TextField, 
  Button, Alert, Stack, InputAdornment, IconButton 
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Person, Lock } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import NavBar from '../components/Layout/NavBar';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const API_URL = 'http://127.0.0.1:5000/signup';

  // Cleanup timers if component unmounts
  useEffect(() => {
    return () => {
      // Logic to clear timeouts if necessary
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Client-side validation check
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        // Backend errors (e.g., "Email already exists")
        setError(data.error || 'Signup failed.');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      // Network errors (e.g., Flask server is down)
      setError('Connection refused. Ensure the Flask server is running at port 5000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pt: 10 }}>
      <NavBar />
      <Container maxWidth="xs">
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3, mt: 4 }}>
          <Typography variant="h5" fontWeight={800} textAlign="center" gutterBottom>
            Join TalaLink
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
            Create an account to start listing in Thika
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Account created! Please check your email to verify. Redirecting to login...
            </Alert>
          )}

          {!success && (
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  label="Username"
                  fullWidth
                  required
                  autoComplete="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Person color="action" /></InputAdornment>,
                  }}
                />
                <TextField
                  label="Email Address"
                  type="email"
                  fullWidth
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Email color="action" /></InputAdornment>,
                  }}
                />
                <TextField
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  required
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Lock color="action" /></InputAdornment>,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button 
                  type="submit" 
                  variant="contained" 
                  fullWidth 
                  size="large"
                  disabled={loading}
                  sx={{ py: 1.5, fontWeight: 700, mt: 2 }}
                >
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </Button>
              </Stack>
            </form>
          )}

          <Box textAlign="center" mt={3}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 700 }}>
                Log In
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signup;