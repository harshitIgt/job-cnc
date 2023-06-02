const { priorOutput } = require("../helper");

class Modal {
  constructor(
    { prefix = "", suffix = "", force = false, onchange = "" },
    format
  ) {
    this.prefix = prefix;
    this.suffix = suffix;
    this.force = force;
    this.onchange = onchange;
    format.prefix ? (this.prefix = format.prefix) : this.prefix;
    format.suffix ? (this.suffix = format.suffix) : this.suffix;
  }

  // Returns the corresponding string
  format(value) {
    if (typeof value === "number") {
      return `${this.prefix}${String(value)} `; // this codition is not completely correct i have to take refrence
    } else {
      throw new Error("Please pass a number");
    }
  }

  getPrefix() {
    // return value (string, boolean, integer, number)
    return this.prefix;
  }

  setPrefix(prefix) {
    //nothing will return
    return (this.prefix = prefix);
  }

  getSuffix() {
    // return value (string, boolean, integer, number)
    return this.suffix;
  }

  setSuffix(suffix) {
    //nothing will return
    this.suffix = suffix;
    return;
  }

  // reset all object properties
  reset() {
    this.prefix = "";

    this.suffix = "";

    this.force = false;

    this.onchange = "";
  }

  // return the current values
  getCurrent() {
    return {
      prefix: this.prefix,

      suffix: this.suffix,

      force: this.force,
    };
  }
}

global.Modal = Modal;

module.exports = Modal;
