const { priorOutput } = require("../helper");

class Format {
  constructor({
    decimals = 6,
    trim = true,
    trimLeadZero = false,
    forceSign = false,
    forceDecimal = false,
    zeropad = false,
    width = 0,
    separator = ".",
    cyclicLimit = 0,
    cyclicSign = 0,
    scale = 1,
    offset = 0,
    prefix = "",
    suffix = "",
    inherit = "",
    onchange = "",
  }) {
    this.decimals = decimals;
    this.trim = trim;
    this.trimLeadZero = trimLeadZero;
    this.forceSign = forceSign;
    this.forceDecimal = forceDecimal;
    this.zeropad = zeropad;
    this.width = width;
    this.separator = separator;
    this.cyclicLimit = cyclicLimit;
    this.cyclicSign = cyclicSign;
    this.scale = scale;
    this.offset = offset;
    this.prefix = prefix;
    this.suffix = suffix;
    this.inherit = inherit;
    this.onchange = onchange;
  }

  // function is not completed yet
  format(value) {
    let previousVariableValue;
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
    let decimalPlaces = this.decimals;
    let result = previousVariableValue;
    result = `${this.prefix}${result} `;
    return result;
  }

  //Returns the resulting value for the specified value. .getResultingValue(123.1234); // returns 123.123
  getResultingValue(value) {
    if (typeof value !== "number") {
      throw new Error("please provide a number");
    }
    let decimalPlaces = this.decimals;
    let result = value.toFixed(decimalPlaces);
    return result;
  }

  //pending
  getError() {}

  //pending
  isSignificant() {}

  //pending
  areDifferent() {}

  //pending
  getMinimumValue() {}
}

global.Format = Format;

module.exports = Format;
