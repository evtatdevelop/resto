const initialState = {
  menu: [],
  loading: true,
  items: [],
  total: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MENU_LOADED': 
      return {
        ...state,
        menu: action.payload,
        loading: false,
      };
    
    case 'MENU_REQUESTED': 
      return {
        ...state,
        menu: state.menu,
        loading: true,
      };
    
    case 'ADD_TO_CART':
      const id = action.payload;
      let total = state.total;

      const itemIndex = state.items.findIndex(item => item.id === id);
      if (itemIndex !== -1) {
        const {items} = state;
        const itemTotal = items[itemIndex].price * (items[itemIndex].num + 1);
        total += items[itemIndex].price;
        
        const newItem = {
          ...items[itemIndex],
          num: items[itemIndex].num + 1,
          total: itemTotal 
        }

        return {
          ...state,
          items: [
            ...items.slice(0, itemIndex),
            newItem,
            ...items.slice(itemIndex + 1)
          ],
          total
        }
      }

      const item = state.menu.find(item => item.id === id);
      const newItem = {
        ...item,
        num: 1,
        total: item.price
      }
      total += newItem.total;

      return {
        ...state,
        items: [
          ...state.items,
          newItem
        ],
        total
      };

    case 'DEL_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload) 
      };

    default: 
      return state;
  }
}

export default reducer;