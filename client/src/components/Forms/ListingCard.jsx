import { 
  Card, CardMedia, CardContent, Typography, 
  Box, Chip, IconButton, Stack, Tooltip 
} from '@mui/material';
import { Edit, LocationOn, Build, ShoppingBag } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ListingCard = ({ item }) => {
  const navigate = useNavigate();
  
  // Get current user ID from localStorage to check ownership
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const isOwner = currentUser?.id === item.user_id;

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        borderRadius: 3,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': { 
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.1)' 
        },
        position: 'relative'
      }}
    >
      {/* Category Badge */}
      <Box sx={{ position: 'absolute', top: 12, left: 12, zIndex: 1 }}>
        <Chip 
          icon={item.category === 'Service' ? <Build sx={{ fontSize: '14px !important' }} /> : <ShoppingBag sx={{ fontSize: '14px !important' }} />}
          label={item.category} 
          size="small" 
          color={item.category === 'Service' ? 'secondary' : 'primary'}
          sx={{ fontWeight: 700, backdropFilter: 'blur(4px)', bgcolor: 'rgba(255,255,255,0.9)' }}
        />
      </Box>

      {/* Edit Button (Only for Owners) */}
      {isOwner && (
        <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
          <Tooltip title="Edit Your Listing">
            <IconButton 
              size="small" 
              onClick={() => navigate(`/create-listing/${item.id}`)}
              sx={{ bgcolor: 'white', '&:hover': { bgcolor: '#f5f5f5' }, boxShadow: 1 }}
            >
              <Edit color="primary" fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      <CardMedia
        component="img"
        height="180"
        image={item.image_url || 'https://via.placeholder.com/300x180?text=No+Image'}
        alt={item.title}
      />

      <CardContent sx={{ flexGrow: 1, pt: 2 }}>
        <Typography variant="h6" fontWeight={800} noWrap gutterBottom>
          {item.title}
        </Typography>

        <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 2, color: 'text.secondary' }}>
          <LocationOn sx={{ fontSize: 16 }} />
          <Typography variant="caption" fontWeight={600}>
            {item.location}
          </Typography>
        </Stack>

        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2, 
            display: '-webkit-box', 
            WebkitLineClamp: 2, 
            WebkitBoxOrient: 'vertical', 
            overflow: 'hidden',
            minHeight: '40px'
          }}
        >
          {item.description}
        </Typography>

        <Box sx={{ mt: 'auto', pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6" color="primary" fontWeight={900}>
            KES {Number(item.price).toLocaleString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ListingCard;