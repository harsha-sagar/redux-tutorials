const redux = require('redux');
const reduxLogger = require('redux-logger');

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

const applyMiddleware = redux.applyMiddleware;
// 1. required to register middleware to redux

const reduxMiddlewareLogger = reduxLogger.createLogger();
// 2. redux-logger middleware to register to redux

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';

const buyCakeAction = {
  type: BUY_CAKE,
  info: 'first redux action'
}

const buyIcecreamAction = {
  type: BUY_ICECREAM,
  info: 'second redux action'
}

function buyCakeActionCreator() {
  return buyCakeAction;
}

function buyIcecreamActionCreator() {
  return buyIcecreamAction;
}

const initialCakesState = {
  numberOfCakes: 10
};

const initialIcecreamsState = {
  numberOfIcecreams: 20
};

const buyCakeReducer = (state = initialCakesState, action) => {
  switch(action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1        
      }
    default:
      return state
  }
}

const buyIcecreamReducer = (state = initialIcecreamsState, action) => {
  switch(action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numberOfIcecreams: state.numberOfIcecreams - 1        
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  cake: buyCakeReducer,
  iceCream: buyIcecreamReducer
})

const applicationStore = createStore(rootReducer, applyMiddleware(reduxMiddlewareLogger));
// 3. registering redux-logger middleware to redux
//    - redux-logger functionality subscribes to store. Once store gets updated with state, redux-logger logs the previous state, latest state & an action responsible for updating the state.

console.log('initial state of the application: ', applicationStore.getState());

const listener = () => {
  console.log('update state of the application------');
}
const unsubscribe = applicationStore.subscribe(listener);

applicationStore.dispatch(buyCakeActionCreator());

applicationStore.dispatch(buyCakeActionCreator());

applicationStore.dispatch(buyCakeActionCreator());

applicationStore.dispatch(buyIcecreamActionCreator());

applicationStore.dispatch(buyIcecreamActionCreator());

applicationStore.dispatch(buyIcecreamActionCreator());

unsubscribe();
