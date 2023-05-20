import React from "react";
import style from "./style.module.scss";
import { icons } from "helpers/images";


function Cart({ data = [], deleteProduct, isCartMenu, selectProduct, openProductDetail }) {
  let cartData = isCartMenu ? data.slice(0, 3) : data;
  return (
    <section className={style.cartSection}>
      <div className={`${style.cartTableHeader}`}>
        <div className="row py-3 px-2">
          <span className="col-5">Product</span>
          <span className="col-2">Quantity</span>
          <span className="col-3">Price</span>
          <span className="col-2">
            {isCartMenu && cartData.length > 0 ? (
              <span
                role="button"
                className="text-danger "
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
                onClick={openProductDetail}
              >
                Edit
              </span>
            ) : (
              ""
            )}
          </span>
        </div>
      </div>
      <div className={style.cartTableBody}>
        {cartData.length == 0 ? (
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: "400px" }}
          >
            <h3>No items added yet</h3>
          </div>
        ) : (
          cartData.map((e) => (
            <div
              role="button"
              className="row px-3 my-3"
              onClick={() => selectProduct(e)}
            >
              <span className="col-5">
                <div className={style.cartProductInfo}>
                  <div className={style.cartProductImg}>
                    <img src={e.image} alt="product" />
                  </div>
                  <div>
                    <p>{e.name}</p>
                    <span>{e.saleDescription}</span>
                  </div>
                </div>
              </span>
              <span className="col-2 d-flex align-items-center">
                {e.quantity}
              </span>
              <span className="col-3 d-flex align-items-center">
                ₹ {Number(e.quantity) * Number(e.grossPrice)}
              </span>
              {!isCartMenu && (
                <span
                  role="button"
                  className="col-2 d-flex align-items-center"
                  style={{ width: "55px" }}
                  onClick={(eve) => deleteProduct(eve, e)}
                >
                  <img src={icons.cross} className="w-100" />
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Cart;
