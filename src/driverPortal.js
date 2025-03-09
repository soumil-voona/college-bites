import React, { useEffect, useState, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import config from "./CONSTANTS.js";
import axios from "axios";

const GoogleMaps = ({ lat, lon }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const handleMarkerClick = useCallback((driver) => {
    setSelectedDriver(driver);
    setShowPopup(true);
  }, []);

  useEffect(() => {
    const mapContainer = document.getElementById("map");
    if (!mapContainer || mapContainer._leaflet_id) return;

    const customIcon = L.icon({
      iconUrl: process.env.PUBLIC_URL + "/images/home-pin.png",
      iconSize: [38, 38],
      iconAnchor: [22, 38],
      popupAnchor: [-3, -76],
    });

    const workerIcon = L.icon({
      iconUrl: process.env.PUBLIC_URL + "/images/worker-pin.png",
      iconSize: [38, 38],
      iconAnchor: [22, 38],
      popupAnchor: [-3, -76],
    });

    const convert = async (address) => {
      try {
        const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
        const response = await axios.get(geocodeUrl);
        const results = response.data;
        if (results.length > 0) {
          return [parseFloat(results[0].lat), parseFloat(results[0].lon)];
        }
      } catch (error) {
        console.error("Geocoding error:", error);
      }
      return null;
    };

    const map = L.map(mapContainer).setView(
      [lat || 32.8136, lon || -96.9547],
      lat && lon ? 13 : 5
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const addDriverMarkers = async () => {
      for (let driver of config.driverInfo) {
        const coords = await convert(driver.address);
        if (coords) {
          const marker = L.marker(coords, { icon: workerIcon }).addTo(map);
          marker.on("click", () => handleMarkerClick(driver)); // Attach handler here
        }
      }
    };

    addDriverMarkers();

    if (lat && lon) {
      L.marker([lat, lon], { icon: customIcon })
        .addTo(map)
        .bindPopup("Your Address")
        .openPopup();
    }

    return () => map.remove();
  }, [lat, lon, handleMarkerClick]);

  return (
    <div>
      <div
        id="map"
        style={{
          width: "40vw",
          height: "40vh",
          borderRadius: "20px",
          left: "28vw",
          top: "50vh",
        }}
      />

      {/* Custom Popup Overlay */}
      {showPopup && selectedDriver && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Driver Details</h2>
            <input
              type="text"
              className="username-input input-overlay"
              value={selectedDriver.name}
              readOnly
            />
            <input
              type="tel"
              className="username-input input-overlay"
              value={selectedDriver.number}
              readOnly
            />
            <input
              type="text"
              className="username-input input-overlay"
              value={selectedDriver.address}
              readOnly
            />
            <input
              type="date"
              className="date-input input-overlay"
              value={selectedDriver.deliveryDate}
              readOnly
            />
            <select className="location-input input-overlay" value={selectedDriver.destination} disabled>
              <option>{selectedDriver.destination}</option>
            </select>
            <button className="overlay-button cancel-overlay" onClick={() => setShowPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleMaps;
