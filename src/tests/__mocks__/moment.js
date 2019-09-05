// import moment from 'moment' //do not use this for mocks instead use as below
const moment = jest.requireActual('moment');

export default (timestamp = 0) => {
  return moment(timestamp);
};
