require('dotenv').config();

const client = require('./utils/client');

const states = {
  mi: require('./src/mi')
};


/**
 * Main api
 * @param event
 * @returns {Promise.<*>}
 */
module.exports = ({state, url, bill}) => {
  let func = states[state];
  return func.ingestBillText(url)
    .then(model => {
      console.log(model);
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
