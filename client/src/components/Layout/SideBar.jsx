import React from 'react';
import { 
  Drawer, List, ListItem, ListItemButton, 
  ListItemIcon, ListItemText, Typography, 
  Box, Divider, Avatar 
} from '@mui/material';
import { 
  Home, Dashboard, Build, Chat, 
  Settings, Logout, Verified 
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 260;

const SideBar = () => {
  // CORRECT: Declaring the hooks for navigation and path tracking
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Marketplace', icon: <Home />, path: '/home' },
    { text: 'My Console', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Maintenance Hub', icon: <Build />, path: '/maintenance' },
    { text: 'Discussions', icon: <Chat />, path: '/chat' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: drawerWidth, 
          boxSizing: 'border-box',
          bgcolor: '#112240', // Dark tech theme
          color: 'white',
          borderRight: '1px solid rgba(255, 255, 255, 0.12)'
        },
      }}
    >
      {/* Branding Area */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="h5" fontWeight={900} color="primary" sx={{ letterSpacing: 1 }}>
          TALALINK
        </Typography>
        <Verified sx={{ fontSize: 18, color: '#10b981' }} />
      </Box>

      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 2 }} />

      {/* Profile Section */}
      <Box sx={{ px: 3, mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main', fontWeight: 'bold' }}>V</Avatar>
        <Box>
          <Typography variant="subtitle2" fontWeight={700}>Victor</Typography>
          <Typography variant="caption" color="text.secondary">Thika Artisan</Typography>
        </Box>
      </Box>

      {/* Navigation Links */}
      <List sx={{ px: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => navigate(item.path)} // USE: navigate function used here
              selected={location.pathname === item.path} // USE: location used to highlight active link
              sx={{
                borderRadius: 2,
                '&.Mui-selected': {
                  bgcolor: 'rgba(25, 110, 230, 0.2)',
                  color: '#196ee6',
                  '& .MuiListItemIcon-root': { color: '#196ee6' }
                },
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                }
              }}
            >
              <ListItemIcon sx={{ color: 'rgba(255,255,255,0.7)', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 600 }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Bottom Actions */}
      <Box sx={{ mt: 'auto', p: 2 }}>
        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 2 }} />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/settings')} sx={{ borderRadius: 2 }}>
              <ListItemIcon sx={{ color: 'rgba(255,255,255,0.7)' }}><Settings /></ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/')} sx={{ borderRadius: 2, color: '#ff4d4d' }}>
              <ListItemIcon sx={{ color: '#ff4d4d' }}><Logout /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default SideBar;