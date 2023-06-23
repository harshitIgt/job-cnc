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

  //Returns true if the section has been isOptimizedForMachine for a machine configuration
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

  //Returns the initial position for the section.
  getInitialPosition() {
    return new Vector(priorOutput.X, priorOutput.Y, priorOutput.Z);
  }

  //Returns the origin of the Model coordinate system
  getModelOrigin() {
    return new Vector(priorOutput.X, priorOutput.Y, priorOutput.Z); // ND
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
  getParameter = function (parameterName, defaultValue = undefined) {
    let parameterArray = [];
    for (let i of parameterArray) {
      if (i === parameterName) {
        return parameterArray[i];
      }
    }
    let parameterVlaue = { [parameterName]: `${defaultValue}` };
    parameterArray.push(parameterVlaue);
    return defaultValue ? defaultValue : "";
  };
  // Returns the number of records
  getNumberOfRecords() {}

  // Return records with the given parameters as a id
  // also we have add records array for now
  records = [];
  getRecord(recordId) {
    if (recordId !== "number") throw new Error("recordId must be a number");
    for (let record of records) {
      if (record.id === recordId) {
        return record;
      }
    }
    throw new Error("record not found");
  }

  //Returns the job id of the section. (ND)
  getJobId() {}

  //unkwnown method's
  getPatternId() {}
  getNumberOfPatternInstances() {}
  isPatterned() {}
  getChannel() {}
  getForceToolChange() {}
  getFirstCompensationOffset() {}
  strategy = "probe";
  probeWorkOffset = 1;

  //Returns true if the section is optional.
  isOptional() {
    return true; //(ND) we are just return true here  because dont know how this works
  }

  //ND
  getInitialToolAxisABC() {
    return new Vector();
  }
  workPlane = new Matrix();
}

global.Section = Section;

module.exports = Section;
