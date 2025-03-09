import React from 'react';
import './listingDriver.css';

const listingDriver = ({ item }) => {
  return (
    <div className='box center'>
      <span>
        {item.deliveryDate}
      </span>
      <span className='align-end'>
        {item.destination}
      </span>
    </div>
  )
}

export default listingDriver