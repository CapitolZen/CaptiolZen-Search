const elasticsearch = require('elasticsearch'),
      mi = require('./src/mi');

const states = {
  MI: mi,
};


/**
 * Main api
 * @param event
 * @returns {Promise.<*>}
 */
module.exports = (event) => {
  return new Promise((resolve, reject) => {
    let state = states[event.model.state];
    state.ingestBillText(model => {
      
    })
  });
};
