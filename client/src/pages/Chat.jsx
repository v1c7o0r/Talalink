import React, { useState } from 'react';
import { 
  Box, Paper, Grid, Typography, List, ListItem, 
  ListItemAvatar, Avatar, ListItemText, Divider, 
  TextField, IconButton, Stack 
} from '@mui/material';
import { Send, FiberManualRecord, Search } from '@mui/icons-material';
import SideBar from '../components/Layout/SideBar';

const MOCK_CHATS = [
  { id: 1, name: 'John Doe', lastMsg: 'Is the inverter ready?', online: true, time: '10:30 AM' },
  { id: 2, name: 'TechFix Thika', lastMsg: 'Need parts for the pump.', online: false, time: 'Yesterday' },
];

const Chat = () => {
  const [activeChat, setActiveChat] = useState(MOCK_CHATS[0]);
  const [message, setMessage] = useState('');

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f5f7fa', overflow: 'hidden' }}>
      <SideBar isLoggedIn={true} />
      
      <Box component="main" sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
        <Grid container spacing={0} sx={{ height: '90vh', borderRadius: 4, overflow: 'hidden', boxShadow: 3 }}>
          
          {/* Chat List (Left) */}
          <Grid item xs={12} md={4} sx={{ bgcolor: 'background.paper', borderRight: '1px solid #e0e0e0' }}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>Messages</Typography>
              <TextField 
                fullWidth size="small" placeholder="Search chats..." 
                InputProps={{ startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} /> }}
              />
            </Box>
            <List sx={{ overflowY: 'auto', maxHeight: '75vh' }}>
              {MOCK_CHATS.map((chat) => (
                <ListItem 
                  button 
                  key={chat.id} 
                  selected={activeChat.id === chat.id}
                  onClick={() => setActiveChat(chat)}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>{chat.name[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={chat.name} 
                    secondary={chat.lastMsg} 
                    primaryTypographyProps={{ fontWeight: 700 }}
                  />
                  <Stack alignItems="flex-end">
                    <Typography variant="caption" color="text.secondary">{chat.time}</Typography>
                    {chat.online && <FiberManualRecord sx={{ fontSize: 10, color: '#10b981' }} />}
                  </Stack>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Active Message Thread (Right) */}
          <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column', bgcolor: '#fff' }}>
            {/* Header */}
            <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>{activeChat.name[0]}</Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight={700}>{activeChat.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  Discussing: {activeChat.id === 1 ? 'Solar Inverter' : 'Water Pump'}
                </Typography>
              </Box>
            </Box>

            {/* Messages Area */}
            <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto', bgcolor: '#fafafa' }}>
              <Stack spacing={2}>
                <Box sx={{ alignSelf: 'flex-start', bgcolor: '#e0e0e0', p: 1.5, borderRadius: '20px 20px 20px 0', maxWidth: '70%' }}>
                  <Typography variant="body2">{activeChat.lastMsg}</Typography>
                </Box>
                <Box sx={{ alignSelf: 'flex-end', bgcolor: 'primary.main', color: 'white', p: 1.5, borderRadius: '20px 20px 0 20px', maxWidth: '70%' }}>
                  <Typography variant="body2">Checking the components now, will update the maintenance log shortly.</Typography>
                </Box>
              </Stack>
            </Box>

            {/* Input Area */}
            <Box sx={{ p: 2, bgcolor: '#fff', borderTop: '1px solid #e0e0e0' }}>
              <Stack direction="row" spacing={2}>
                <TextField 
                  fullWidth placeholder="Type a message..." 
                  variant="outlined" size="small"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <IconButton color="primary" sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}>
                  <Send />
                </IconButton>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Chat;