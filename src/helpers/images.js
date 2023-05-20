const importImage = (fileName) => {
    return require(`../assets/images/${fileName}`);
  };
  
  const importIcons = (fileName) => {
    return require(`../assets/icons/${fileName}`);
  };
  
  export const images = {
    logo: importImage("logo.png"),
    user: importImage('user.png'),
    defaultCategory : importImage("defaultImage.jpg"),
    defaultProduct : importImage('defaultProduct.png')
  };
  
  export const icons = {
    dashboard: importIcons("dashboard.svg"),
    allProducts: importIcons("products.svg"),
    orders: importIcons("orders.svg"),
    favorites: importIcons("favorite.svg"),
    newArrival: importIcons("newArrival.svg"),
    search: importIcons('search.png'),
    home : importIcons('home.svg'),
    leftArrow : importIcons('leftArrow.svg'),
    cross : importIcons('cross.svg')
  };