import React from 'react';
import pic from '../assets/auto-repair-greenville.jpg'
import pic1 from '../assets/moc.jpeg'
import pic2 from '../assets/repair.jpg'
import pic3 from '../assets/tyrepuncture1.jpg'
import './Home.css'; // Import the custom CSS file

const Home = () => {
  return (
    <div className="home">
      
      {/* Hero Section */}
      <div className="hero">
        <h1>Reliable Mechanical Assistance</h1>
        <p>24/7 expert help to get you back on the road.</p>
        <button>Get Assistance Now</button>
      </div>

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