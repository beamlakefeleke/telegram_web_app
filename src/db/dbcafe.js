import pizzaImg from "../images/pizza.png";
import burgerImg from "../images/burger.png";
import cocaImg from "../images/coca.png";
import kebabImg from "../images/kebab.png";

export function getCafe() {
  return [
    { title: "Pizza hut", Image: pizzaImg, id:1 },
    { title: "Chicken hut", Image: burgerImg,id:2 },
    { title: "Aroma Pizza and burger",  Image: cocaImg ,id:3},
    { title: "durger Pizza and burger", Image: kebabImg,id:4 },
   
  ];
}
