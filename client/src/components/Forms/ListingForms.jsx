import React from 'react';
import { 
  Box, TextField, MenuItem, InputAdornment, 
  Typography, Stack, Button 
} from '@mui/material';
import { CloudUpload, Label, Description, AttachMoney } from '@mui/icons-material';

const categories = [
  { value: 'Product', label: 'Physical Product' },
  { value: 'Service', label: 'Technical Service' },
];

const ListingForm = ({ formData, setFormData }) => {
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    // This will be used later for sending images to the Flask backend
    console.log("File selected:", e.target.files[0]);
  };

  return (
    <Box component="form" noValidate>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
        Listing Details
      </Typography>

      <Stack spacing={3}>
        {/* Title Field */}
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. Solar Inverter Repair"
          InputProps={{
            startAdornment: <InputAdornment position="start"><Label color="primary"/></InputAdornment>,
          }}
        />

        {/* Category & Price Row */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            select
            fullWidth
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            InputProps={{
              startAdornment: <InputAdornment position="start"><AttachMoney color="primary"/></InputAdornment>,
              endAdornment: <Typography variant="caption" sx={{ ml: 1 }}>KES</Typography>
            }}
          />
        </Stack>

        {/* Description Field */}
        <TextField
          fullWidth
          label="Description"
          name="description"
          multiline
          rows={4}
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the technical details or features..."
          InputProps={{
            startAdornment: <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}><Description color="primary"/></InputAdornment>,
          }}
        />

        {/* Image Upload Placeholder */}
        <Box 
          sx={{ 
            border: '2px dashed #e0e0e0', 
            borderRadius: 3, 
            p: 3, 
            textAlign: 'center',
            bgcolor: '#fafafa',
            cursor: 'pointer',
            '&:hover': { bgcolor: '#f0f4ff', borderColor: 'primary.main' }
          }}
          component="label"
        >
          <input type="file" hidden onChange={handleFileChange} accept="image/*" />
          <CloudUpload sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
          <Typography variant="body2" fontWeight={600}>
            Upload Product Image
          </Typography>
          <Typography variant="caption" color="text.secondary">
            PNG, JPG up to 5MB
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default ListingForm;