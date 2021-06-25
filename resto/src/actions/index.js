const menuLoaded = (newMenu) => {
  return {
    type: 'MENU_LOADED',
    payload: newMenu,
  };
};

const menuRequested = () => {
  return {
    type: 'MENU_REQUESTED'
  };
};

const delFromCart = (id) => {
  return {
    type: 'DEL_FROM_CART',
    payload: id
  }
}

const addedToCart = (id) => {
  return {
    type: 'ADD_TO_CART',
    payload: id
  }
}

export {
  menuLoaded,
  menuRequested,
  addedToCart,
  delFromCart
}