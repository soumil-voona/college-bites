import React, { useEffect , useState} from "react";
import L from "leaflet"; // Leaflet.js for maps
import "leaflet/dist/leaflet.css"; // Leaflet CSS for styling
import config from "./CONSTANTS.js";
import axios from "axios";

const GoogleMaps = ({ lat, lon }) => {
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const mapContainer = document.getElementById("map");

    if (!mapContainer || mapContainer._leaflet_id) return;

    // ✅ Ensure the icon URL is correct
    const customIcon = L.icon({
      iconUrl: process.env.PUBLIC_URL + "/images/home-pin.png", // Correct path to the image
      iconSize: [38, 38],
      iconAnchor: [22, 38],
      popupAnchor: [-3, -76],
    });

    const closePopup = () => {
      setShowPopup(false);
    };

    const workerIcon = L.icon({
      iconUrl: process.env.PUBLIC_URL + "/images/worker-pin.png", // Correct path to the image
      iconSize: [38, 38],
      iconAnchor: [22, 38],
      popupAnchor: [-3, -76],
    });
    // Validate custom icon loading!
    const validateIcon = (iconUrl) => {
      const img = new Image();
      img.src = iconUrl;
      return new Promise((resolve, reject) => {
        img.onload = () => resolve(true);
        img.onerror = () => reject(new Error("Icon failed to load"));
      });
    };

    const convert = async (address) => {
      try {
        const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
        const response = await axios.get(geocodeUrl);
        const results = response.data;

        if (results.length > 0) {
          return [parseFloat(results[0].lat), parseFloat(results[0].lon)];
        } else {
          console.error("Geocoding failed for address:", address);
        }
      } catch (error) {
        console.error("Geocoding error:", error);
      }
      return null; // Return null if no results are found
    };

    // ✅ Initialize the map
    const map = L.map(mapContainer).setView(
      [lat || 32.8136, lon || -96.9547],
      lat && lon ? 13 : 5
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const addDriverMarkers = async () => {
      // Validate the custom icon before adding markers
      try {
        await validateIcon(workerIcon.options.iconUrl);

        for (let driver of config.driverInfo) {
          const coords = await convert(driver.address);
          if (coords) {
            L.marker(coords, { icon: workerIcon }) // Make sure valid coordinates are passed
              .addTo(map)
              .on('click', (e) => {
                L.popup()
                  .setLatLng(e.latlng)
                  .setContent(`<b>${driver.name}</b><br>${driver.address}`)
                  .openOn(map);
              })
              
              .openPopup();
          } else {
            console.warn("Skipping invalid address:", driver.address);
          }
        }
      } catch (error) {
        console.error("Icon loading failed:", error);
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
  }, [lat, lon]);

  return <div id="map" style={{ width: "40vw", height: "40vh", borderRadius: "20px", left: "28vw", top: '50vh'}} />;
};

export default GoogleMaps;