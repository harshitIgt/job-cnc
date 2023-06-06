const Tool = require("./tool");

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
}

global.Section = Section;

module.exports = Section;