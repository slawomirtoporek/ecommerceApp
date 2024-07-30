import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// import reducers
import albums from './albumsRedux';
import orders from './ordersRedux';
import orderItems from './orderItemsRedux';

// combine reducers
const rootReducer = combineReducers({
    albums,
    orders,
    orderItems,
});

const store = createStore(
  rootReducer,
  compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
	)
);

export default store;