import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Added useNavigate for redirection
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import './ConfirmationPage.css'; // Import the CSS file

const ConfirmationPage = () => {
  const { state } = useLocation(); // Retrieve the address passed from CheckoutPage
  const navigate = useNavigate(); // For navigation
  const [address, setAddress] = useState(state?.address || "");
  const [latLng, setLatLng] = useState([37.7749, -122.4194]); // Default coordinates (San Francisco)
  const [loading, setLoading] = useState(true); // Track loading state for the map
  const [thankYouMessage, setThankYouMessage] = useState(false); // State to manage the "Thank you" message
  const [showInfo, setShowInfo] = useState(false); // State to toggle displaying the user's data

  // Fetch coordinates for the provided address
  const fetchCoordinates = async (address) => {
    if (!address.trim()) return;

    setLoading(true); // Start loading

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = await response.json();

      if (data.length > 0) {
        const lat = parseFloat(data[0].lat); // Ensure latitude is a number
        const lon = parseFloat(data[0].lon); // Ensure longitude is a number
        setLatLng([lat, lon]); // Set the map position to the geocoded address
      } else {
        console.error("Address not found");
        setLatLng([37.7749, -122.4194]); // Fallback to default coordinates (San Francisco)
      }
    } catch (error) {
      console.error("Error fetching address coordinates:", error);
      setLatLng([37.7749, -122.4194]); // Fallback to default coordinates on error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    if (address) {
      fetchCoordinates(address); // Fetch coordinates when the page loads
    }
  }, [address]);

  // Handle the "Yes" button click
  const handleYesClick = () => {
    console.log("Address confirmed:", address);
    console.log("Checkout details:", state); // Log the details passed from CheckoutPage
    
    // Display the "Thank you" message
    setThankYouMessage(true);

    // After 2 seconds, redirect to homepage
    setTimeout(() => {
      navigate("/home"); // Redirect to the homepage after showing the message
    }, 2000);
  };

  // Handle the "No" button click, which redirects back to the CheckoutPage
  const handleNoClick = () => {
    navigate("/checkout"); // Redirect to CheckoutPage
  };

  // Toggle the display of the user's information
  const handleViewInfoClick = () => {
    setShowInfo(!showInfo); // Toggle visibility of user's data
  };

  return (
    <div className="confirmation-container">
      {thankYouMessage ? (
        <div className="thank-you-message">
          <h2>Thanks for your purchase!</h2>
        </div>
      ) : (
        <>
          <h2>Is this the right place?</h2>
          <p>{address || "No address available"}</p> {/* Display the address text */}

          {/* Check if we have a valid latLng and if it's not loading */}
          {loading ? (
            <p className="loading-message">Loading map...</p>
          ) : (
            <div className="map-container">
              <MapContainer center={latLng} zoom={18.5} style={{ height: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={latLng}>
                  <Popup>{address}</Popup>
                </Marker>
              </MapContainer>
            </div>
          )}

          {/* Confirmation Buttons */}
          <div className="confirmation-buttons">
            <button onClick={handleYesClick} className="btn-yes">Yes</button>
            <button onClick={handleNoClick} className="btn-no">No</button>
          </div>

          {/* "View Info" Button */}
          <div className="view-info-button">
            <button onClick={handleViewInfoClick} className="btn-view-info">View Info</button>
          </div>

          {/* Display the user's information if "View Info" is clicked */}
          {showInfo && (
            <div className="user-info">
              <h3>Checkout Details:</h3>
              <p><strong>Full Name:</strong> {state?.formData?.name}</p>
              <p><strong>Credit Card:</strong> {state?.formData?.creditCard}</p>
              <p><strong>Address:</strong> {state?.formData?.address}</p>
              <p><strong>Billing Address:</strong> {state?.formData?.billingAddress}</p>
              <p><strong>Expiration Date:</strong> {state?.formData?.expirationDate}</p>
              <p><strong>Order Amount:</strong> {state?.formData?.orderAmount}</p>
              <p><strong>CVV:</strong> {state?.formData?.cvv}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ConfirmationPage;
