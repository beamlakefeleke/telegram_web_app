import { useState, useEffect } from "react";



// import ReactDOM from "react-dom/client";
// import {Routes, Route, useNavigate} from 'react-router-dom';
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
  // function mainButtonClickedHandler() {
  //   tele.MainButton.openTelegramLink("https://shemeta.co/");
  // }

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
if (tele.MainButton.text === "view order"){
    
const inlineKeyboard = [
  [
    { text: "View Order"
    , callback_data: "view_order",
    
  },
  ],
];

// Handle button click events
tele.on("callback_query", (callbackQuery) => {
  const data = callbackQuery.data;
  const chatId = callbackQuery.message.chat.id;

  if (data === "view_order") {
    tele.MainButton.openTelegramLink("https://shemeta.co/");

    const orderDetails = "Here are your order details...";
    
    // You can choose to edit the current message or send a new message
    // In this example, let's edit the current message
    tele.editMessageText(orderDetails, {
      chat_id: chatId,
      message_id: callbackQuery.message.message_id,
      reply_markup: {
        inline_keyboard: inlineKeyboard,
      },
    });
  }
});

// Initial message with the "View Order" button
tele.sendMessage(838671675, "Click the button to view your order:", {
  reply_markup: {
    inline_keyboard: inlineKeyboard,
  },
});

} 


    // tele.MainButton.text = "view order";
    // tele.MainButton.show();
    //user id 838671675
    
    // tele.MainButton.onEvent('mainButtonClicked', mainButtonClickedHandler);
    // mainButtonClickedHandler();
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

