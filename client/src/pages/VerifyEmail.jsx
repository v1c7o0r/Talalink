import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Paper } from '@mui/material';
import { CheckCircleOutline, ErrorOutline } from '@mui/icons-material';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate(); // Now we will use this!
  const [status, setStatus] = useState('verifying');

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await fetch(`http://localhost:5000/verify/${token}`);
        if (response.ok) {
          setStatus('success');
          
          // USE NAVIGATE: Auto-redirect to login after 3 seconds
          setTimeout(() => {
            navigate('/login');
          }, 3000);

        } else {
          setStatus('error');
        }
      } catch (err) {
        console.error("Verification error:", err);
        setStatus('error');
      }
    };
    verify();
  }, [token, navigate]); // Added navigate to dependency array

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f5f5' }}>
      <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 4, maxWidth: 400 }}>
        {status === 'verifying' && (
          <>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography>Verifying your account...</Typography>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircleOutline sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
            <Typography variant="h5" fontWeight={700} gutterBottom>Account Verified!</Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Welcome to the TalaLink community. Redirecting you to login in 3 seconds...
            </Typography>
            <Button variant="contained" fullWidth component={Link} to="/login">Go to Login Now</Button>
          </>
        )}

        {status === 'error' && (
          <>
            <ErrorOutline sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
            <Typography variant="h5" fontWeight={700} gutterBottom>Verification Failed</Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              The link is invalid or has expired. Please try signing up again.
            </Typography>
            <Button variant="outlined" fullWidth component={Link} to="/signup">Back to Signup</Button>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default VerifyEmail;