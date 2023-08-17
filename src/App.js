import { useState, useEffect } from "react";

import "./App.css";
// import List from "./List";
import Card from "./Components/Card/Card";
// import Checklist from "./Components/Checklist/Checklist";
// const { Telegraf } = require("telegraf");
// import { webApp } from "telegraf/typings/button";
import Cart from "./Components/Cart/Cart";
// import Cafe from "./Components/Cafe/Cafe";
const { getData } = require("./db/db.js");
// const { getCafe } = require("./db/dbcafe.js");
const foods = getData();
// const cafes = getCafe();

const tele = window.Telegram.WebApp;

function App() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    tele.ready();
  });


  const onAdd = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...food, quantity: 1 }]);
    }


    tele.MainButton.text = "view Order";
    tele.MainButton.show().onClick(() => {
      document.getElementById("section1").style.display = "none";
      var section2 = document.getElementById("section2");
      section2.style.display = "flex";
      section2.style.flexWrap = "wrap";
      section2.style.justifyContent = "center";
      tele.MainButton.hide();

    });
    //user id 838671675

  };

  const onRemove = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((x) => x.id !== food.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity - 1 } : x
        )
      );
    }
  };
  // const list=(food)=>{
  // const exist = cartItems.find((x) => x.id === food.id);
  // if (exist.quantity === 1){

  // }
  // }
  const onCheckout = () => {
    tele.MainButton.text = "Pay :)";
    tele.MainButton.show();
  };

  return (
    <>


      <div className="cards__container" id="section1">
        {foods.map((food) => {
          return (
            <Card food={food} key={food.id} onAdd={onAdd} onRemove={onRemove} />
          );
        })}
      </div>

      <div className="section2" id="section2">
        <h1 className="heading">Order Food</h1>
        <Cart cartItems={cartItems} onCheckout={onCheckout} />
        <div className="arrow-back">
          <span className="back-arrow">&#8592;</span> {/* Unicode arrow character */}
          Back
        </div>

        <div className="horizontal-card-list">
          {cartItems.map((item, index) => (
            <div className="cards" key={index}>
              <img src={item.imageSrc} alt={item.title} className="card-image" />
              <div className="card-details">
                <h2 className="card-title">{item.title}</h2>
                <h2 className="card-title">{item.title}</h2>
                <p className="card-price">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  );
}


export default App;

