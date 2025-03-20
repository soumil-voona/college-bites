import React, { useState, useContext, useEffect } from 'react';
import MenuBar from './MenuBar';
import ListingDriver from './listingDriver';
import './driverPortal.css';
import { getFirestore, collection, addDoc, getDoc, doc, getDocs } from 'firebase/firestore';
import { UserContext } from './UserContext';

const DriverPortal = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [listings, setListings] = useState([]);
  const [newListing, setNewListing] = useState({
    name: '',
    deliveryDate: '',
    destination: '',
    phoneNumber: '',
    address: '',
  });

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchListings = async () => {
      if (!user) {
        console.error("User not logged in. Cannot fetch listings.");
        return;
      }

      try {
        const db = getFirestore();
        const userDrivesRef = collection(db, 'users', user, 'drives');
        const querySnapshot = await getDocs(userDrivesRef);
        const fetchedListings = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListings(fetchedListings);
      } catch (error) {
        console.error("Error fetching listings: ", error);
      }
    };

    fetchListings();
  }, [user]);

  const handleNewListing = () => {
    setShowPopup(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewListing((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewListingSubmit = async () => {
    if (!/^\d{10}$/.test(newListing.phoneNumber)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    if (!newListing.address || newListing.address.trim().length === 0) {
      alert("Address cannot be empty.");
      return;
    }

    if (newListing.name && newListing.deliveryDate && newListing.destination) {
      const newEntry = {
        name: newListing.name,
        address: newListing.address,
        number: newListing.phoneNumber,
        id: listings.length + 1,
        deliveryDate: newListing.deliveryDate,
        destination: newListing.destination,
      };

      try {
        const db = getFirestore();

        if (!user) {
          console.error("User not logged in. Cannot add listing.");
          return;
        }

        // Add new entry under the user's uid in the drives collection
        const userDrivesRef = collection(db, 'users', user, 'drives');
        const docRef = await addDoc(userDrivesRef, newEntry);
        console.log("Document written with ID: ", docRef.id);

        // Push to global 'drives' collection
        const globalDrivesRef = collection(db, 'drives');
        await addDoc(globalDrivesRef, newEntry);
        console.log("Document also added to global 'drives' collection");

        setListings((prev) => [...prev, newEntry]);

        const drivesDocRef = doc(db, 'users', user, 'drives', docRef.id);
        const driveDoc = await getDoc(drivesDocRef);
        const driveData = driveDoc.data();
        console.log('Drive file exists in Firestore:', driveData);
        
        
      } catch (error) {
        console.error("Error adding document: ", error);
      }

      setShowPopup(false);
      setNewListing({ name: '', deliveryDate: '', destination: '', phoneNumber: '', address: '' }); // Reset form state
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setNewListing({ name: '', deliveryDate: '', destination: '' });
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
                type="text"
                id="name"
                name="name"
                className='username-input input-overlay'
                value={newListing.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
            </div>
            <div>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                className='username-input input-overlay'
                value={newListing.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <input
                type="text"
                id="address"
                name="address"
                className='username-input input-overlay'
                value={newListing.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
              />
            </div>
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