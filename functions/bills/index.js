console.log('starting function');

const main = require('./main');

exports.handle = function(event, context, callback) {
  main(event)
    .then(res => {
      callback(null, res)
    })
    .catch(err => {
      callback(err);
    })
};
