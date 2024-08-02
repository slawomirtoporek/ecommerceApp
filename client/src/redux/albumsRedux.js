import axios from 'axios';
import { API_URL } from '../config';

/* SELECTORS */
export const getAlbums = ({ albums }) => albums.data;
export const getAlbumById = ({ albums }, albumId) => albums.data.find(album => album.id === albumId);
export const getRequests = ({ albums }) => albums.requests;

/* ACTIONS */

// action name creator
const reducerName = 'albums';
const createActionName = name => `app/${reducerName}/${name}`;

// actions
const LOAD_ALBUMS = createActionName('LOAD_ALBUMS');
const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

// actions creators
export const loadAlbums = payload => ({ payload, type: LOAD_ALBUMS });
export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });



/* THUNKS */
export const loadAlbumsRequest = () => {
  return async dispatch => {
    dispatch(startRequest({ name: 'LOAD_ALBUMS' }));
    try {
      let res = await axios.get(`${API_URL}/albums`, {
        withCredentials: true
      });
      dispatch(loadAlbums(res.data));
      dispatch(endRequest({ name: 'LOAD_ALBUMS' }));
    } catch(e) {
      dispatch(errorRequest({ name: 'LOAD_ALBUMS', error: e.message }));
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
    case LOAD_ALBUMS: 
      return { ...statePart, data: [...action.payload] };
    case START_REQUEST:
      return { ...statePart, requests: {...statePart.requests, [action.payload.name]: { pending: true, error: null, success: false }} };
    case END_REQUEST:
      return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: false, error: null, success: true }} };
    case ERROR_REQUEST:
      return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: false, error: action.payload.error, success: false }} };
    default:
      return statePart;
  }
}