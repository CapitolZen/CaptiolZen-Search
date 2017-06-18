const moment = require('moment'),
      _ = require('lodash');

module.exports = {
  state: null,
  stateId: null,
  sponsorList: [],
  summary: false,
  sponsor: false,
  title: false,
  summaryUrl: false,
  categories: [],
  versions: [],
  history: [],
  currentCommittee: '',
  status: false,

  addCosponsor(name) {
    this.sponsorList.push(name);
  },

  addCategory(cat) {
    this.categories.push(cat);
  },

  /**
   * Create new version of document
   * @public
   * @param title
   * @param asset
   * @param versionId
   * @param date
   */
  addVersion(title, asset, versionId = false, date = false) {
    let version = {
      title: title,
      asset: asset
    };

    if (versionId) {
      version.id = versionId;
    }

    let timestamp = moment().unix();
    if (date) {
      timestamp = this._toUnix(date);
    }

    version.date = timestamp;

    let ver = this.versions;
    ver.push(version);
    this.versions = ver;
  },

  /**
   * Create new history entry
   * @public
   * @param action
   * @param date
   */
  addHistory(action, date) {

    let stamp = this._toUnix(date);
    let entry = {
      date: stamp,
      action: action
    };

    let his = this.history;
    his.push(entry);
    this.history = his;
  },

  /**
   * Create timestamp
   * @param date
   * @returns {number}
   * @private
   */
  //todo require format here
  _toUnix(date) {
    return moment(date, "M/D/YYYY").unix();
  },

  export() {
    let keys = Object.keys(this);
    let obj = {};
    keys.forEach((k) => {
      obj[k] = this[k];
    });
    return _.omitBy(obj, _.isFunction);
  }

};
