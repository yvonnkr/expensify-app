// //Object Destructuring
// const book = {
//   title: 'Ego is the enemy',
//   author: 'Ryan Holiday',
//   publisher: {
//     name: 'Pengiun'
//   }
// };

// const { name: publisherName = 'Self Published' } = book.publisher;
// console.log(publisherName);

//=========================================================================
// // Array Destructuring
// const address = ['123 west st', 'Tividale', 'Oldbury', 'b69 2ht'];

// // const [street, city, county, code] = address;
// const [, city, , code] = address;

// console.log(`You are in ${address[1]} ${address[2]}`);
// console.log(`You are in ${city}  ${code}`);

// const add2 = [];
// const [, , name = 'Yvonne'] = add2;
// console.log(name);
// console.log(add2.length);

const item = ['Coffee (hot)', '£2.00', '£2.50', '£2.75'];

const [coffee, , medium] = item;

console.log(`A medium ${coffee} costs ${medium}`); //2.50 medium
