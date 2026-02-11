import { useState } from 'react';
import { 
  Box, TextField, MenuItem, InputAdornment, 
  Typography, Stack, Button, ToggleButton, ToggleButtonGroup 
} from '@mui/material';
import { CloudUpload, Label, Description, AttachMoney, Link as LinkIcon, Image as ImageIcon } from '@mui/icons-material';

const ListingForms = ({ formData, setFormData, setFile }) => {
  const [imageMode, setImageMode] = useState('upload');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile); // Pass the actual file object up to parent
    // Create a local preview URL
    setFormData({ ...formData, image_url: URL.createObjectURL(selectedFile) });
  };

  return (
    <Box component="form" noValidate>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>Listing Details</Typography>

      <Stack spacing={3}>
        {/* Title Field */}
        <TextField
          fullWidth label="Title" name="title"
          value={formData.title} onChange={handleChange}
          InputProps={{ startAdornment: <InputAdornment position="start"><Label color="primary"/></InputAdornment> }}
        />

        <Stack direction="row" spacing={2}>
          <TextField select fullWidth label="Category" name="category" value={formData.category} onChange={handleChange}>
            <MenuItem value="Product">Physical Product</MenuItem>
            <MenuItem value="Service">Technical Service</MenuItem>
          </TextField>

          <TextField
            fullWidth label="Price" name="price" type="number"
            value={formData.price} onChange={handleChange}
            InputProps={{ 
                startAdornment: <InputAdornment position="start"><AttachMoney color="primary"/></InputAdornment>,
                endAdornment: <Typography variant="caption">KES</Typography> 
            }}
          />
        </Stack>

        {/* Description Field */}
        <TextField
          fullWidth label="Description" name="description" multiline rows={4}
          value={formData.description} onChange={handleChange}
        />

        {/* IMAGE SELECTION MODE */}
        <Box>
          <Typography variant="body2" fontWeight={700} sx={{ mb: 1 }}>Product Image</Typography>
          <ToggleButtonGroup
            value={imageMode}
            exclusive
            onChange={(e, mode) => mode && setImageMode(mode)}
            size="small"
            sx={{ mb: 2 }}
          >
            <ToggleButton value="upload"><CloudUpload sx={{ mr: 1, fontSize: 18 }}/> Upload File</ToggleButton>
            <ToggleButton value="url"><LinkIcon sx={{ mr: 1, fontSize: 18 }}/> Image URL</ToggleButton>
          </ToggleButtonGroup>

          {imageMode === 'upload' ? (
            <Box 
              sx={{ border: '2px dashed #e0e0e0', borderRadius: 3, p: 3, textAlign: 'center', bgcolor: '#fafafa', cursor: 'pointer', '&:hover': { bgcolor: '#f0f4ff', borderColor: 'primary.main' } }}
              component="label"
            >
              <input type="file" hidden onChange={handleFileChange} accept="image/*" />
              {formData.image_url && imageMode === 'upload' ? (
                <img src={formData.image_url} alt="Preview" style={{ maxHeight: '100px', borderRadius: '8px' }} />
              ) : (
                <>
                  <ImageIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                  <Typography variant="body2" fontWeight={600}>Click to upload from device</Typography>
                </>
              )}
            </Box>
          ) : (
            <TextField
              fullWidth label="Paste Image URL" name="image_url"
              value={formData.image_url} onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              InputProps={{ startAdornment: <InputAdornment position="start"><LinkIcon color="primary"/></InputAdornment> }}
            />
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default ListingForms;