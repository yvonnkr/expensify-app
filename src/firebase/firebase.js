import * as firebase from 'firebase';
import expenses from '../tests/fixtures/expenses';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };

//#region NOTES...
//#region child_added

// database.ref('expenses').on('child_added', snapshot => {
//   console.log(snapshot.key, snapshot.val());
// });

//#endregion

//#region child_changed

// database.ref('expenses').on('child_changed', snapshot => {
//   console.log(snapshot.key, snapshot.val());
// });

//#endregion

//#region child_removed  --snapshot == removed child

// database.ref('expenses').on('child_removed', snapshot => {
//   console.log(snapshot.key, snapshot.val());
// });

//#endregion

//#region array challenge --subscription  on() value change
// database.ref('expenses').on('value', snapshot => {
//   const expenses = [];

//   snapshot.forEach(childSnapshot => {
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     });
//   });

//   console.log(expenses);
// });

//#endregion

//#region Arrays/objects part II
// database
//   .ref('expenses')
//   .once('value')
//   .then(snapshot => {
//     const expenses = [];

//     snapshot.forEach(childSnapshot => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       });
//     });

//     console.log(expenses);
//   })
//   .catch(e => {
//     console.log(e);
//   });
//#endregion

//#region challenge add expenses to db

// easy way
// database.ref('expenses').push(expenses[2]);

// //multiple --myway --dint work
// let updates = {};
// expenses.map(expense => {
//   const newExpenseKey = database.ref('expenses').push();
//   updates['expenses/' + newExpenseKey] = expense;
// });

// database.ref().update(updates);

//#endregion

//#region work with object ID's

// database.ref('notes/-LoHGeBuR4Uej8mmvt0J').remove();

// database.ref('notes/-LoHGeBuR4Uej8mmvt0J').update({
//   body: 'Go Shopping'
// });

// database.ref('notes').on('value', snapshot => {
//   const val = snapshot.val();
//   console.log(val['-LoHGeBuR4Uej8mmvt0J']);
// });

//#endregion

//#region push()

// database.ref('notes').push({
//   title: 'Course Topics',
//   body: 'React Native, Angular, Python'
// });

//#endregion

//#region Array data

//firebase way
// const firebaseNotes = {
//   notes: {
//     id1: {
//       title: '1st note',
//       body: 'note 1'
//     },
//     id2: {
//       title: '2nd note',
//       body: 'note 2'
//     },
//     id3: {
//       title: '3rd note',
//       body: 'note 3'
//     }
//   }
// };

// //normall array
// const notes = [
//   {
//     id: 12,
//     title: '1st note',
//     body: 'note 1'
//   },
//   {
//     id: 13,
//     title: '2nd note',
//     body: 'note 2'
//   },
//   {
//     id: 14,
//     title: '3rd note',
//     body: 'note 3'
//   }
// ];

// database.ref('notes').set(notes);

//#endregion

//#region challenge on()
// database.ref().on('value', snapshot => {
//   const val = snapshot.val();
//   console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
// });

// setTimeout(() => {
//   database.ref().update({
//     name: 'Ashley',
//     'job/title': 'Scientist',
//     'job/company': 'Y-Tech'
//   });
// }, 5000);
//#endregion

//#region Fetching Data

//subscription
// on() --server notifies changes  --re-run on data changes  --can not use promises here in order to re-run
// const onValueChange = database.ref().on(
//   'value',
//   snapshot => {
//     const val = snapshot.val();
//     console.log(val);
//   },
//   e => {
//     console.log('Error', e);
//   }
// );

// setTimeout(() => {
//   database.ref('age').set(21);
// }, 3500);

// //unsubscribe
// setTimeout(() => {
//   // database.ref().off(); --without arg
//   database.ref().off('value', onValueChange); // --with arg
// }, 7000);

// setTimeout(() => {
//   database.ref('age').set(39);
// }, 10500);

// once() --fetch once and func never re-ran - if data changes server never notify =================
// database
//   .ref('location/city')
//   .once('value')
//   .then(snapshot => {
//     const val = snapshot.val();
//     console.log(val);
//   })
//   .catch(e => {
//     console.log('Error fetching data', e);
//   });

//#endregion

//#region Database Crud...

/**
 * REF() -SET()============================================
 * database
  .ref()
  .set({
    name: 'Yvonne Nkr',
    age: 33,
    stressLevel: 6,
    job: {
      title: 'Software developer',
      company: 'Google'
    },
    location: {
      city: 'London',
      country: 'United Kingdom'
    }
  })
  .then(() => {
    console.log('Data is saved!');
  })
  .catch(e => {
    console.log('This failed', e);
  });
   * //REMOVE()=================================
   * database
  .ref()
  .remove()
  .then(() => {
    console.log('Remove succeeded!');
  })
  .catch(error => {
    console.log('Remove failed: ' + error.message);
  });

  SET(NULL) -TO REMOVE===================================
  database
  .ref('isSingle')
  .set(null)
  .then(() => {
    console.log('Remove succeeded!');
  })
  .catch(error => {
    console.log('Remove failed: ' + error.message);
  });


UPDATE============================================
database.ref().update({
  stressLevel: 9,
  'job/company': 'Amazon',
  'location/city': 'Seattle'
});

   */

//#endregion

//#endregion
