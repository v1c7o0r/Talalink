import { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';

// Page & Component Imports
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Maintenance from "./pages/Maintenance";
import CreateListing from "./components/Forms/CreateListing";
import ProductDetail from "./pages/ProductDetail";
import VerifyEmail from "./pages/VerifyEmail"; // <--- ADD THIS IMPORT
import Footer from "./components/Layout/Footer";

/**
 * Main Application Component
 */
export default function App() {
  // 'user' data check - keeping your existing logic
  const [user, setUser] = useState(null); 
  const location = useLocation();

  // Added verify and product to hidden footer routes for a cleaner look
  const hideFooterRoutes = ['/dashboard', '/maintenance', '/chat', '/create-listing', '/verify'];
  const shouldShowFooter = !hideFooterRoutes.some(path => location.pathname.startsWith(path));

  // Helper to check if a token exists in local storage even if 'user' state is reset
  const isAuthenticated = user || localStorage.getItem('token');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box component="main" sx={{ flex: 1 }}>
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          
          {/* Email Verification Link from Backend */}
          <Route path="/verify/:token" element={<VerifyEmail />} />

          {/* --- PROTECTED ROUTES --- */}
          {/* Redirect to login if not authenticated */}
          
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard user={user} /> : <Navigate to="/login" />} 
          />
          
          <Route 
            path="/maintenance" 
            element={isAuthenticated ? <Maintenance user={user} /> : <Navigate to="/login" />} 
          />

          {/* CREATE ROUTE: For new listings */}
          <Route 
            path="/create-listing" 
            element={isAuthenticated ? <CreateListing /> : <Navigate to="/login" />} 
          />

          {/* UPDATE ROUTE: For editing existing listings via ID */}
          <Route 
            path="/create-listing/:id" 
            element={isAuthenticated ? <CreateListing /> : <Navigate to="/login" />} 
          />

          {/* --- FALLBACK --- */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Box>

      {/* Footer - Only shows on Landing, Home, and Login */}
      {shouldShowFooter && <Footer />}
    </Box>
  );
}