import React from 'react'
import MenuBar from './MenuBar'
import ListingDriver from './listingDriver';
import './driverPortal.css';

let listings = [
  {id: 1, deliveryDate: "01/05/2024", destination: "UTD"},
  {id: 2, deliveryDate: "03/12/2024", destination: "UT"},
  {id: 3, deliveryDate: "04/19/2025", destination: "UT Austin"}
];

const driverPortal = () => {
  return (
    <div>
      <div>
        <MenuBar/>
      </div>

      <div className='push line center'>

      </div>
      
      <div className="push">
      {listings.map((item) => (
        <ListingDriver key={item.id} item={item} />
      ))}
    </div>


    </div>
    
  )
}

export default driverPortal