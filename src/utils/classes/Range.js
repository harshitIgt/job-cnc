const Actuator = {
  ACTUATOR_LINEAR: "ACTUATOR_LINEAR",
  ACTUATOR_ROTATIONAL: "ACTUATOR_ROTATIONAL",
};

class Range {
  constructor(...args) {
    if (args.length === 0) {
      this.minimum = -1000;
      this.maximum = 1000;
      this.span = 500; // ND
      this.middle = 500; //ND
      this.actuator = Actuator.ACTUATOR_ROTATIONAL;
    } else if (args.length === 2) {
      this.minimum = Math.min(args[0], args[1]);
      this.maximum = Math.max(args[0], args[1]);
      this.span = this.maximum - this.minimum;
      this.middle = this.minimum + this.span / 2;
      this.actuator = args[2] ? args[2] : Actuator.ACTUATOR_ROTATIONAL;
    }
  }
  //Returns true if the range is a non-range
  isNonRange() {
    return this.minimum === this.maximum;
  }

  //Returns the minimum value.
  getMinimum() {
    return this.minimum;
  }

  //Returns the maximum value.
  getMaximum() {
    return this.maximum;
  }

  //Returns the Span value.
  getSpan() {
    return this.span;
  }

  //Returns the middle of the range.
  getMiddle() {
    return this.middle;
  }

  //Grows the range by the specified offset.
  grow(offset) {
    if (typeof offset === "number") {
      this.minimum -= offset;
      this.maximum += offset;
      this.span = this.maximum - this.minimum;
      this.middle = this.minimum + this.span / 2;
    } else {
      throw new Error("grow accepts parameter as a number");
    }
  }

  //Reduces the range by the specified offset. Returns the middle of the range if the range collapses.
  reduce(offset) {
    if (typeof offset === "number") {
      this.minimum += offset;
      this.maximum -= offset;
      this.span = this.maximum - this.minimum;

      if (this.span <= 0) {
        this.span = 0;
        this.middle = this.minimum;
      } else {
        this.middle = this.minimum + this.span / 2;
      }

      return this.middle;
    } else {
      throw new Error("reduce accepts parameter as a number");
    }
  }

  //Translates the range.
  translate(offset) {
    if (typeof offset === "number") {
      this.minimum += offset;
      this.maximum += offset;
      this.middle += offset;
    } else {
      throw new Error("translate accepts parameter as a number");
    }
  }

  //
  expandTo(value) {
    if (typeof value === "number") {
      if (value < this.minimum) {
        this.minimum = value;
      }
      if (value > this.maximum) {
        this.maximum = value;
      }
      this.span = this.maximum - this.minimum;
      this.middle = this.minimum + this.span / 2;
    } else {
      throw new Error("expandTo accepts parameter as a number");
    }
  }

  //Expands the range to include the specified range.
  expandToRange(value) {
    if (value instanceof Range) {
      if (value.minimum < this.minimum) {
        this.minimum = value.minimum;
      }
      if (value.maximum > this.maximum) {
        this.maximum = value.maximum;
      }
      this.span = this.maximum - this.minimum;
      this.middle = this.minimum + this.span / 2;
    } else {
      throw new Error("expandTo accepts parameter as a range");
    }
  }

  //Returns the U coordinate for the specified value. 0 and 1 corresponds to the minimum and maximum, respectively.
  getU(value) {
    if (typeof value === "number") {
      if (this.span === 0) {
        return 0.5; // To avoid division by zero if the range is collapsed
      }

      return (value - this.minimum) / this.span;
    } else {
      throw new Error("getU accepts parameter as a number");
    }
  }

  //Returns true if the specified value is within the range.
  isWithin(value) {
    if (typeof value !== "number") {
      return value >= this.minimum && value <= this.maximum;
    } else {
      throw new Error("isWithin accepts parameter as a number");
    }
  }

  //Returns the nearest value which is in the range.
  clamp(value) {
    if (typeof value !== "number") {
      if (value < this.minimum) {
        return this.minimum;
      }
      if (value > this.maximum) {
        return this.maximum;
      }
      return value;
    } else {
      throw new Error("clamp accepts parameter as a number");
    }
  }

  //Converts the range to a string (e.g. [-10.5; 5.75])
  toString() {
    return `[${this.minimum}; ${this.maximum}]`;
  }
}

global.Range = Range;
module.exports = Range;
