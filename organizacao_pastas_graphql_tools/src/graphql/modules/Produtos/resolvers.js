const { produtos } = require("../../../db");

module.exports = {
  Query: {
    produtos() {
      return produtos;
    },
  },
};
