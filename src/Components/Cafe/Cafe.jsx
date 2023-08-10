import React from "react";
import "./Cafe.css";

function Cafe({ Cafelist }) {
  const { title, Image } = Cafelist;

  return (
    <div className="card">
      <div className="image__container">
        <img src={Image} alt={title} />
      </div>
      <h4 className="card__title">{title}</h4>
    </div>
  );
}

export default Cafe;
