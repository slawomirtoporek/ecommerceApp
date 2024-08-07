import axios from 'axios';
import { API_URL } from "../config";

/* SELECTORS */
export const getOrders = ({ orders }) => orders.data;
export const getRequests = ({ orders }) => orders.requests;

/* ACTIONS */

// action name creator
const reducerName = 'orders';
const createActionName = name => `app/${reducerName}/${name}`;

// actions
const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');
const POST_ORDER = createActionName('POST_ORDER');

// action creators
export const postOrder = payload => ({ payload, type: POST_ORDER });
export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });

/* THUNKS */
export const postOrderRequest = (orderData) => {
  return async dispatch => {
    dispatch(startRequest({ name: 'POST_ORDER' }));
    try {
      const res = await axios.post(`${API_URL}/orders`, orderData, {
        withCredentials: true
      });
      dispatch(postOrder(res.data));
      dispatch(endRequest({ name: 'POST_ORDER' }));
    } catch (e) {
      dispatch(errorRequest({ name: 'POST_ORDER', error: e.message }));
    }
  };
};

/* INITIAL STATE */
const initialState = {
  data: [],
  requests: {},
};

/* REDUCER */
export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case POST_ORDER: 
      return { ...statePart, data: [...statePart.data, action.payload] };
    case START_REQUEST:
      return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: true, error: null, success: false } } };
    case END_REQUEST:
      return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: false, error: null, success: true } } };
    case ERROR_REQUEST:
      return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: false, error: action.payload.error, success: false } } };
    default:
      return statePart;
  }
}