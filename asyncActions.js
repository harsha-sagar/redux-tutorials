const redux = require('redux');
const reduxSaga = require('redux-saga');
// 1. redux-saga required for handling asyn operations in redux environment

const { call, put, takeLatest } = require('redux-saga/effects');

const axios = require('axios');

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const createSagaMiddleware = reduxSaga.default;
const reduxSagaMiddleware = createSagaMiddleware();

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

const fetchUsersApi = () => {
  return axios.get('https://jsonplaceholder.typicode.com/users');
  // axios is designed to return promise object
};

function* fetchUsers(action) {
  try {
    const result = yield call(fetchUsersApi);
    // yield expects to return promise object.

    const users = result.data.map((user) => user.name);

    yield put({ type: FETCH_USERS_SUCCESS, payload: users });   
  } catch(e) {
    yield put({ type: FETCH_USERS_FAILURE, payload: e.message });
  }
};
/*
  5. All the asynchronous operations goes here.
  - Further action dispatching the store is achieved using 'put' from redux-saga middleware.
*/

function* mySaga() {
  yield takeLatest(FETCH_USERS_REQUEST, fetchUsers);
}
// 4. Upon dispatch of FETCH_USERS_REQUEST, saga middleware take care of running fetchUsers function passing FETCH_USERS_REQUEST action details as argument

const store = createStore(reducer, applyMiddleware(reduxSagaMiddleware));
// 2. mounting redux with redux-saga middleware

reduxSagaMiddleware.run(mySaga);
// 3. running a saga to keep polling for dispatching of specific action (in our example 'FETCH_USERS_REQUEST')

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchUsersRequest());
