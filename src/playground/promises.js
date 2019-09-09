const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('This is my resolved data!');
    // reject('This is reject / error message');
  }, 3000);
});

console.log('Before....');

promise
  .then(data => {
    console.log('1 ', data);

    return 'next data';
  })
  .then(str => {
    console.log('Does this run?', str);
  })
  .catch(e => {
    console.log(e);
  });

console.log('After ....');
