let dotenv = require('dotenv').config();

  let client = require('./client');

client.indices.create({
  index: 'bills'
}).then(res => {
  console.log(res);
});