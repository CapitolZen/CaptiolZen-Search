const mi = require('./src/mi');
const states = {
  MI: mi,
};
/**
 * Main api
 * @param event
 * @returns {Promise.<*>}
 */
module.exports = (event) => {
  let state = states[event.state];
  let parsePromise = state.parseBillSummary(event.billId);
  let nextBillPromise = state.nextBillExists(event.billId);
  return Promise.all([parsePromise, nextBillPromise]);
};
