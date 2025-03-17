import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Added useLocation hook
import "./checkoutPage.css";

const CheckoutPage = () => {
  const location = useLocation(); // Retrieve state passed from the previous page
  const navigate = useNavigate(); // Use useNavigate hook

  // Initial state for formData
  const [formData, setFormData] = useState({
    name: "",
    creditCard: "",
    address: "",
    billingAddress: "",
    expirationDate: "",
    orderAmount: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  // Prefill form data if available in location.state
  useEffect(() => {
    if (location.state && location.state.formData) {
      setFormData({
        ...location.state.formData, // Set formData from location state
      });
    }
  }, [location.state]); // Re-run when location state changes

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Automatically format expiration date as MM/YY
  const handleExpirationDateChange = (e) => {
    let { value } = e.target;

    // Remove any non-numeric characters
    value = value.replace(/\D/g, "");

    // Insert slash after two digits for month (MM/YY)
    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }

    setFormData({ ...formData, expirationDate: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData); // Log the data for now

    // After submitting, redirect to confirmation page with the address data
    navigate("/confirmation", { state: { address: formData.address, formData } });
  };

  return (
    <div className="checkout-container">
      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2 className="checkout-title">Checkout</h2>

        <div className="input-group">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            name="creditCard"
            placeholder="Credit Card Number"
            value={formData.creditCard}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            name="billingAddress"
            placeholder="Billing Address"
            value={formData.billingAddress}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            name="expirationDate"
            placeholder="MM/YY"
            value={formData.expirationDate}
            onChange={handleExpirationDateChange}
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            name="orderAmount"
            placeholder="Order Amount (#)"
            value={formData.orderAmount}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={formData.cvv}
            onChange={handleChange}
          />
        </div>

        <button className="checkout-button" type="submit">
          Proceed to Checkout
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
