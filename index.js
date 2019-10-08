const redux = require('redux');
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

const { fromJS } = require('immutable');

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

const initialCakesState = fromJS({
  numberOfCakes: 10
});

const initialIcecreamsState = fromJS({
  numberOfIcecreams: 20
});

const buyCakeReducer = (state = initialCakesState, action) => {
  switch(action.type) {
    case BUY_CAKE:
      return state.set('numberOfCakes', state.get('numberOfCakes') - 1);
    default:
      return state
  }
}

const buyIcecreamReducer = (state = initialIcecreamsState, action) => {
  switch(action.type) {
    case BUY_ICECREAM:
      return state.set('numberOfIcecreams', state.get('numberOfIcecreams') - 1);
    default:
      return state
  }
}

const rootReducer = combineReducers({
  cake: buyCakeReducer,
  iceCream: buyIcecreamReducer
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
