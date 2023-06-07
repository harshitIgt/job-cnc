const Tool = require("./tool");

class ToolTable {
  constructor(options) {}

  getNumberOfTools() {
    return 1; // sending just one
  }

  getTool() {
    return new Tool(); //returning tool object
  }
}

global.ToolTable = ToolTable;

module.exports = ToolTable;
