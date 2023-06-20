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
      throw new Error("getResultingValue accepts parameter as a number");
    }
    let resultingValue = value;

    // Apply decimal precision
    resultingValue = parseFloat(resultingValue.toFixed(this.decimals));

    // Trim trailing zeros if required
    if (this.trim && resultingValue % 1 === 0) {
      resultingValue = parseInt(resultingValue);
    }

    // Apply force sign if required
    if (this.forceSign && resultingValue !== 0) {
      resultingValue = Math.sign(resultingValue) + resultingValue;
    }

    return resultingValue;
  }

  //Returns the error for the specified value.
  getError(value) {
    if (typeof value !== "number") {
      throw new Error("getError accepts parameter as a number");
    }
    const formattedValue = parseFloat(value.toFixed(this.decimals));

    if (this.forceSign) {
      // Apply force sign
      const sign = Math.sign(formattedValue);
      return sign === 0
        ? -formattedValue
        : sign * (1 / Math.pow(10, this.decimals));
    } else {
      // No force sign
      return formattedValue - value;
    }
  }

  //Returns true if the specified value would be non-zero when formatted
  isSignificant(value) {
    if (typeof value !== "number") {
      throw new Error("isSignificant accepts parameter as a number");
    }
    const formattedValue = parseFloat(value.toFixed(this.decimals));
    return formattedValue !== 0;
  }

  //Returns true if the specified values are different when formatted.
  areDifferent(a, b) {
    if (typeof a === "number" && typeof b === "number") {
      const formattedA = parseFloat(a.toFixed(this.decimals));
      const formattedB = parseFloat(b.toFixed(this.decimals));
      return formattedA !== formattedB;
    } else {
      throw new Error("areDifferent accepts parameters as numbers");
    }
  }

  //Returns the minimum epsilon value.
  getMinimumValue() {
    const epsilon = 1 / Math.pow(10, this.decimals);
    return epsilon;
  }
}

global.Format = Format;

module.exports = Format;
