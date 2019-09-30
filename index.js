const redux = require('redux');
const createStore = redux.createStore;

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

const initialState = {
  numberOfCakes: 10,
  numberOfIcecreams: 20
};

const buyReducer = (state = initialState, action) => {
  switch(action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1        
      }
    case BUY_ICECREAM:
      return {
        ...state,
        numberOfIcecreams: state.numberOfIcecreams - 1        
      }
    default:
      return state
  }
}

const applicationStore = createStore(buyReducer);

console.log('initial state of the application: ', applicationStore.getState());

const listener = () => {
  console.log('update state of the application: ', applicationStore.getState());
}
const unsubscribe = applicationStore.subscribe(listener);

applicationStore.dispatch(buyCakeActionCreator());

applicationStore.dispatch(buyCakeActionCreator());

applicationStore.dispatch(buyCakeActionCreator());

applicationStore.dispatch(buyIcecreamActionCreator());

applicationStore.dispatch(buyIcecreamActionCreator());

applicationStore.dispatch(buyIcecreamActionCreator());

unsubscribe();

/*

Running the code, would give:

initial state of the application:  { numberOfCakes: 10, numberOfIcecreams: 20 }
update state of the application:  { numberOfCakes: 9, numberOfIcecreams: 20 }
update state of the application:  { numberOfCakes: 8, numberOfIcecreams: 20 }
update state of the application:  { numberOfCakes: 7, numberOfIcecreams: 20 }
update state of the application:  { numberOfCakes: 7, numberOfIcecreams: 19 }
update state of the application:  { numberOfCakes: 7, numberOfIcecreams: 18 }
update state of the application:  { numberOfCakes: 7, numberOfIcecreams: 17 }

*/
