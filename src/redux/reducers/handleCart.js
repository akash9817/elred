const cartItems = [];

const handleCart = (state = cartItems, action) => {
  switch (action.type) {
    case "ADDITEM":
      let cartValues = [...state];
      let index = cartValues.findIndex((e) => e._id == action.payload._id);
      if (index > -1) {
        let quantity = Number(cartValues[index].quantity);
        cartValues[index].quantity = quantity + Number(action.payload.quantity);
      } else {
        cartValues.push(action.payload);
      }

      return [...cartValues];
      break;

    case "DELITEM":
      return (state = state.filter((x) => {
        return x._id !== action.payload._id;
      }));
      break;

    case "CLEARTITEM":
      return [];
      break;
      
    default:
      return state;
      break;
  }
};

export default handleCart;
