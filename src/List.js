import React, { useState } from "react";

import Button from "./Components/Button/Button";
import Card from "./Components/Card/Card";
// import Cart from "./Components/Cart/Cart";
import Checklist from "./Components/Checklist/Checklist"; // Import the Checklist component

import { getData } from "./db/db"; // Import your data from the database file

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // Function to handle adding items to the cart
  const handleAddToCart = (food) => {
    const existingItemIndex = cartItems.findIndex((item) => item.id === food.id);
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity++;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...food, quantity: 1 }]);
    }
  };

  // Function to handle removing items from the cart
  const handleRemoveFromCart = (food) => {
    const existingItemIndex = cartItems.findIndex((item) => item.id === food.id);
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity--;
      if (updatedCartItems[existingItemIndex].quantity === 0) {
        updatedCartItems.splice(existingItemIndex, 1);
      }
      setCartItems(updatedCartItems);
    }
  };

  const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);

  return (
    <div className="cart__container">
      <div className="card__container">
        {getData().map((food) => (
          <Card
            key={food.id}
            food={food}
            onAdd={handleAddToCart}
            onRemove={handleRemoveFromCart}
          />
        ))}
      </div>
      <Checklist cartItems={cartItems} /> {/* Render the Checklist component */}
      <span className="">Total Price: ${totalPrice.toFixed(2)}</span>
      <Button
        title={`${cartItems.length === 0 ? " Order !" : " Checkout " } ` }
        type={ "checkout" }
        disable ={cartItems.length === 0 ? true : false}
        onClick={() => {
          // Your checkout logic here
          console.log("Checkout clicked!");
        }}
      />
    </div>
  );
}

export default Cart;
