import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

//Actions ========================================================================
// ADD_EXPENSE
const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0
} = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});
// EDIT_EXPENSE
const editExpense = (id, updates = {}) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});
// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE'
});
// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
});
// SET_START_DATE
const setStartDate = startDate => ({
  type: 'SET_START_DATE',
  startDate
});
// SET_END_DATE
const setEndDate = endDate => ({
  type: 'SET_END_DATE',
  endDate
});

//Expenses Reducer =====================================================================
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      //   return state.concat(action.expense);
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id != action.id);
    case 'EDIT_EXPENSE':
      //my way
      //   return [
      //     {
      //       ...state.find(({ id }) => id === action.id),
      //       amount: action.updates.amount
      //     }
      //   ];

      //andys way
      //   return state.map(expense => {
      //     if (expense.id === action.id) {
      //       return {
      //         ...expense,
      //         ...action.updates
      //       };
      //     } else {
      //       return expense;
      //     }
      //   });

      return state.map(expense => {
        return expense.id === action.id
          ? { ...expense, ...action.updates }
          : expense;
      });

    default:
      return state;
  }
};

//Filters Reducer ==================================================================
const filterReducerDefaultState = {
  text: '',
  sortBy: 'date', //date || amount
  startDate: undefined,
  endDate: undefined
};
const filterReducer = (state = filterReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return { ...state, text: action.text };
    case 'SORT_BY_DATE':
      return { ...state, sortBy: 'date' };
    case 'SORT_BY_AMOUNT':
      return { ...state, sortBy: 'amount' };
    case 'SET_START_DATE':
      return { ...state, startDate: action.startDate };
    case 'SET_END_DATE':
      return { ...state, endDate: action.endDate };
    default:
      return state;
  }
};

//Timestamps (is in milliseconds)
//start 0 = January 01 1970 (midnight) -aka (unix epoch)
//+123456 positive num => after unix epoch
//-123456 negagtive num => before unix epoch
//timestamps is used to store timezone independent data

//Get visible expenses==============================================================
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      const startDateMatch =
        typeof startDate !== 'number' || expense.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== 'number' || expense.createdAt <= endDate;
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === 'amount') {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};

//Store Creation ====================================================================
// const store = createStore(expensesReducer); //single reducer
//combined reducers
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filterReducer
  })
);

//track changes===================================================
store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
  //   console.log(store.getState());
});

//dispatch action to store===============================================
const expense1 = store.dispatch(
  addExpense({ description: 'rent', amount: 200, createdAt: -21000 })
);

const expense2 = store.dispatch(
  addExpense({ description: 'coffee', amount: 300, createdAt: -1000 })
);

// store.dispatch(removeExpense({ id: expense1.expense.id }));
// store.dispatch(editExpense(expense2.expense.id, { amount: 500 }));
// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());
store.dispatch(sortByAmount());
// store.dispatch(sortByDate());
// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(999));

//Demo state ==========================================================================
const demoState = {
  expenses: [
    {
      id: '123id',
      description: 'January rent',
      note: 'This was the final payment for that address',
      amount: 54500, //in pence = 545
      createdAt: 0
    }
  ],
  filters: {
    text: 'rent',
    sortBy: 'amount', //date || amount
    startDate: undefined,
    endDate: undefined
  }
};

//...{obj}
// const user = { name: 'yvonne', color: 'blue' };
// console.log({ ...user, age: 33, height: 6, color: 'red' }); //after spread,will overide already defined props with new ---see color prop
// console.log({ color: 'red', ...user, age: 33, height: 6 });
