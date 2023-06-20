const Vector = require("./Vector");
const Range = require("./Range");
const Matrix = require("./Matrix");

class Axis {
  constructor(...args) {
    if (args.length === 0) {
      (this.X = 0), (this.Y = 0), (this.Z = 0), (this._table = false);
    } else if (args.length === 4) {
      this._table = _table;
      this._axis = _axis;
      this._offset = _offset;
      this._coordinate = _coordinate;
    } else if (args.length === 5) {
      this._table = _table;
      this._axis = _axis;
      this._offset = _offset;
      this._coordinate = _coordinate;
      this._range = _range;
    } else {
      throw new Error("Invalid arguments");
    }
    this.identifier = "";
    this.actuatorType = 0; // default (According to reacherch but it may wrong)
    this.resolution = 0; // default (According to reacherch but it may wrong)
    this._maximumFeed = 0; // default (but it may wrong)
    this._rapidFeed = 0; // default (but it may wrong)
    this.preference = 0; // default (but it may wrong)
    this.reset = 0; // default (but it may wrong)
    this.isHead = false; // ND
  }

  // // NS
  // getCoordinate() {
  //   if (this.X === 0) {
  //     return 0;
  //   } else if (this.Y === 0) {
  //     return 1;
  //   } else if (this.Z === 0) {
  //     return 2;
  //   } else {
  //     return 0; // Invalid axis
  //   }
  // }

  // getCoordinate() {
  //   if (this._axis) {
  //     return this._axis;
  //   } else return -1;
  // }

  //// Returns the identifier for the axis
  getName() {
    return this.identifier;
  }

  // Sets the identifier for the axis
  setName(name) {
    if (typeof name === "string") {
      this.identifier = name;
    } else {
      throw new Error("setName accepts a string");
    }
  }

  //Returns the actuator type.
  getActuator() {
    return this.actuatorType;
  }

  //Sets the actuator type.
  setActuator(actuator) {
    //0: linear actuator
    //1: rotational actuator.
    if (actuator === 0 || actuator === 1) {
      this.actuatorType = actuator;
    } else {
      throw new Error("setActuator accepts a Boolean value");
    }
  }

  //Returns true if the actuator is linear.
  isLinear() {
    if (this.actuatorType === 0) {
      return true;
    } else {
      return false;
    }
  }

  //Returns true if the actuator is rotational.
  isRotational() {
    if (this.actuatorType === 1) {
      return true;
    } else {
      return false;
    }
  }

  //isAggregate()

  //Returns the resolution of the axis.
  getResolution() {
    return this.resolution;
  }

  //Sets the resolution of the axis. Radians for rotational axis
  setResolution(resolution) {
    if (typeof resolution === "number") {
      this.resolution = resolution;
    } else {
      throw new Error("setResolution accepts  a Number value");
    }
  }

  // Returns the axis value clamped to the resolution
  clampToResolution(value) {
    if (typeof value === "number") {
      const roundedValue =
        Math.round(value / this.resolution) * this.resolution;
      return roundedValue;
    } else {
      throw new Error("clampToResolution accepts a Number value");
    }
  }

  // Returns the signed resolution error for the specified axis value
  getResolutionError(value) {
    if (typeof value === "number") {
      const clampedValue = this.clampToResolution(value);
      return clampedValue - value;
    } else {
      throw new Error("getResolutionError accepts a Number value");
    }
  }

  //Returns the maximum feed of the axis.
  getMaximumFeed() {
    return this._maximumFeed;
  }

  //Sets the maximum feed of the axis.
  setMaximumFeed(maximumFeed) {
    if (typeof maximumFeed === "number") {
      this._maximumFeed = maximumFeed;
    } else {
      throw new Error("setMaximumFeed accepts a Number value");
    }
  }
  //Returns the rapid feed of the axis.
  getRapidFeed() {
    return this._rapidFeed;
  }

  //Sets the rapid feed of the axis.
  setRapidFeed(_rapidFeed) {
    if (typeof _rapidFeed === "number") {
      this._rapidFeed = _rapidFeed;
    } else {
      throw new Error("setRapidFeed accepts a Number value");
    }
  }

