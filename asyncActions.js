const redux = require('redux');
const reduxThunk = require('redux-thunk');
// 1. redux-thunk required for handling asyn operations in redux environment

const axios = require('axios');

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const reduxThunkMiddleware = reduxThunk.default;

const initialState = {
  loading: true,
  users: [],
  error: ''
};

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  };
};

const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  };
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: ''
      };
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload
      };
    default:
      return state;
  }
};

const fetchUsers = (dispatch) => {
  dispatch(fetchUsersRequest());
  axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      const users = response.data.map((user) => user.name);
      dispatch(fetchUsersSuccess(users));
    })
    .catch((error) => {
      dispatch(fetchUsersFailure(error.message));
    });
  /*
    4. As stated in step-3, with intension of dispatching of action to store, function reference is passed.
      - redux-thunk holds the reference of 'dispatch'.
      - redux-thunk executes that function passing 'dispatch' as argument.
        - all the asyc operations goes into this function. Async operations could be side effects (fetching data from REST API), dispatching actions to store which rely on the results of side effects etc
        - Since 'dispatch' reference is made available when invoking this function, multiple actions can be dispatched as asyn operations demands.
  */
};

const store = createStore(reducer, applyMiddleware(reduxThunkMiddleware));
// 2. registering redux with redux-thunk middleware

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchUsers);
// 3. with use of redux-thunk middleware, with the intension of dispatching action, rather passing action creator as argument, a function is passed
