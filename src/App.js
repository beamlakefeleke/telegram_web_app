import { useState, useEffect } from "react";

import "./App.css";
// import List from "./List";
import Card from "./Components/Card/Card";
// import Checklist from "./Components/Checklist/Checklist";
// const { Telegraf } = require("telegraf");
// import { webApp } from "telegraf/typings/button";
// import Cart from "./Components/Cart/Cart";
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

  
    tele.MainButton.text = "view order";
    tele.MainButton.show();
    tele.onEvent('mainButtonClicked', function(e) {
      tele.MainButton.showProgress()
      
      tele.openTelegramLink("https://shemeta.co/");
      
    })
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

  // const onCheckout = () => {
  //   tele.MainButton.text = "Pay :)";
  //   tele.MainButton.show();
  // };

  return (
    <>
      {/* <h1 className="heading">Order Food</h1>
      <Cart cartItems={cartItems} onCheckout={onCheckout}/> */}

      <div className="cards__container">
        {foods.map((food) => {
          return (
            <Card food={food} key={food.id} onAdd={onAdd} onRemove={onRemove} />
          );
        })}
      </div>
    </>
  );
}


export default App;

