import React, { useCallback } from 'react'; // REMOVED useState from here
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Box, Typography, Skeleton, Alert } from '@mui/material';

const containerStyle = {
  width: '100%',
  height: '300px',
  borderRadius: '16px',
};

// ... (rest of your code remains the same)
// Default center: Thika Town
const center = {
  lat: -1.0333,
  lng: 37.0693
};

const LocationPicker = ({ coords, setCoords }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  const onMapClick = useCallback((e) => {
    const newCoords = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setCoords(newCoords);
  }, [setCoords]);

  if (loadError) {
    return <Alert severity="error">Map failed to load. Check API Key.</Alert>;
  }

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      {!isLoaded ? (
        <Skeleton variant="rectangular" sx={{ ...containerStyle }} />
      ) : (
        <>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            {coords 
              ? `Selected: ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}` 
              : "Click the map to set workshop origin"}
          </Typography>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={coords || center}
            zoom={14}
            onClick={onMapClick}
            options={{
              disableDefaultUI: true,
              zoomControl: true,
              styles: mapStyle // Optional: Custom dark/clean styles
            }}
          >
            {coords && (
              <Marker 
                position={coords} 
                animation={window.google.maps.Animation.DROP}
              />
            )}
          </GoogleMap>
        </>
      )}
    </Box>
  );
};

// Optional: Minimalist map style to match the dark UI
const mapStyle = [
  { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }
];

export default React.memo(LocationPicker);