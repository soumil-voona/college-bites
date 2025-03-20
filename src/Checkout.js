import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Import Firestore functions

const Checkout = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const driverId = queryParams.get("driverId"); // Extract the 'driverId' query parameter
  const [driver, setDriver] = useState(null);

  useEffect(() => {
    const fetchDriver = async () => {
      if (driverId) {
        try {
          const db = getFirestore();
          const driverDoc = await getDoc(doc(db, "drives", driverId)); // Fetch driver document by ID
          if (driverDoc.exists()) {
            setDriver(driverDoc.data());
          } else {
            console.error("No such driver document!");
          }
        } catch (error) {
          console.error("Error fetching driver data:", error);
        }
      }
    };

    fetchDriver();
  }, [driverId]);

  return (
    <div>
      <h1>Checkout</h1>
      {driver ? (
        <div>
          <p><b>Name:</b> {driver.name}</p>
          <p><b>Address:</b> {driver.address}</p>
          <p><b>Phone Number:</b> {driver.number}</p>
        </div>
      ) : (
        <p>Loading driver details...</p>
      )}
    </div>
  );
};

export default Checkout;