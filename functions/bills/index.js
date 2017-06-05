console.log('starting function');

const main = require('./main');

exports.handle = function(event, context, callback) {

  main(event)
    .then(output => {
      let data = {
        data: output[0],
        nextBill: (output[1].exists) ? output[1].id : false
      };

      callback(null, data);

    })
    .catch(err => {
      callback(err);
    });
};
