
// TODO Need to create data format here
module.exports = {
    serialize(object) {
      return JSON.stringify(object);
    },

    deserialize(json) {
      return JSON.parse(json);
    }
};
