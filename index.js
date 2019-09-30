const redux = require('redux');
const createStore = redux.createStore;

const BUY_CAKE = 'BUY_CAKE';

const bugCakeAction = {
  type: BUY_CAKE,
  info: 'first redux action'
}
/*
  An action is a plain javascript object.
  It has a property 'type' describes type of action.

  conventions as per community specs:
  - it is recommended to declare to string constant (i.e. BUY_CAKE, use it for defining 'type' property
*/

function buyCakeActionCreator() {
  return bugCakeAction;
}
/*
  action creator is a function returning action

  1. what are the advantages of action creator ?
     - incase any changes in the properties or addition of properties into action, it is simplfied to handle at one place i.e. action creator

  conventions as per community specs:
  - it is recommended to make use of action-creators to emit/dispatch actions.
*/

const initialState = {
  numberOfCakes: 10  
};
// initial state of the application

const buyCakeReducer = (state = initialState, action) => {
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
/* 

  - In reducer, current state object is never mutated, rather a new state object is created.

*/


const applicationStore = createStore(buyCakeReducer);
/* 
  one store per application

  registers reducer, responsible for state transitions of the application
  reads the initial state of the application through reducer
*/

console.log('initial state of the application: ', applicationStore.getState());
// getState is the API for retrieving the latest state of the application

const listener = () => {
  console.log('update state of the application: ', applicationStore.getState());
}
const unsubscribe = applicationStore.subscribe(listener);
/* 
  subscription of listener to store. listener function will be executed upon any changes in the application's state.

  unsubscribe is helpful to unsubscribe the listeners from store.
*/

applicationStore.dispatch(buyCakeActionCreator());
/*
  dispatching/emiting the action, which would be handled & addressed by concerned reducer buyCakeReducer.
  buyCakeReducer would eventually change the state of the application & updates redux store.
*/

applicationStore.dispatch(buyCakeActionCreator());
// dispatching/emiting the action for 2nd time

applicationStore.dispatch(buyCakeActionCreator());
// dispatching/emiting the action for 3rd time

unsubscribe();
// unsubscribing the listener from the store.
