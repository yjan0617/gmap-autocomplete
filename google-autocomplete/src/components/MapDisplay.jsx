import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { GOOGLE_API_KEY } from '../config';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 3.1390,
  lng: 101.6869,
};

const MapDisplay = () => {
  const selected = useSelector((state) => state.selectedPlace);

  const position = selected?.geometry?.location
    ? {
        lat: selected.geometry.location.lat,
        lng: selected.geometry.location.lng,
      }
    : defaultCenter;

  return (
    <LoadScript googleMapsApiKey={GOOGLE_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={12}>
        <Marker position={position} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapDisplay;
