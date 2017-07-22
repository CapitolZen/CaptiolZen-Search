const main = require('./main');

exports.handle = function (event, context, callback) {

  main(event)
    .then(url => {
      callback(null, {url: url});

    })
    .catch(err => {
      callback(err);
    });
};