import { useState, useEffect } from "react";
// import "./vendor.css";
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

function updateTelegramtheme() {


function parseColorToHex(color) {
  color += '';
  var match;
  if (match = /^\s*#([0-9a-f]{6})\s*$/i.exec(color)) {
    return '#' + match[1].toLowerCase();
  }
  else if (match = /^\s*#([0-9a-f])([0-9a-f])([0-9a-f])\s*$/i.exec(color)) {
    return ('#' + match[1] + match[1] + match[2] + match[2] + match[3] + match[3]).toLowerCase();
  }
  else if (match = /^\s*rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)\s*$/.exec(color)) {
    var r = parseInt(match[1]), g = parseInt(match[2]), b = parseInt(match[3]);
    r = (r < 16 ? '0' : '') + r.toString(16);
    g = (g < 16 ? '0' : '') + g.toString(16);
    b = (b < 16 ? '0' : '') + b.toString(16);
    return '#' + r + g + b;
  }
  return false;
}


// Wait for the Telegram WebApp to be ready
document.addEventListener('TelegramWebAppLoaded', function () {
  // Get the background color of the document's body
  var style = window.getComputedStyle(document.body);
  var bg_color = parseColorToHex(style.backgroundColor || '#fff');
  var text_color = '#fff';
  // Set the background color for the Telegram WebApp
  tele.setBackgroundColor(bg_color);
  tele.setTextColor(text_color);
});
}
// Call the function when your script is loaded (optional)
updateTelegramtheme();


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
      
      var st=0;
      tele.BackButton.show().onClick(() => {
        
          if (st===0) {
          document.activeElement && document.activeElement.blur();
          document.getElementById("section2").style.display = "none";
          var section1 = document.getElementById("section1");
          section1.style.display = "flex";
          section1.style.flexWrap = "wrap";
          section1.style.justifyContent = "center";

          st=1;
            }
          if(st===1){
              tele.BackButton.hide();
            }
        });
      
      

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
    tele.MainButton.show().onClick(()=>{
      
      
    });
  
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
       
        <div className="vertical-card-list">
          {cartItems.map((item, index) => (
            <div className="cards" key={index}>
              <img src={item.Image} alt={item.title} className="card-image" />
              <div className="card-details">
                {/* <h2 className="card-title">{item.title}</h2> */}
                <h2 className="card-title">{item.title}</h2>
              </div>
              <p className="card-price">${item.price}</p>
            </div>
          ))}
        </div>
        {/* Comment Input Box */}
<div className="comment-input">
  <label htmlFor="comment">Add Comment:</label>
  <textarea
    id="comment"
    className="comment-textarea"
    rows="4"
    placeholder="Enter your comment here..."
   
  ></textarea>
</div>

      </div>

    </>
  );
}


export default App;

