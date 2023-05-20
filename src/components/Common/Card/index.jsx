import React, { useState } from "react";

import style from "./style.module.scss";
import { images } from "helpers/images";

function Card({categoryName, imageUrl, className, id, activeCategory, onClick }) {
  return (
    <div className={`${style.card} ${className} ${id==activeCategory ? style.active : ''}`} onClick={() => onClick(id)}>
        <img src={imageUrl || images.defaultCategory} alt="product"/>
        <h6>{categoryName}</h6>
    </div>    
  );
}

export default Card;
