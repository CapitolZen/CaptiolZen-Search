const mi = require('./src/mi');
const states = {
  mi: mi,
};
module.exports = (event) => {
  let state = states[event.state];
  return state.parseBillSummary(event.billId);
};