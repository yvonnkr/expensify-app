import { createStore } from 'redux';

const initialState = { count: 0 };

//Action Generators => funcs that return Action Objects.

// const incrementCount = (payload = {}) => ({
//   type: 'INCREMENT',
//   incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
// });

//using destructuring
const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy
});

const setCount = ({ count } = {}) => ({
  type: 'SET',
  count
});

const resetCount = () => ({
  type: 'RESET'
});

//The func inside the createStore()  ---is known as a reducer
const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      };
    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy
      };
    case 'SET':
      return {
        count: action.count
      };
    case 'RESET':
      return {
        count: 0
      };

    default:
      return state;
  }
};
const store = createStore(countReducer);

//subscribe/unsubscribe
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});
// unsubscribe();

store.dispatch(incrementCount({ incrementBy: 5 }));
store.dispatch(incrementCount());

store.dispatch(resetCount());

store.dispatch(decrementCount());
store.dispatch(decrementCount({ decrementBy: 10 }));

store.dispatch(setCount({ count: -100 }));

/**
 * Action - an object thats gets sent to the store.
 * This Object describes the type of action we'd like to take.
 * This allows us to change the store state over time by dispatching various actions.
 *
 * An Action needs a    - type: 'ACTION-NAME' , optional other data
 * To send an Action to the store - store.dispatch()
 *
 * store.subscribe(() => {}) func gets called everytime the store changes
 * can call the store.getState() here...
 * const unsubscribe = store.unsubscribe(returns unsubscribe)
 * to unsubscribe call - unsubscribe()
 */

/**
 * Reducers
 * 1. Reducers are pure functions -output is only determined by the input(state,action) not eg. global vars
 * 2. Never change state or action
 */
