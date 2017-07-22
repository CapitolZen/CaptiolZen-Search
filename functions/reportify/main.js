const JSZip = require('jszip'),
      AWS = require('aws-sdk'),
      fs = require('fs'),
      moment = require('moment'),
      _ = require('lodash'),
      path = require('path'),
      Docxtemplater = require('docxtemplater');

const s3 = new AWS.S3();

module.exports = function({data, bucket, organization, group}) {
  return new Promise((resolve, reject) => {
    let {bills, title, summary} = data;

    let template = fs.readFileSync(path.resolve(__dirname, 'templates/list.docx'), 'binary');

    let zip = new JSZip(template);
    let doc = new Docxtemplater();
    doc.loadZip(zip);

    doc.setData(data);

    try {
      doc.render();
    } catch (error) {
      console.log(error);
      reject(error);
    }

    let buff = doc.getZip().generate({type: 'nodebuffer'});
    let currentTime = moment().unix();
    let params = {
      Body: buff,
      Bucket: bucket,
      Key: `${organization}/${group}/${currentTime}-${title}.docx`,
      ACL: 'public-read'
    };

    s3.putObject(params, (err, data) => {
      if (err) {
        reject(err);
      }
      console.log(data);
      resolve(data);
    });
  });
};