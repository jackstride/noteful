import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleWare = [thunk];

function saveToLocalStorage(state) {
try {
  const serializedState = JSON.stringify(state)
  localStorage.setItem("state", serializedState)

}
catch(err) {
  console.log(err)

}
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('state')
    if(serializedState === null){return undefined}
    else{return JSON.parse(serializedState)}
  } catch (error) {
    console.log(error)
  }
}



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadFromLocalStorage();

const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(...middleWare))
);

store.subscribe(() => {
  saveToLocalStorage(store.getState());
})

export default store;