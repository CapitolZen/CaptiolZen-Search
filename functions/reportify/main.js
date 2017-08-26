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
    let {title, layout, logo} = data;

    //sanitize inputs
    title = title.replace(/\s/g, '-');
    title = title.replace(/[^a-zA-Z0-9-_]/g, '');


    let template = fs.readFileSync(path.resolve(__dirname, `templates/${layout}.docx`), 'binary');

    let zip = new JSZip(template);
    let doc = new Docxtemplater();
    doc.loadZip(zip);

    if (!logo) {
      data.hasLogo = false;
    }

    doc.setData(data);
    try {
      doc.render();
    } catch (error) {
      console.log(error);
      reject(error);
    }
    let buff = doc.getZip().generate({type: 'nodebuffer'});
    let currentTime = moment().unix();
    let key = `${organization}/${group}/${currentTime}-${title}.docx`;
    let params = {
      Body: buff,
      Bucket: bucket,
      Key: key,
      ACL: 'public-read'
    };

    s3.putObject(params, (err) => {
      if (err) {
        reject(err);
      }
      let url = `https://s3.amazonaws.com/${bucket}/${key}`;
      resolve(url);
    });
  });
};