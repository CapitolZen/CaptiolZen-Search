const moment = require('moment');

// TODO Need to create data format here
module.exports = {
    serialize(object) {
      return JSON.stringify(object);
    },

    deserialize(json) {
      return JSON.parse(json);
    },

    setupObject() {

      output = {
        sponsorList: [],
        summary: '',
        fullTextPdfLink: '',
        categories: [],
        versions: [],

        addCosponsor(name) {
          this.sponsorList.push(name);
        },

        addCategory(cat) {
          this.categories.push(cat);
        },

        addVersion(title, versionId = false, date = false) {
          let version = {
            title: title
          };

          if (versionId) {
            version.id = versionId;
          }

          version.date = date || moment().unix();

          this.versions.push(version);

        }


      };

      return output;
    }
}