  //
  //Returns the angle/offset preference.
  getPreference() {
    return this.preference;
  }

  //Sets the angle/offset preference.
  setPreference(preference) {
    //0: don't care
    //-1: prefer negative angles / offsets.
    //1: prefer positive angles / offsets.
    if (typeof preference === "number") {
      if (preference === 0 || preference === 1 || preference === -1) {
        this.preference = preference;
      } else {
        throw new Error("setPreference accepts only 0 , 1 and -1");
      }
    } else {
      throw new Error("setPreference acepts only a Integer");
    }
  }

  //Returns the axis reset behavior.
  getPreference() {
    return this.reset;
  }

  //Sets the axis reset behavior.
  setReset(reset) {
    //0: disabled.
    //1: reset to 0 at new operation.
    // 2: reset to 0 at rewind.
    // 3: reset to 0 at new operation and at rewind.
    if (typeof reset === "number") {
      if (reset === 0 || reset === 1 || reset === 2 || reset === 3) {
        this.reset = reset;
      } else {
        throw new Error("setReset accepts only 0 , 1 , 2 and 3 ");
      }
    } else {
      throw new Error("setReset acepts only a Integer");
    }
  }

  //Returns true if the axis is valid.
  isEnabled() {
    return (
      this.resolution >= 0 &&
      this.resolution <= 2 &&
      this.maximumFeed >= 0 &&
      !isNaN(this.resolution) &&
      isFinite(this.resolution)
    );
  }

  //
  isHead() {
    return this.isHead;
  }

  //Returns true if the axis is a table axis.
  isTable() {
    return this._table;
  }

  //Returns the effective axis direction. Flipped for head.
  getEffectiveAxis() {
    const axisDirection = this.isHead ? -1 : 1;
    return new Vector(axisDirection, 0, 0);
  }

  //Returns the axis direction.
  getAxis() {
    return new Vector(1, 0, 0);
  }

  //Returns the axis offset.
  getOffset() {
    return new Vector(this._offset.x, this._offset.y, this._offset.z);
  }

  //Returns the axis home position.
  getHomePosition() {
    const referencePoint = { x: 0, y: 0, z: 0 }; // Define your reference point here

    const squaredDistance =
      Math.pow(this.X - referencePoint.x, 2) +
      Math.pow(this.Y - referencePoint.y, 2) +
      Math.pow(this.Z - referencePoint.z, 2);

    const homePosition = Math.sqrt(squaredDistance);

    return homePosition;
  }

  //Returns the axis displacement.
  getDisplacement() {
    return this.getOffset() - this.getHomePosition();
  }

  //Returns true if the axis is cyclic. Only supported for rotational axes
  isCyclic() {
    return this.resolution === 1; // it may wrong
  }

  //Returns true if TCP is enabled for the rotary axis.
  isTCPEnabled() {
    return this.actuatorType === 1 && this.isEnabled();
  }

  //ND
  getRange() {
    if (this.actuatorType === 0) {
      // Linear axis
      return new Range(0, 2);
    } else if (this.actuatorType === 1) {
      // Rotational axis
      return new Range(-180, 180);
    } else {
      return null; // Unsupported actuator type
    }
  }

  //Returns the coordinate to which the axis coordinate is bound (0:X, 1:Y, 2:Z). Returns -1 if the axis is invalid.
  getCoordinate() {
    if (!this.isEnabled()) {
      return -1;
    }

    if (this.identifier === "x") {
      return 0;
    } else if (this.identifier === "y") {
      return 1;
    } else if (this.identifier === "z") {
      return 2;
    } else {
      return -1;
    }
  }

  //Returns true if the specified angle/offset is within the required range.(ND)
  isSupported(value) {
    if (typeof value === "number") {
      if (this.actuatorType === 0) {
        const range = this.getRange();
        return value >= range.minimum && value <= range.maximum;
      } else if (this.actuatorType === 1) {
        // Rotational axis
        const range = this.getRange();
        return value >= range.minimum && value <= range.maximum;
      } else {
        return false; // Unsupported actuator type
      }
    } else {
      throw new Error("isSupported  accepts a number");
    }
  }

