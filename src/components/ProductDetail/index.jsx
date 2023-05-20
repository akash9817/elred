import React, { useEffect, useRef, useState } from "react";
import style from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Cart from "components/Common/Cart";
import { images } from "helpers/images";
import { Button, Form } from "react-bootstrap";
import { addItem, delItem } from "redux/actions/cartAction";
import { setProduct } from "redux/actions/productAction";

function ProductDetail({ cardClick, cartProductDetail }) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state?.handleProduct?.selectedProduct);
  const allProducts = useSelector((state) => state?.handleProduct?.allProducts);
  const cartState = useSelector((state) => state.handleCart);
  const color = [
    ...new Set(product?.variants?.map((item) => item.colorDescription)),
  ];
  const packagingArr = product?.variants
    ?.filter?.((item) => item.colorDescription == color[0])
    ?.map((item) => item.packingDescription);
  const [activeVariant, setActiveVariant] = useState();
  const [componentMount, setComponentMount] = useState(false);
  const [activeColor, setActiveColor] = useState();
  const [packaging, setPackaging] = useState([]);
  const [colors, setColors] = useState([]);
  const [activePackaging, setActivePackaging] = useState();
  const [isError, setIsError] = useState();
  const [cart, setCart] = useState(cartState);
  const [quantity, setQuantity] = useState('');
  
  const offcanvasRef = useRef(null);
  const inputRef = useRef();

  useEffect(() => {
    setActiveColor(color[0]);
    setColors(color)
    setPackaging(packagingArr);
    setActivePackaging(packagingArr?.[0]);
    setActiveVariantFunc(color[0], packagingArr?.[0]);
    setComponentMount(true);
    if(!cartProductDetail){
      setCart(cartState)
    }
  }, [cardClick]);

  const handleActiveVariant = (
    color = activeColor,
    packaging = activePackaging
  ) => {
    if (color != activeColor) {
      const packagingArr = product?.variants
        ?.filter?.((item) => item.colorDescription == color)
        ?.map((item) => item.packingDescription);
      setPackaging(packagingArr);
      setActivePackaging(packagingArr[0]);
      setActiveVariantFunc(color, packagingArr[0]);
      setActiveColor(color);
    } else {
      setActivePackaging(packaging);
      setActiveVariantFunc(color, packaging);
    }
  };

  const setActiveVariantFunc = (color, packaging) => {
    let active = product?.variants?.filter(
      (e) => e.colorDescription == color && e.packingDescription == packaging
    )[0];
    setActiveVariant(active);
  };

  const addProduct = () => {
    const value = inputRef.current.value;
    if (value == "") {
      setIsError("Please enter quantity");
      return;
    } else if (value < 12) {
      setIsError("Minimum order 12");
      return;
    } else if (value > 100) {
      setIsError("Maximum order 100");
      return;
    }
    let productBody = {
      itemNumber : product?.itemNumber,
      name: product?.itemDescription,
      image: product?.productImages?.[0] || images.defaultProduct,
      quantity: value,
      ...activeVariant,
    };

    dispatch(addItem(productBody))
    //setCart(cartValues);
    setIsError("");
  };

  const addToCart = () => {
   // setCart([])
    offcanvasRef.current.click();
  };

  const deleteProduct = (e , product) => {
      e.stopPropagation();
      dispatch(delItem(product))
     // let cartValues =  cart.filter(e => e._id != product._id)
     // setCart(cartValues)
  }

  const selectProduct = (productValue) => {
    let product = allProducts.find(e => e.itemNumber == productValue.itemNumber)
    const color = [
      ...new Set(product?.variants?.map((item) => item.colorDescription)),
    ];
    const packagingArr = product?.variants
      ?.filter?.((item) => item.colorDescription == color[0])
      ?.map((item) => item.packingDescription);
    let activeVariant = product?.variants?.filter(e => e._id == productValue._id)[0]
    setActiveColor(activeVariant?.colorDescription);
    setPackaging(packagingArr);
    setActivePackaging(activeVariant?.colorDescription);
    setColors(color)
    setActiveVariant(activeVariant)
    setQuantity(productValue?.quantity || '')
    dispatch(setProduct(product))
}
 
  return (
    <div
      className={`offcanvas offcanvas-end w-auto`}
      tabIndex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
     
    >
      {componentMount && (
        <div className={style.productDetailSection}>
          <div className="offcanvas-header d-flex justify-content-between px-5">
            {" "}
            <h4>{product?.itemDescription}</h4>
            <h4>Order List</h4>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              ref={offcanvasRef}
            ></button>
          </div>

          <div className="offcanvas-body d-flex vh-100 pt-0">
            <div className={style.productSectionLeft}>
              <div>
                <h5 id="offcanvasRightLabel"></h5>
              </div>
              <div className={style.productDetailImage}>
                <img
                  src={product?.productImages?.[0] || images.defaultProduct}
                  alt="product image"
                />
              </div>
              <div className={style.productInfo}>
                <p>{activeVariant?.bpCatalogNumber}</p>
                <div className="d-flex justify-content-between">
                  <h5>{product?.itemDescription}</h5>
                  <h5>₹ {activeVariant?.grossPrice}</h5>
                </div>
                <p>{activeVariant?.saleDescription}</p>
              </div>
              <div>
                <label className="h6 mb-3">Please Select Color Description</label>
                <div className={style.productVariants}>
                  {colors?.map((e, i) => (
                    <span
                      key={i}
                      className={
                        activeVariant?.colorDescription == e ? style.active : ""
                      }
                      onClick={() => handleActiveVariant(e, activePackaging)}
                    >
                      {e}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-5">
                <label className="h6 mb-3">Please Select Packaging Description</label>
                <div className={style.productVariants}>
                  {packaging?.map((e, i) => (
                    <span
                      key={i}
                      className={
                        activeVariant?.packingDescription == e
                          ? style.active
                          : ""
                      }
                      onClick={() => handleActiveVariant(activeColor, e)}
                    >
                      {e}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-5">
                <label className="h6 mb-3">Enter Quantity</label>
                <Form className={style.searchBar}>
                  <Form.Control
                    type="number"
                    value={quantity}
                    className={`${style.searchInput} w-50`}
                    aria-label="quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                    ref={inputRef}
                  />
                  {(isError == "" || isError) && (
                    <Form.Text id="passwordHelpBlock" className="text-danger">
                      {isError}
                    </Form.Text>
                  )}
                </Form>
                <Form.Group className="my-3">
                  <Form.Check required label="Need Urgent Order" />
                </Form.Group>
              </div>
              <div className="mt-4 text-center">
                <Button
                  variant="outline-danger"
                  className="py-2 px-5"
                  onClick={() => addProduct()}
                >
                  Add
                </Button>
              </div>
            </div>
            <div className={style.productSectionRight}>
              <Cart data={cartState} deleteProduct={deleteProduct} selectProduct={selectProduct} />
              <div className="mt-5 text-center">
                <Button
                  variant="danger"
                  className="py-2 px-5"
                  onClick={() => addToCart()}
                >
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default ProductDetail;
