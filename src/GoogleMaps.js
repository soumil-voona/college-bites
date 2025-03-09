import React, { useEffect } from "react";
import L from "leaflet"; // Leaflet.js for maps
import "leaflet/dist/leaflet.css"; // Leaflet CSS for styling

const GoogleMaps = () => {
  useEffect(() => {
    const mapContainer = document.getElementById("map");
    if (mapContainer) {
      // Initialize the map
      const map = L.map(mapContainer).setView([32.8136, -96.9547], 10); // San Francisco

      // Load OpenStreetMap tiles (Free, No API Key Required)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Add a marker (pin)
      L.marker([32.8136, -96.9547])
        .addTo(map)
        .bindPopup("San Francisco") // Popup text
        .openPopup();

      return () => {
        map.remove(); // Cleanup on component unmount
      };
    }
  }, []);

  return <div id="map" className = 'GoogleMaps' style={{ width: "100%", height: "500px" }}></div>;
};

export default GoogleMaps;
