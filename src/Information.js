import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/authContext';
import './information.css';
import MenuBar from './MenuBar';

const Information = () => {
  const [inView, setInView] = useState({
    opening: false,
    aboutUs: false,
    howItWorks: false,
    information: false,
  });

  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  const handleNavigation = (path) => {
    if (userLoggedIn) {
      navigate(path);
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView((prev) => ({ ...prev, [entry.target.id]: true }));
        }
      });
    }, { threshold: 0.5 });

    const sections = document.querySelectorAll('.fade-in');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <>
      <MenuBar />

      {/* Opening Section */}
      <div className={`info-opening fade-in ${inView.opening ? 'in-view' : ''}`} id="opening">
        <h2 className="header">
          Share homemade love <br />
          <span style={{ color: '#510104' }}>With your college doves</span>
        </h2>
        <div className="btn customer" onClick={() => handleNavigation('/find')}>
          <span className="btnTxt">I am a customer</span>
        </div>
        <div className="btn driver" onClick={() => handleNavigation('/driverPortal')}>
          <span className="btnTxt">I am a driver</span>
        </div>
      </div>

      {/* About Us Section */}
      <div className={`second fade-in ${inView.aboutUs ? 'in-view' : ''}`} id="AboutUs">
        <h2 className="header about">About <span style={{ color: '#E0BABB' }}>us</span></h2>
        <div className="help">
          <h3>Helping College Students</h3>
          <p>
            A common challenge faced by parents of college students is the desire to send homemade food to their children without having to make the trip themselves. Our website aims to address this issue by leveraging community-based carpooling methods to facilitate the delivery of homemade meals. 
          </p>
        </div>
      </div>

      {/* How It Works Section */}
      <div className={`third fade-in ${inView.howItWorks ? 'in-view' : ''}`} id="HowItWorks">
        <h2 className="header about">How it <span style={{ color: '#E0BABB' }}>works</span></h2>
        <div className="deliver">
          <h3>Deliver Food</h3>
          <p>Transport homemade meals from the community to college students and earn compensation for your service.</p>
        </div>
        <div className="foodDelivered">
          <h3>Get Food Delivered</h3>
          <p>Hand off homemade meals to a designated driver and have them delivered safely to your college student.</p>
          <button className="redirect-button" onClick={() => navigate('/products')}>
            View Products
          </button>
        </div>
      </div>

      {/* Box Information Section */}
      <div className={`fourth fade-in ${inView.information ? 'in-view' : ''}`} id="Information">
        <h2 className="header about">Box <span style={{ color: '#E0BABB' }}>Information</span></h2>
        <div className="measurements">
          <h3>Food Measurements</h3>
          <p>
            <img src="./images/boxSize.png" alt="Box Dimensions" style={{ width: '30vw', marginTop: '-8vh' }} />
          </p>
        </div>
        <div className="foodDelivered">
          <h3>Food Capacity:</h3>
          <p>
            Coupe: 10-15 boxes <br />
            Sedan: 20-24 boxes <br />
            SUVs and Minivans: 75-100 boxes
          </p>
        </div>
      </div>
    </>
  );
};

export default Information;
