import React from "react";
import MenuBar from "./MenuBar";

const ProductPage = () => {
  const handleDeliverClick = () => {
    window.location.href = '/checkout';
  };
  return (
    <div className="product-page">
      <MenuBar />
      <div className="content-wrapper">
        <p className="product-description">
          Send food to your college student. Drop off the containers at the driver's house!
        </p>
        <button className="product-button" onClick={handleDeliverClick}>Deliver Food</button>
      </div>
    </div>
  );
};

export default ProductPage;

/* CSS */
const styles = `
.product-page {
  background-color: #E0BABB;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}

.content-wrapper {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  text-align: center;
}

.product-description {
  font-size: 1.2rem;
  color: #5B0E02;
  max-width: 400px;
  margin-bottom: 1.5rem;
  font-weight: 500;
  line-height: 1.5;
}

.product-button {
  background: linear-gradient(135deg, #8B0000, #B22222);
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 1.2rem 2.5rem;
  border-radius: 50px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  transition: background 0.3s, transform 0.2s;
  border: none;
  cursor: pointer;
}

.product-button:hover {
  background: linear-gradient(135deg, #6A0000, #A52A2A);
  transform: translateY(-3px);
}

.product-button:active {
  transform: translateY(1px);
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
