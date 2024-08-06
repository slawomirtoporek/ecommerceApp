import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { initialState as orderItemsInitialState } from './orderItemsRedux';

// import reducers
import albums from './albumsRedux';
import orders from './ordersRedux';
import orderItems from './orderItemsRedux';

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state.orderItems);
    localStorage.setItem('cartState', serializedState);
  } catch (e) {
    console.error(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('cartState');
    if (serializedState === null) {
      return {
        orderItems: orderItemsInitialState,
      };
    }
    const parsedState = JSON.parse(serializedState);
    return {
      orderItems: {
        items: Array.isArray(parsedState.items) ? parsedState.items : [],
        total: typeof parsedState.total === 'number' ? parsedState.total : 0,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      orderItems: orderItemsInitialState,
    };
  }
};

const initialState = loadFromLocalStorage();

const localStorageMiddleware = store => next => action => {
  const result = next(action);
  saveToLocalStorage(store.getState());
  return result;
};

// Combine reducers
const rootReducer = combineReducers({
  albums,
  orders,
  orderItems,
});

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk, localStorageMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);

export default store;