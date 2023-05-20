import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Cart from "components/Common/Cart";
import { Button, Form } from "react-bootstrap";
import ModalComponent from "components/Common/Modal";
import { clearItem, delItem } from "redux/actions/cartAction";
import ProductDetail from "components/ProductDetail";
import { Toast } from "services/toast";

function CartMenu() {
  const cart = useSelector((state) => state.handleCart);
  const [showModal, setShowModal] = useState(false);
  const [cartTotal, setCartTotal] = useState({});
  const [cardClick, setCardClick] = useState('')
  const dispatch = useDispatch();

  useEffect(() => {
    if (cart.length > 0) {
      calculateCartTotal();
    }
  }, [cart]);

  const openProductDetail = () => {
    setCardClick((Math.random() + 1).toString(36).substring(7))
  }

  const clearCart = () => {
    dispatch(clearItem())
  };

  const placeOrder = () => {
    clearCart()
    Toast({
      type: "success",
      message: "Order placed",
    });
   
  };

  const deleteProduct = (e, product) => {
    e.stopPropagation();
    dispatch(delItem(product));
    // let cartValues =  cart.filter(e => e._id != product._id)
    // setCart(cartValues)
  };

  const onClose = () => {
    setShowModal(false);
  };

  const calculateCartTotal = () => {
    let itemsTotal = 0;
    cart.forEach((e) => {
      itemsTotal += Number(e.grossPrice) * Number(e.quantity);
    });
    let cgst, igst, sgst;
    cgst = (9 / 100) * itemsTotal;
    igst = (9 / 100) * itemsTotal;
    sgst = (9 / 100) * itemsTotal;
    let taxAmount = cgst + igst + sgst;
    let ordersTotal = itemsTotal + taxAmount;
    let cartObj = {
      itemsTotal,
      cgst,
      igst,
      sgst,
      taxAmount,
      ordersTotal,
    };
    setCartTotal(cartObj);
  };

  return (
    <section className={style.cartMenuSection}>
      <Cart data={cart} isCartMenu={true} openProductDetail={openProductDetail}/>
      {cart.length > 0 && (
        <>
          {cart.length > 3 && (
            <div
              className={`d-flex justify-content-center ${style.cartMenuSeeAll}`}
            >
              <h6
                role="button"
                className="text-danger"
                onClick={() => setShowModal(true)}
              >
                See all
              </h6>
            </div>
          )}
          <div
            className={`d-flex justify-content-between ${style.otherInstruction}`}
          >
            <p className="h6">Other Instruction</p>
            <h6 className="text-danger">Add</h6>
          </div>
          <div className={style.cartBillInfo}>
            <p className="h6">Purchase order number</p>
            <Form.Control
              type="text"
              value="1011564321"
              disabled
              className={`${style.searchInput}`}
              aria-label="Search"
            />
            <div className={`${style.address}`}>
              <div className="d-flex justify-content-between">
                <p className="h6">Address</p>
                <h6 className="text-danger">View</h6>
              </div>
              <span>Office 28. Rajanthani udhyog nagar, G.T, Karnal</span>
            </div>
            <div className={style.cartTotal}>
              <div className={style.cartTotalLabel}>
                <span>Items total</span>
                <span>₹ {cartTotal?.itemsTotal}</span>
              </div>
              <div className={style.cartTotalLabel}>
                <span>SGST (9%)</span>
                <span>₹ {cartTotal?.sgst}</span>
              </div>
              <div className={style.cartTotalLabel}>
                <span>CGST (9%)</span>
                <span>₹ {cartTotal?.cgst}</span>
              </div>
              <div className={style.cartTotalLabel}>
                <span>IGST (9%)</span>
                <span>₹ {cartTotal?.igst}</span>
              </div>
              <div className={style.cartTotalLabel}>
                <span>Taxable Amount</span>
                <span>₹ {cartTotal?.taxAmount}</span>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <p className="h6">Order Total</p>
              <h6>₹ {cartTotal?.ordersTotal}</h6>
            </div>
            <div className="d-flex justify-content-between my-3">
              <Button
                variant="outline-dark"
                className="py-2 px-5"
                onClick={() => clearCart()}
              >
                Clear Cart
              </Button>
              <Button
                variant="danger"
                className="py-2 px-5"
                onClick={() => placeOrder()}
              >
                Place Order
              </Button>
            </div>
          </div>
        </>
      )}
      {showModal && (
        <ModalComponent title={'Order List'} handleClose={onClose} show={showModal}>
          <Cart
            data={cart}
            deleteProduct={deleteProduct}
          />
        </ModalComponent>
      )}
      <ProductDetail cardClick={cardClick} cartProductDetail={false}/>
    </section>
  );
}

export default CartMenu;
