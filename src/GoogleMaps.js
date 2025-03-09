import React, { useEffect } from "react";
import L from "leaflet"; // Leaflet.js for maps
import "leaflet/dist/leaflet.css"; // Leaflet CSS for styling

const GoogleMaps = ({ lat, lon }) => {
  useEffect(() => {
    const mapContainer = document.getElementById("map");
    if (mapContainer && !mapContainer._leaflet_id) {
      // Initialize the map
      const map = L.map(mapContainer).setView([lat || 32.8136, lon || -96.9547], 10); // Default to a location if lat/lon are not provided

      // Load OpenStreetMap tiles (Free, No API Key Required)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Add a marker (pin)
      if (lat && lon) {
        L.marker([lat, lon])
          .addTo(map)
          .bindPopup("Selected Location") // Popup text
          .openPopup();
      }

      return () => {
        map.remove(); // Cleanup on component unmount
      };
    }
  }, [lat, lon]); // Re-run the effect when lat or lon changes

  return <div id="map" className='GoogleMaps' style={{ width: "100%", height: "500px" }}></div>;
};

export default GoogleMaps;