//initial state
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      //   return state.concat(action.expense);
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id != action.id);
    case 'EDIT_EXPENSE':
      return state.map(expense => {
        return expense.id === action.id
          ? { ...expense, ...action.updates }
          : expense;
      });

    default:
      return state;
  }
};

export default expensesReducer;
