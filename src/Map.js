import React, { useState } from 'react';
import MenuBar from './MenuBar';
import './map.css';
import GoogleMaps from './GoogleMaps';
import axios from 'axios';

const Map = () => {
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState({ lat: null, lon: null });

  const convert = async () => {
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

    try {
      const response = await axios.get(geocodeUrl);
      const results = response.data;
      if (results.length > 0) {
        const { lat, lon } = results[0];
        setLocation({ lat, lon });
        console.log('Latitude:', lat, 'Longitude:', lon);
      } else {
        console.error('No results found');
      }
    } catch (error) {
      console.error('Error fetching geocode data:', error);
    }
  };

  return (
    <>
      <MenuBar />
      <h2 className='map-header'>Find Drivers Near You</h2>
      <div>
        <input
          className='searchBar'
          name='location'
          placeholder='Enter Your Address'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              convert();
            }
          }}
        />
        <button type="button" onClick={convert}>
          <svg
            className='mapIcon'
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 -960 960 960'
            width='24px'
            fill='#510104'
          >
            <path d='M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z' />
          </svg>
        </button>
      </div>
      <GoogleMaps lat={location.lat} lon={location.lon} zoom = {13}/>
    </>
  );
};

export default Map;