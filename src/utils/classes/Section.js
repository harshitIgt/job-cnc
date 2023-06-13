const Tool = require("./tool");
const { priorOutput } = require("../helper");
const Vector = require("./Vector");
const Matrix = require("./Matrix");

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
    return { x: priorOutput.X, y: priorOutput.Y, z: priorOutput.Z }; // ND
  }

  //Returns true if the section has any cycle.
  hasAnyCycle() {}

  //Returns the movements (as a mask) in use for the section (ND)
  getMovements() {
    return 1;
  }

  workOrigin = {
    x: 10,
    y: 11,
    z: 12,
  };

  getModelPlane() {
    return new Matrix();
  }
}

global.Section = Section;

module.exports = Section;
