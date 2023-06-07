const Tool = require("./tool");
const { priorOutput } = require("../helper");

class Section {
  // always returns true or false
  constructor() {}

  isOptional() {
    let state = true;

    return function () {
      const result = state;
      state = !state;
      return result;
    };
  }

  // Returns true is the section contains multi-axis toolpath.
  isMultiAxis() {
    let state = true;

    return function () {
      const result = state;
      state = !state;
      return result;
    };
  }

  // this function is not completed dont know (how it will work)
  getTool() {
    return Tool;
  }

  //Returns true if the section has been optimized for a machine configuration
  isOptimizedForMachine() {
    return true; // don't found any resources
  }

  //Returns the zero-based id of the section.(NC)
  getId = function () {
    return 0;
  };

  // Returns the TCP mode used for the section when it was optimized for a machine configuration
  getOptimizedTCPMode() {
    return 1; // not implemented
  }

  getInitialPosition() {
    return 1; // not implemented
  }

  //Returns the origin of the Model coordinate system
  getModelOrigin() {
    return priorOutput; // NS
  }
}

global.Section = Section;

module.exports = Section;
