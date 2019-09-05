import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let addExpense, history, wrapper;

beforeEach(() => {
  addExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <AddExpensePage addExpense={addExpense} history={history} />
  );
});

test('should render AddExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  const expense = expenses[0];
  wrapper.find('ExpenseForm').prop('onSubmit')(expense);

  expect(addExpense).toHaveBeenLastCalledWith(expense);
  expect(history.push).toHaveBeenLastCalledWith('/');
});
