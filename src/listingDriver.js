import React from 'react';
import './listingDriver.css';

const listingDriver = ({ item }) => {
  return (
    <div className='box center'>
      {item.deliveryDate}, {item.destination}
    </div>
  )
}

export default listingDriver