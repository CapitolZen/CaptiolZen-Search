const elasticsearch = require('elasticsearch');

const url = process.env.ES_URL;
const client = new elasticsearch.Client({
  hosts: [url]
});

module.exports = client;