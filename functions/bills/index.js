console.log('starting function');

const main = require('./main');

exports.handle = function(event, context, callback) {

  main(event, function(err, results) {
    if (err) {
      callback(err);
      return;
    }
    console.log('ending function ' + JSON.stringify(results));
    callback(null, results);

  });

};
