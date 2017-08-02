const client = require('./utils/client'),
      mi = require('./src/mi');

const states = {
  MI: mi,
};


/**
 * Main api
 * @param event
 * @returns {Promise.<*>}
 */
module.exports = ({state, url, bill}) => {
  let state = states[state];
  return state.ingestBillText(url)
    .then(model => {
      let {attributes} = bill;
      attributes['full-text'] = model.bill_text;
      return client.create({
        index: 'bills',
        type: bill.attributes.type,
        id: bill.id,
        body: attributes
      })
    })
};
