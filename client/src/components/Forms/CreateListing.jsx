import { useState, useEffect } from 'react';
import { 
  Box, Container, Paper, Typography, TextField, 
  Button, Stack, MenuItem, InputAdornment, Alert,
  ToggleButton, ToggleButtonGroup, Divider
} from '@mui/material';
import { 
  AddPhotoAlternate, Sell, LocationOn, Description, 
  CloudUpload, Link as LinkIcon, DeleteForever, Save 
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../Layout/NavBar';

const CreateListing = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageMode, setImageMode] = useState('url'); 
  const [selectedFile, setSelectedFile] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Product',
    image_url: '',
    location: 'Thika Town'
  });

  // 1. READ: Fetch existing data for Edit Mode
  useEffect(() => {
    if (isEditMode) {
      const fetchItem = async () => {
        try {
          const response = await fetch(`http://localhost:5000/listings/${id}`);
          if (!response.ok) throw new Error('Failed to fetch item');
          const data = await response.json();
          setFormData(data);
        } catch (err) {
          console.error("Fetch error:", err); // Resolves ESLint 'err' unused
          setError('Could not fetch item details. Please check your connection.');
        }
      };
      fetchItem();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. CREATE & UPDATE Operation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const token = localStorage.getItem('token');

    // FormData is required for file uploads
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('location', formData.location);

    if (imageMode === 'file' && selectedFile) {
      data.append('file', selectedFile);
    } else {
      data.append('image_url', formData.image_url);
    }

    const url = isEditMode 
      ? `http://localhost:5000/listings/${id}` 
      : 'http://localhost:5000/listings';
    
    const method = isEditMode ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 
          'Authorization': `Bearer ${token}` 
          // Note: Browser automatically sets Content-Type for FormData
        },
        body: data,
      });

      if (response.ok) {
        navigate('/home');
      } else {
        const result = await response.json();
        setError(result.error || 'The operation failed. Please check your details.');
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError('Connection error. Is the Flask server running?');
    } finally {
      setLoading(false);
    }
  };

  // 3. DELETE Operation
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to permanently delete this listing?')) return;
    
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/listings/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        navigate('/home');
      } else {
        throw new Error('Delete request failed');
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError('Could not delete the item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pt: 12, pb: 6 }}>
      <NavBar />
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, borderRadius: 4, border: '1px solid', borderColor: 'divider' }} elevation={0}>
          <Typography variant="h5" fontWeight={800} gutterBottom>
            {isEditMode ? 'Update Your Listing' : 'Share a New Item'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            All listings are verified for the Thika community network.
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                select label="Category Type" name="category"
                value={formData.category} onChange={handleChange}
              >
                <MenuItem value="Product">Product (Physical Good)</MenuItem>
                <MenuItem value="Service">Service (Technical Repair)</MenuItem>
              </TextField>

              <TextField
                label="Listing Title" name="title"
                placeholder="e.g. 5KVA Inverter or Plumbing Repair"
                fullWidth required value={formData.title} onChange={handleChange}
                InputProps={{ startAdornment: <InputAdornment position="start"><Description color="primary" sx={{ fontSize: 20 }}/></InputAdornment> }}
              />

              <TextField
                label="Price (KES)" name="price" type="number"
                fullWidth required value={formData.price} onChange={handleChange}
                InputProps={{ startAdornment: <InputAdornment position="start">KES</InputAdornment> }}
              />

              <TextField
                label="Detailed Description" name="description"
                multiline rows={3} fullWidth required
                value={formData.description} onChange={handleChange}
              />

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Visual Presentation</Typography>
                <ToggleButtonGroup
                  value={imageMode}
                  exclusive
                  onChange={(e, val) => val && setImageMode(val)}
                  fullWidth size="small" sx={{ mb: 2 }}
                >
                  <ToggleButton value="url" sx={{ textTransform: 'none' }}><LinkIcon sx={{ mr: 1, fontSize: 18 }}/> Use URL</ToggleButton>
                  <ToggleButton value="file" sx={{ textTransform: 'none' }}><CloudUpload sx={{ mr: 1, fontSize: 18 }}/> Upload File</ToggleButton>
                </ToggleButtonGroup>

                {imageMode === 'url' ? (
                  <TextField
                    label="Image Link" name="image_url"
                    fullWidth value={formData.image_url} onChange={handleChange}
                    placeholder="https://example.com/item-photo.jpg"
                    InputProps={{ startAdornment: <InputAdornment position="start"><AddPhotoAlternate color="primary"/></InputAdornment> }}
                  />
                ) : (
                  <Button
                    variant="outlined" component="label" fullWidth
                    startIcon={<CloudUpload />} sx={{ py: 2, borderStyle: 'dashed', textTransform: 'none' }}
                  >
                    {selectedFile ? selectedFile.name : 'Click to select photo'}
                    <input type="file" hidden onChange={(e) => setSelectedFile(e.target.files[0])} />
                  </Button>
                )}
              </Box>

              <TextField
                label="Location (Specific Area)" name="location"
                placeholder="e.g. Section 9, Makongeni"
                fullWidth required value={formData.location} onChange={handleChange}
                InputProps={{ startAdornment: <InputAdornment position="start"><LocationOn color="primary"/></InputAdornment> }}
              />

              <Divider sx={{ my: 1 }} />

              <Stack direction="row" spacing={2}>
                <Button 
                  type="submit" variant="contained" fullWidth size="large"
                  disabled={loading} startIcon={isEditMode ? <Save /> : <Sell />}
                  sx={{ py: 1.5, fontWeight: 700, borderRadius: 2 }}
                >
                  {loading ? 'Processing...' : isEditMode ? 'Save Changes' : 'Publish Listing'}
                </Button>

                {isEditMode && (
                  <Button 
                    variant="outlined" color="error" onClick={handleDelete}
                    disabled={loading} sx={{ borderRadius: 2, minWidth: '64px' }}
                  >
                    <DeleteForever />
                  </Button>
                )}
              </Stack>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default CreateListing;