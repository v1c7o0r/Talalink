import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';

// Page Imports
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";   
import Maintenance from "./pages/Maintenance"; 

// Component Imports
import Footer from "./components/Layout/Footer";

/**
 * Main Application Component
 */
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // Logic: We don't want the Footer to show up on the Dashboard or Maintenance 
  // because those pages usually have their own internal Sidebar navigation.
  const hideFooterRoutes = ['/dashboard', '/maintenance', '/chat'];
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        bgcolor: 'background.default' 
      }}
    >
      {/* Main Content Area */}
      <Box component="main" sx={{ flex: 1 }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          
          {/* Auth Route - Passes state setter to Login component */}
          <Route 
            path="/login" 
            element={<Login setIsLoggedIn={setIsLoggedIn} />} 
          />
          
          {/* Protected Routes - Redirects to login if not authenticated */}
          <Route 
            path="/dashboard" 
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} 
          />
          
          <Route 
            path="/maintenance" 
            element={isLoggedIn ? <Maintenance /> : <Navigate to="/login" />} 
          />

          {/* Catch-all: Redirect unknown routes to Landing */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Box>

      {/* Footer - Only shows on Landing, Home, and Login */}
      {shouldShowFooter && <Footer />}
    </Box>
  );
}