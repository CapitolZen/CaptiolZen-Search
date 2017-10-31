const JSZip = require('jszip'),
      AWS = require('aws-sdk'),
      fs = require('fs'),
      _ = require('lodash'),
      path = require('path'),
      Docxtemplater = require('docxtemplater');

const s3 = new AWS.S3();

module.exports = function({data, bucket, organization, group}) {
  return new Promise((resolve, reject) => {
    let {id, layout, logo} = data;


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
    let key = `${organization}/${group}/_${id}.docx`;
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