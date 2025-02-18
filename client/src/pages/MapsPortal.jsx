import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapsPortal = () => {
  const mapStyles = {        
    height: "100vh",
    width: "100%"};
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const defaultCenter = {
    lat: 11.035249576005876,
    lng: 77.01714808544867
  }

  return (
    <div className="agency-content hero d-flex flex-column p-3">
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
        >
          <Marker position={defaultCenter} />
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default MapsPortal;
