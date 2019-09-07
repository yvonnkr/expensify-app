export default expenses => {
  return expenses
    .map(exp => exp.amount)
    .reduce((accumilator, value) => accumilator + value, 0);
};
