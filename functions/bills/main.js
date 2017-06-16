const mi = require('./src/mi');
const states = {
  MI: mi,
};
module.exports = (event) => {
  let state = states[event.state];
  let parsePromise = state.parseBillSummary(event.billId);
  let nextBillPromise = state.nextBillExists(event.billId);
  return Promise.all([parsePromise, nextBillPromise]);
};
