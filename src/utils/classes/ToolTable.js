const Tool = require("./tool");

class ToolTable {
  constructor(options) {}

  getNumberOfTools() {
    return 1; // sending just one
  }

  getTool(value) {
    return new Tool(); //returning tool object
  }
}

global.ToolTable = ToolTable;

module.exports = ToolTable;
