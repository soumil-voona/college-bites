import React, { createContext, useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve user uid from localStorage on initialization
    return localStorage.getItem('user') || null; // Store only uid
  });

  useEffect(() => {
    // Store user data in localStorage whenever it changes
    if (user) {
      localStorage.setItem('user', user); // Store only uid
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return null; // If no uid is stored, return null
    try {
      const db = getFirestore();
      const userDoc = await getDoc(doc(db, 'users', user));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.error('Fetched user data:', userData);
        return userData; // Return full user data
      } else {
        console.error('No such user document!');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  const logout = () => {
    setUser(null); // Clear user state
    localStorage.removeItem('user'); // Remove user from localStorage
  };

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserData, logout }}>
      {children}
    </UserContext.Provider>
  );
};
