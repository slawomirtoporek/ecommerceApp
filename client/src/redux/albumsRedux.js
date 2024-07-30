/* SELECTORS */


/* ACTIONS */

// action name creator
const reducerName = 'albums';
const createActionName = name => `app/${reducerName}/${name}`;


/* THUNKS */


/* INITIAL STATE */
const initialState = {
  data: [],
  requests: [],
};

/* REDUCER */
export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    default:
      return statePart;
  }
}