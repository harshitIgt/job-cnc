class Record {
  constructor() {
    this.id = null;
    this.type = null;
    this.categories = null;
    this.motion = false;
    this.cycle = false;
    this.cycleType = null;
    this.parameter = false;
    this.parameterName = null;
    this.parameterValue = null;
  }

  isValid() {
    return this.id !== null && this.type !== null;
  }

  getId() {
    return this.id;
  }

  getType() {
    return this.type;
  }

  getCategories() {
    return this.categories;
  }

  isMotion() {
    return this.motion;
  }

  isCycle() {
    return this.cycle;
  }

  getCycleType() {
    return this.cycleType;
  }

  isParameter() {
    return this.parameter;
  }

  getParameterName() {
    return this.parameterName;
  }

  getParameterValue() {
    return this.parameterValue;
  }
}

global.Record = Record;
module.exports = Record;