  //Returns the closest valid angle/offset.
  clamp(value) {
    //let range = this.getRange();
    if (typeof value !== "number") {
      if (this.actuatorType === 0) {
        // Linear axis
        const range = this.getRange();
        return Math.max(range.minimum, Math.min(value, range.maximum));
      } else if (this.actuatorType === 1) {
        // Rotational axis
        return value;
      } else {
        return value;
      }
    } else {
      throw new Error("clamp accepts a number");
    }
  }

  //Returns the reduced angle closest to 0 but restricted to the supported range. Actuator must be rotational.
  reduce(value) {
    if (typeof value === "number") {
      if (this.actuatorType === 1) {
        // Rotational axis
        const range = this.getRange();
        const fullCircle = range.maximum - range.minimum;

        // Reduce the value to the range ]-PI; PI]
        const reduced =
          ((((value - range.minimum) % fullCircle) + fullCircle) % fullCircle) +
          range.minimum;
        const halfCircle = (range.maximum - range.minimum) / 2;

        // Handle values outside of ]-PI; PI] range
        if (reduced > halfCircle) {
          return reduced - fullCircle;
        } else {
          return reduced;
        }
      } else {
        return value;
      }
    } else {
      throw new Error("clamp accepts a number");
    }
  }

  //Returns the preferred angle in the allowed range.
  remapToRange(angle) {
    if (typeof angle === "number") {
      if (this.actuatorType === 1) {
        // Rotational axis
        const range = this.getRange();
        const fullCircle = range.maximum - range.minimum;

        // Remap the angle to the allowed range
        let remappedAngle = angle;

        while (remappedAngle < range.minimum) {
          remappedAngle += fullCircle;
        }

        while (remappedAngle > range.maximum) {
          remappedAngle -= fullCircle;
        }
        if (remappedAngle >= range.minimum && remappedAngle <= range.maximum) {
          return remappedAngle;
        } else {
          throw new Error("No valid angle exists within the allowed range");
        }
      } else {
        throw new Error("Actuator must be rotational");
      }
    } else {
      throw new Error("remapToRange accepts a number");
    }
  }

  //Returns the preferred angle in the allowed range closest to the current angle. An exception is raised if no valid angle exists. Actuator must be rotational
  remapToRange2(angle, current) {
    if (typeof current === "number" && typeof current !== "number") {
      if (this.actuatorType === 1) {
        // Rotational axis
        const range = this.getRange();
        const fullCircle = range.maximum - range.minimum;

        // Calculate the difference between the angles
        const difference =
          ((angle - current + fullCircle / 2) % fullCircle) - fullCircle / 2;

        // Calculate the remapped angle
        let remappedAngle = current + difference;

        // Remap the angle to the allowed range
        while (remappedAngle < range.minimum) {
          remappedAngle += fullCircle;
        }

        while (remappedAngle > range.maximum) {
          remappedAngle -= fullCircle;
        }

        // Check if a valid angle exists within the allowed range
        if (remappedAngle >= range.minimum && remappedAngle <= range.maximum) {
          return remappedAngle;
        } else {
          throw new Error("No valid angle exists within the allowed range");
        }
      } else {
        throw new Error("Actuator must be rotational");
      }
    } else {
      throw new Error("remapToRange2 accepts parameters as a number ");
    }
  }

  //Returns the rotation for the given axis position. Returns the identity matrix for a linear axis
  getAxisRotation(position) {
    if (typeof position === "number") {
      if (this.actuatorType === 0) {
        // Linear axis
        return new Matrix(); // Return identity matrix for linear axis
      } else if (this.actuatorType === 1) {
        const axisDirection = this.getAxis();
        const rotationMatrix = new Matrix(axisDirection, position);
        return rotationMatrix;
      } else {
        throw new Error("Unsupported actuator type");
      }
    } else {
      throw new Error("getAxisRotation accepts parameters as a number");
    }
  }
}

global.Axis = Axis;
module.exports = Axis;
