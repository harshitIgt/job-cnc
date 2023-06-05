const { priorOutput } = require("../helper");

class Variable {
  constructor(
    {
      prefix = "",
      force = false,
      onchange = "",
      disable = false, // disable added by own it will help to disable function
    },
    Format = {}
  ) {
    this.prefix = prefix;
    this.force = force;
    this.onchange = onchange;
    this.disable = disable;
    this.Format = Format; // little bit confusion on this but right now adding this
  }

  disable() {
    this.disable ? (this.disable = false) : (this.disable = true);
  }

  format(value) {
    if (this.disabled === true) {
      return "";
    }

    let previousVariableValue = 1; // temporary fixed variable

    if (this.prefix === "X") {
      //compare the previous X variable value
      if (value !== priorOutput.X) {
        previousVariableValue = value;
        priorOutput.X = value;
      } else {
        return "";
      }
    } else if (this.prefix === "Y") {
      //compare the previous Y variable value
      if (value !== priorOutput.Y) {
        previousVariableValue = value;
        priorOutput.Y = value;
      } else {
        return "";
      }
    } else if (this.prefix === "Z") {
      //compare the previous Z variable value
      if (value !== priorOutput.Z) {
        previousVariableValue = value;
        priorOutput.Z = value;
      } else {
        return "";
      }
    } else {
      previousVariableValue = value;
    }

    let decimalPlaces = this.Format.decimals;
    let result = previousVariableValue
      ? previousVariableValue.toFixed(decimalPlaces)
      : 1; //sending default value for now

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
    this.prefix = "";

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
