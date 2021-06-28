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
      const idDel = action.payload;
      let totalDel = state.total;
      const {items} = state;
      const itemIndexDel = items.findIndex(item => item.id === idDel);
      const itemDel = items[itemIndexDel];

      if ( itemDel.num > 1 ) {
        const newItem = {
          ...itemDel,
          num: itemDel.num - 1,
          total: itemDel.total - itemDel.price
        }
        totalDel -= itemDel.price;
        
        return {
          ...state,
          items: [
            ...items.slice(0, itemIndexDel),
            newItem,
            ...items.slice(itemIndexDel + 1)
          ],
          total: totalDel
        }
      }
      return {
        ...state,
        items: items.filter(item => item.id !== idDel) ,
        total: state.total - itemDel.price
      };

    default: 
      return state;
  }
}

export default reducer;