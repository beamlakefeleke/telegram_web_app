import React from "react";
import "./Checklist.css"; // You can create a CSS file for Checklist styling if needed

function Checklist({ cartItems }) {
  return (
    <div className="checklist__container">
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>{`${item.title} x ${item.quantity}`}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Checklist;
