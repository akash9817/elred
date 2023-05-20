export const setProduct = (product) => {
    return {
        type : "SET_PRODUCT",
        payload : product
    }
}

export const setAllProducts = (product) => {
    return {
        type : "SET_ALL_PRODUCT",
        payload : product
    }
}
