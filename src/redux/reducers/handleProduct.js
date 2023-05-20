const product = {
    allProducts : [],
    selectedProduct : {}
};

const handleProduct = (state = product, action) => {
    switch (action.type) {

        case 'SET_ALL_PRODUCT' : 
        let products = [...state?.allProducts]
        let index = products.findIndex(e => e.productId == action.payload?.productId)
        if(index == -1){
            return {
                ...state,
                allProducts : [...products, action.payload]
            }
        }else{
            return{
                ...state
            }
        }
        break;

        case "SET_PRODUCT" : return {
            ...state,
            selectedProduct : action.payload
        }
        break;

        default: return state;

        
    }
}

export default handleProduct;