const redux = require('redux');
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

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
    case BUY_ICECREAM:
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
    case BUY_CAKE:
      return {
        ...state,
        numberOfIcecreams: state.numberOfIcecreams - 1        
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  cakes: buyCakeReducer,
  iceCreams: buyIcecreamReducer
})

const applicationStore = createStore(rootReducer);

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
running the code:

initial state of the application:  { cakes: { numberOfCakes: 10 }, iceCreams: { numberOfIcecreams: 20 } }
update state of the application:  { cakes: { numberOfCakes: 10 }, iceCreams: { numberOfIcecreams: 19 } }
update state of the application:  { cakes: { numberOfCakes: 10 }, iceCreams: { numberOfIcecreams: 18 } }
update state of the application:  { cakes: { numberOfCakes: 10 }, iceCreams: { numberOfIcecreams: 17 } }
update state of the application:  { cakes: { numberOfCakes: 9 }, iceCreams: { numberOfIcecreams: 17 } }
update state of the application:  { cakes: { numberOfCakes: 8 }, iceCreams: { numberOfIcecreams: 17 } }
update state of the application:  { cakes: { numberOfCakes: 7 }, iceCreams: { numberOfIcecreams: 17 } }

*/
