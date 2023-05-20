import handleCart from "./handleCart";
import handleCategory from "./handleCategory";
import { combineReducers } from "redux";
import handleProduct from "./handleProduct";

const rootReducers = combineReducers({
    handleCart,
    handleCategory,
    handleProduct
})

export default rootReducers;