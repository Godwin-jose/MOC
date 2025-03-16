// src/components/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pic from '../assets/auto-repair-greenville.jpg';
import pic1 from '../assets/moc.jpeg';
import pic2 from '../assets/repair.jpg';
import pic3 from '../assets/tyrepuncture1.jpg';
import './Home.css'; // Import your custom CSS

const Home = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyMechanics, setNearbyMechanics] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Mock data for mechanics
  const mechanics = [
    { id: 1, name: "John's Auto Repair", location: { lat: 9.9406, lng: 76.2653 }, distance: null },
    { id: 2, name: "Mike's Garage", location: { lat: 9.9506, lng: 76.2753 }, distance: null },
    { id: 3, name: "City Mechanics", location: { lat: 9.9306, lng: 76.2553 }, distance: null },
  ];

  // Function to calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  // Function to get user's location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });

          // Calculate distances and find nearby mechanics
          const updatedMechanics = mechanics.map((mechanic) => ({
            ...mechanic,
            distance: calculateDistance(latitude, longitude, mechanic.location.lat, mechanic.location.lng),
          }));

          // Sort mechanics by distance
          updatedMechanics.sort((a, b) => a.distance - b.distance);
          setNearbyMechanics(updatedMechanics.slice(0, 3)); // Show top 3 nearest mechanics

          // Navigate to the NearbyMechanics page
          navigate('/nearby-mechanics', {
            state: {
              userLocation: { lat: latitude, lng: longitude },
              nearbyMechanics: updatedMechanics.slice(0, 3),
            },
          });
        },
        (error) => {
          setError("Unable to retrieve your location. Please enable location services.");
        },
        {
          enableHighAccuracy: true, // Request high-accuracy coordinates
          timeout: 5000, // Wait up to 5 seconds
          maximumAge: 0, // Do not use cached location
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  // Navigate to Mechanic Login Page
  const goToMechanicLogin = () => {
    navigate('/mechanic-login');
  };

  return (
    <div className="home">
      
      {/* Hero Section */}
      <div className="hero">
        <h1>Reliable Mechanical Assistance</h1>
        <p>24/7 expert help to get you back on the road.</p>
        <button onClick={getUserLocation}>Get Assistance Now</button>
      </div>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Services Section */}
      <div className="services">
        <h2>Our Services</h2>
        <p>Quick and reliable mechanical help wherever you are.</p>

        <div className="services-grid">
          
          {/* Card 1: Roadside Assistance */}
          <div className="service-card">
            <img src={pic1} alt="Roadside Assistance" />
            <h3>24/7 Roadside Assistance</h3>
            <p>
              Our professionals will reach your location and help you with any mechanical issues, no matter the time or place.
            </p>
          </div>

          {/* Card 2: Tire Replacement */}
          <div className="service-card">
            <img src={pic} alt="Tire Replacement" />
            <h3>Tire Replacement</h3>
            <p>
              Got a flat tire? Our team will quickly replace your tire with a spare or provide professional repair services.
            </p>
          </div>

          {/* Card 3: Jump Start */}
          <div className="service-card">
            <img src={pic2} alt="Jump Start" />
            <h3>Jump Start</h3>
            <p>
              Dead battery? Our experts will give your vehicle a boost and ensure you’re ready to drive again.
            </p>
          </div>

          {/* Card 4: Towing Services */}
          <div className="service-card">
            <img src={pic3} alt="Towing Services" />
            <h3>Towing Services</h3>
            <p>
              If your vehicle is beyond roadside repair, we offer professional towing services to a trusted repair center.
            </p>
          </div>

        </div>
      </div>

      {/* Mechanic Mode Button */}
      <div className="mechanic-mode">
        <button onClick={goToMechanicLogin}>Mechanic Mode</button>
      </div>

      {/* Customer Trust Section */}
      <div className="customer-trust">
        <h2>Trusted by Thousands</h2>
        <p>Your safety and convenience are our priority.</p>
        <div className="trust-stats">
          <div>
            <h3>98%</h3>
            <p>Customer Satisfaction</p>
          </div>
          <div>
            <h3>5000+</h3>
            <p>Happy Clients</p>
          </div>
          <div>
            <h3>10+</h3>
            <p>Years of Experience</p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="footer">
        <p>© 2023 Mechanical Assistance. All rights reserved.</p>
      </div>
      
    </div>
  );
};

export default Home;