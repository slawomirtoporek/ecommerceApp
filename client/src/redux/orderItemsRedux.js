/* SELECTORS */
export const getCartItems = ({ orderItems }) => orderItems.items;
export const getCartTotal = ({ orderItems }) => orderItems.total;

/* ACTIONS */

// action name creator
const reducerName = 'orderItems';
const createActionName = name => `app/${reducerName}/${name}`;

// actions
const ADD_TO_CART = createActionName('ADD_TO_CART');
const REMOVE_FROM_CART = createActionName('REMOVE_FROM_CART');
const CLEAR_CART = createActionName('CLEAR_CART');
const UPDATE_CART_ITEM = createActionName('UPDATE_CART_ITEM');

// actions creators
export const addToCart = (item) => ({ type: ADD_TO_CART, payload: item });
export const removeFromCart = (index) => ({ type: REMOVE_FROM_CART, payload: index });
export const clearCart = () => ({ type: CLEAR_CART });
export const updateCartItem = (index, quantity) => ({type: UPDATE_CART_ITEM, payload: { index, quantity }});

/* THUNKS */
export const addToCartRequest = (item) => {
  return (dispatch) => {
    dispatch(addToCart(item));
  };
};

export const removeFromCartRequest = (index) => {
  return (dispatch, getState) => {
    const state = getState();
    const currentCart = state.orderItems;
    if (currentCart.items[index]) {
      const itemPrice = currentCart.items[index].price;
      const itemQuantity = currentCart.items[index].quantity;
      dispatch(removeFromCart(index));

      const updatedCart = {
        ...currentCart,
        items: currentCart.items.filter((_, i) => i !== index),
        total: currentCart.total - (itemPrice * itemQuantity),
      };
      localStorage.setItem('cartState', JSON.stringify(updatedCart));
    }
  };
};

export const clearCartRequest = () => {
  return (dispatch) => {
    dispatch(clearCart());
  };
};

export const updateCartItemRequest = (index, quantity) => {
  return (dispatch, getState) => {
    const state = getState();
    const currentCart = state.orderItems;
    if (currentCart.items[index]) {
      const itemPrice = currentCart.items[index].price;
      const quantityDifference = quantity - currentCart.items[index].quantity;
      dispatch(updateCartItem(index, quantity));

      const updatedCart = {
        ...currentCart,
        items: currentCart.items.map((item, i) =>
          i === index ? { ...item, quantity } : item
        ),
        total: currentCart.total + (itemPrice * quantityDifference),
      };
      localStorage.setItem('cartState', JSON.stringify(updatedCart));
    }
  };
};

/* INITIAL STATE */
export const initialState = {
  items: [],
  total: 0,
};

/* REDUCER */
export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...statePart,
        items: [...statePart.items, action.payload],
        total: statePart.total + (action.payload.price * action.payload.quantity),
      };
    case REMOVE_FROM_CART:
      const updatedItems = [...statePart.items];
      const removedItem = updatedItems.splice(action.payload, 1)[0];
      return {
        ...statePart,
        items: updatedItems,
        total: statePart.total - (removedItem.price * removedItem.quantity),
      };
    case CLEAR_CART:
      return initialState;
    case UPDATE_CART_ITEM: {
      const { index, quantity } = action.payload;
      const updatedItems = [...statePart.items];

      if (quantity > 0) {
        const itemPrice = updatedItems[index].price;
        const quantityDifference = quantity - updatedItems[index].quantity;

        updatedItems[index] = {
          ...updatedItems[index],
          quantity
        };

        return {
          ...statePart,
          items: updatedItems,
          total: statePart.total + (itemPrice * quantityDifference),
        };
      }

      return statePart;
    }
    default:
      return statePart;
  }
}