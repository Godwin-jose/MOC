import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./Home.css"; // Your custom CSS

// Fix missing default icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component to handle map clicks & set manual location
const LocationPicker = ({ setLocation }) => {
  useMapEvents({
    click(e) {
      setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
};

const MechanicProfile = () => {
  const [name, setName] = useState("");
  const [shopName, setShopName] = useState("");
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [pincode, setPincode] = useState("");
  const [images, setImages] = useState([]);
  const [mapVisible, setMapVisible] = useState(false);

  // Get current location
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          alert("Unable to retrieve location. Please enter manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Handle image upload (maximum 3 images)
  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files.length + images.length > 3) {
      alert("You can upload a maximum of 3 images.");
      return;
    }
    const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location.lat || !location.lng) {
      alert("Please set a valid shop location.");
      return;
    }
    console.log({ name, shopName, location, pincode, images });
    alert("Shop added successfully!");
  };

  return (
    <div className="mechanic-profile">
      <h1>Register Your Mechanic Shop</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Your Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Shop Name</label>
          <input
            type="text"
            placeholder="Enter your shop name"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Shop Location</label>
          <div className="location-buttons">
            <button type="button" onClick={handleCurrentLocation} className="location-button">
              Get Current Location
            </button>
            <button type="button" onClick={() => setMapVisible(!mapVisible)} className="location-button">
              {mapVisible ? "Hide Map" : "Set Location on Map"}
            </button>
          </div>

          {mapVisible && (
            <div className="map-container">
              <MapContainer
                center={[location.lat || 20, location.lng || 77]} // Default center (India)
                zoom={5}
                style={{ height: "300px", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {location.lat && location.lng && (
                  <Marker position={[location.lat, location.lng]}>
                    <Popup>{shopName || "Selected Location"}</Popup>
                  </Marker>
                )}
                <LocationPicker setLocation={setLocation} />
              </MapContainer>
              <p>Click on the map to set your location manually.</p>
            </div>
          )}

          <div className="coordinates-input">
            <label>Latitude</label>
            <input
              type="number"
              step="0.0001"
              placeholder="Latitude"
              value={location.lat || ""}
              onChange={(e) =>
                setLocation({ ...location, lat: parseFloat(e.target.value) || null })
              }
            />
            <label>Longitude</label>
            <input
              type="number"
              step="0.0001"
              placeholder="Longitude"
              value={location.lng || ""}
              onChange={(e) =>
                setLocation({ ...location, lng: parseFloat(e.target.value) || null })
              }
            />
          </div>
        </div>

        <div className="form-group">
          <label>Pincode</label>
          <input
            type="text"
            placeholder="Enter your pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Upload Images (Max 3)</label>
          <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
          <div className="image-preview">
            {images.map((image, index) => (
              <img key={index} src={image} alt={`Uploaded ${index}`} />
            ))}
          </div>
        </div>

        <button type="submit" className="submit-button">Save Profile</button>
      </form>
    </div>
  );
};

export default MechanicProfile;