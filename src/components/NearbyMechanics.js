// src/components/NearbyMechanics.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Home.css';

// Import marker icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// User’s red dot icon
const userIcon = new L.Icon({
  iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg',
  iconSize: [20, 20],
});

// Default mechanics marker
const defaultIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const NearbyMechanics = () => {
  const location = useLocation();
  const { nearbyMechanics = [] } = location.state || { nearbyMechanics: [] };

  // State for user's actual location
  const [userLocation, setUserLocation] = useState(null);

  // Fetch real location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error fetching location:", error);
        setUserLocation({ lat: 0, lng: 0 });
      }
    );
  }, []);

  // Filter valid mechanics
  const validMechanics = nearbyMechanics?.filter(m => m.location?.lat && m.location?.lng) || [];

  return (
    <div className="nearby-mechanics-page">
      <h1>Nearby Mechanics</h1>
      <div className="map-container">
        {userLocation ? (
          <MapContainer
            center={[userLocation.lat, userLocation.lng]}
            zoom={13}
            style={{ height: '400px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* User Location Marker */}
            {userLocation.lat !== 0 && userLocation.lng !== 0 && (
              <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
                <Popup>Your Location</Popup>
              </Marker>
            )}

            {/* Mechanics Markers */}
            {validMechanics.length > 0 ? (
              validMechanics.map((mechanic) => (
                <Marker
                  key={mechanic.id}
                  position={[mechanic.location.lat, mechanic.location.lng]}
                  icon={defaultIcon}
                >
                  <Popup>{mechanic.name}</Popup>
                </Marker>
              ))
            ) : (
              <Popup>No mechanics available.</Popup>
            )}
          </MapContainer>
        ) : (
          <p>Loading map...</p>
        )}
      </div>

      <div className="mechanics-list">
        <h2>Mechanics Near You</h2>
        {validMechanics.length > 0 ? (
          validMechanics.map((mechanic) => (
            <div key={mechanic.id} className="mechanic-card">
              <h3>{mechanic.name}</h3>
              <p>{mechanic.distance.toFixed(2)} km away</p>
            </div>
          ))
        ) : (
          <p>No mechanics found.</p>
        )}
      </div>
    </div>
  );
};

export default NearbyMechanics;