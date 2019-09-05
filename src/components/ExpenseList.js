import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

//exported as named component for testing => below default is conected
export const ExpenseList = props => (
  <div>
    {props.expenses.length === 0 ? (
      <p>No Expenses</p>
    ) : (
      props.expenses.map(expense => (
        <ExpenseListItem key={expense.id} {...expense} />
      ))
    )}
  </div>
);

const mapStateToProps = state => {
  return {
    expenses: selectExpenses(state.expenses, state.filters) //returns filtered array
    // expenses: state.expenses,
    // filters: state.filters
    // name: 'Yvonne', //u an pass other props not just from state
  };
};

export default connect(mapStateToProps)(ExpenseList);

//other way
// export default connect(state => ({
//   name: 'Andrew',
//   expenses: state.expenses
// }))(ExpenseList);

// export default ExpenseList; --- without connect
