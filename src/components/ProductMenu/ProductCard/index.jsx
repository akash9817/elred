import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import style from "./style.module.scss";
import { images, icons } from "helpers/images";
import { useDispatch } from "react-redux";
import { setAllProducts, setProduct } from "redux/actions/productAction";

function ProductCard({ data, onClick }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setProduct(data));
    dispatch(setAllProducts(data)) 
    onClick();
  }

  return (
    <Card
      className={style.productCard}
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasRight"
      aria-controls="offcanvasRight"
      onClick={() => handleClick() }
    >
      <img src={icons.favorites} className={style.heartIcon} />
      <Card.Img
        variant="top"
        src={data.productImages[0] || images.defaultProduct}
        className={style.productImage}
      />
      <Card.Body>
        <Card.Title>{data.itemDescription}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
