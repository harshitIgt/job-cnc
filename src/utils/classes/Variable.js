const { priorOutput } = require("../helper");

class Variable {
  constructor(
    {
      prefix = "",
      force = false,
      onchange = "",
      disables = false, // disable added by own it will help to disable function
    },
    Format = {}
  ) {
    this.prefix = prefix;
    this.force = force;
    this.onchange = onchange;
    this.disables = disables;
    this.Format = Format; // little bit confusion on this but right now adding this
  }

  disable() {
    this.disables ? (this.disables = false) : (this.disables = true);
  }

  enable() {
    this.disables ? (this.disables = false) : (this.disables = true);
  }

  format(value) {
    if (this.disabled === true) {
      return "";
    }

    let previousVariableValue; // temporary fixed variable

    if (this.prefix === "X") {
      //compare the previous X variable value
      if (value !== priorOutput.X) {
        previousVariableValue = value;
        priorOutput.X = value;
      }
    } else if (this.prefix === "Y") {
      //compare the previous Y variable value
      if (value !== priorOutput.Y) {
        previousVariableValue = value;
        priorOutput.Y = value;
      }
    } else if (this.prefix === "Z") {
      //compare the previous Z variable value
      if (value !== priorOutput.Z) {
        previousVariableValue = value;
        priorOutput.Z = value;
      }
    } else {
      previousVariableValue = value;
    }

    let decimalPlaces = this.Format.decimals;
    let result;
    if (previousVariableValue) {
      result = previousVariableValue.toFixed(decimalPlaces);
    } else {
      return;
    }

    result = `${this.prefix}${result} `;
    return result;
  }

  getCurrent() {
    return {
      prefix: this.prefix,

      suffix: this.suffix,

      force: this.force,
    };
  }

  getPrefix() {
    // return value (string, boolean, integer, number)
    return this.prefix;
  }

  //resets the variable value
  reset() {
    this.suffix = "";

    this.force = false;
  }

  setPrefix() {
    //nothing will return
    this.prefix = prefix;
    return;
  }
}

global.Variable = Variable;

module.exports = Variable;
