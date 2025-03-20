import React, { useEffect } from "react";
import L from "leaflet"; // Leaflet.js for maps
import "leaflet/dist/leaflet.css"; // Leaflet CSS for styling
import axios from "axios";
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Import Firestore functions
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate and useLocation

const GoogleMaps = ({ lat, lon }) => {
  const navigate = useNavigate(); // Initialize navigate function
  const location = useLocation(); // Get location object
  const queryParams = new URLSearchParams(location.search);
  const college = queryParams.get('college') || '/'; // Default to '/' if 'type' is not provided
  
  const collegesDictionary = {'utd': 'University of Texas at Dallas', 'atm': 'Texas A&M University', 'unt': 'University of North Texas'}; // Initialize an empty dictionary to store driver data
  useEffect(() => {
    const mapContainer = document.getElementById("map");

    if (!mapContainer || mapContainer._leaflet_id) return; // Prevent reinitialization

    console.log("Initializing map..."); // Log map initialization

    // ✅ Ensure the icon URL is correct
    const customIcon = L.icon({
      iconUrl: process.env.PUBLIC_URL + "/images/home-pin.png", // Correct path to the image
      iconSize: [38, 38],
      iconAnchor: [22, 38],
      popupAnchor: [-3, -76],
    });

    const workerIcon = L.icon({
      iconUrl: process.env.PUBLIC_URL + "/images/worker-pin.png", // Correct path to the image
      iconSize: [38, 38],
      iconAnchor: [22, 38],
      popupAnchor: [-3, -76],
    });
    // Validate custom icon loading
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

    console.log("Map initialized successfully."); // Confirm map initialization

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const addDriverMarkers = async () => {
      try {
        await validateIcon(workerIcon.options.iconUrl);

        const db = getFirestore(); // Initialize Firestore
        const drivesCollection = collection(db, "drives");
        const querySnapshot = await getDocs(drivesCollection);

        const drivers = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.name && data.address && data.destination === collegesDictionary[college]) {
            drivers.push({ id: doc.id, name: data.name, address: data.address, phoneNumber: data.number });
          }
        });

        for (let driver of drivers) {
          const coords = await convert(driver.address);
          console.log(`Driver: ${driver.name}, Address: ${driver.address}, Coords: ${coords}`); // Log coordinates
          if (coords) {
            const marker = L.marker(coords, { icon: workerIcon })
              .addTo(map)
              .bindPopup(`<b>${driver.name}</b><br>${driver.address}<br>${driver.phoneNumber}<br>Click to checkout`);
              
            marker.on("mouseover", function () {
              this.openPopup();
            });
            marker.on("mouseout", function () {
              this.closePopup();
            });
            marker.on("click", function () {
              navigate(`/checkout?driverId=${driver.id}`); // Pass Firestore document ID as query parameter
            });

            console.log(`Marker added for driver: ${driver.name}`); // Log marker addition
          } else {
            console.warn("Skipping invalid address:", driver.address);
          }
        }
      } catch (error) {
        console.error("Error fetching driver data or loading icons:", error);
      }
    };

    addDriverMarkers();

    if (lat && lon) {
      L.marker([lat, lon], { icon: customIcon })
        .addTo(map)
        .bindPopup("Your Address")
        .openPopup();
      console.log("Custom marker added for user location."); // Log custom marker addition
    }

    return () => map.remove();
  }, [lat, lon, navigate]);

  return <div id="map" style={{ width: "40vw", height: "40vh", borderRadius: "20px", left: "28vw", top: "50vh" }} />;
};

export default GoogleMaps;