import React, { useState } from 'react';
import MenuBar from './MenuBar';
import ListingDriver from './listingDriver';
import './driverPortal.css';

const DriverPortal = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [listings, setListings] = useState([]);
  const [newListing, setNewListing] = useState({ deliveryDate: '', destination: '' });

  const handleNewListing = () => {
    setShowPopup(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewListing((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewListingSubmit = () => {
    if (newListing.deliveryDate && newListing.destination) {
      const newEntry = {
        id: listings.length + 1,
        deliveryDate: newListing.deliveryDate,
        destination: newListing.destination,
      };
      setListings((prevListings) => [...prevListings, newEntry]); // ✅ Update state
      setShowPopup(false);
      setNewListing({ deliveryDate: '', destination: '' });
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setNewListing({ deliveryDate: '', destination: '' });
  };

  return (
    <div>
      <div>
        <MenuBar />
      </div>

      {listings.length === 0 ? (
        <h1 className='push listings-empty-error'>
          No Ride Scheduled Currently
        </h1>
      ) : (
        <>
          <div className='push'>
            <span className='date list-header'>Delivery Date</span>
            <span className='location list-header'>Location</span>
          </div>

          <div className='push line center'></div>

          <div className="push">
            {listings.map((item) => (
              <ListingDriver key={item.id} item={item} />
            ))}
          </div>
        </>
      )}

      <div>
        <button className='push new-listing-button' onClick={handleNewListing}>
          Create a New Listing
        </button>
      </div>

      {/* Popup Component */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div>
              <input
                type="date"
                name="deliveryDate"
                className='date-input input-overlay'
                value={newListing.deliveryDate}
                onChange={handleInputChange}
                placeholder="Enter delivery date"
              />
            </div>

            <div>
              <select
                name="destination"
                className='location-input input-overlay'
                value={newListing.destination}
                onChange={handleInputChange}
              >
                <option value="">Select a destination</option>
                <option value="University of Texas at Dallas">University of Texas at Dallas</option>
                <option value="Texas A&M University">Texas A&M University</option>
                <option value="University of North Texas">University of North Texas</option>
              </select>
            </div>

            <div>
              <button className='overlay-button cancel-overlay' onClick={closePopup}>Cancel</button>
              <button className='overlay-button submit-overlay' onClick={handleNewListingSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverPortal;
