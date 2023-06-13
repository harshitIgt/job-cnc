const { priorOutput } = require("../helper");
const Axis = require("./Axis");
const Matrix = require("./Matrix");
const Vector = require("./Vector");

class MachineConfiguration {
  constructor(...args) {
    if (args.length === 0) {
      this.axis = {
        x: 0,
        y: 0,
        z: 0,
        u: undefined,
        v: undefined,
        w: undefined,
      };
    } else if (args.length === 1) {
      this.axis = {
        x: 0,
        y: 0,
        z: 0,
        u: 0,
        v: undefined,
        w: undefined,
      };
    } else if (args.length === 2) {
      this.axis = this.axis = {
        x: 0,
        y: 0,
        z: 0,
        u: 0,
        v: 0,
        w: undefined,
      };
    } else if (args.length === 3) {
      this.axis = this.axis = {
        x: 0,
        y: 0,
        z: 0,
        u: 0,
        v: 0,
        w: 0,
      };
    }
  }
  configData = {
    vendor: "fanuc",
    model: "fanuc",
    description: "Description",
    maximumSpindleSpeed: 1000,
  };

  //Returns the X-coordinate home position
  getHomePositionY() {
    return priorOutput.X;
  }

  //Returns the Y-coordinate home position
  getHomePositionX() {
    return priorOutput.Y;
  }

  //Returns the Z-coordinate home position
  getHomePositionZ() {
    return priorOutput.Z;
  }

  getCenterPositionX(id) {
    return this.configData.centerPositionX;
  }

  getCenterPositionY(id) {
    return this.configData.centerPositionY;
  }

  getCenterPositionZ(id) {
    return this.configData.centerPositionZ;
  }

  getExtruderOffsetX(id) {
    return this.configData.extruderOffsetX;
  }

  getExtruderOffsetY(id) {
    return this.configData.extruderOffsetY;
  }

  getExtruderOffsetZ(id) {
    return this.configData.extruderOffsetZ;
  }

  getVendor() {
    return this.configData.vendor;
  }

  getModel() {
    return this.configData.model;
  }

  getNumberExtruders() {
    return this.configData.numberExtruders;
  }

  getWidth() {
    return this.configData.width;
  }

  getDepth() {
    return this.configData.depth;
  }

  getHeight() {
    return this.configData.height;
  }

  getDescription() {
    return this.configData.description;
  }

  getMaximumSpindleSpeed() {
    return this.configData.maximumSpindleSpeed;
  }

  isHeadConfiguration() {
    if (this.axis.length === 3) {
      return true;
    } else {
      return false;
    }
  }
  isMultiAxisConfiguration() {
    if (
      this.axis.length === 3 &&
      this.axis[0] &&
      this.axis[1] &&
      this.axis[2]
    ) {
      return false;
    } else {
      return true;
    }
  }
  isReceived() {
    return false;
  }
  isMachineCoordinate(coordinate) {
    if (coordinate === 0) {
      return this.axis[0] !== 0;
    } else if (coordinate === 1) {
      return this.axis[1] !== 0;
    } else if (coordinate === 2) {
      return this.axis[2] !== 0;
    }
  }

  //Returns true if the X-coordinate of the home position is valid.
  hasHomePositionX() {
    if (priorOutput.X !== undefined) {
      return true;
    } else return false;
  }

  //Returns true if the Y-coordinate of the home position is valid
  hasHomePositionY() {
    if (priorOutput.Y !== undefined) {
      return true;
    }
  }

  //Returns true if the Z-coordinate of the home position is valid
  hasHomePositionZ() {
    if (priorOutput.Z !== undefined) {
      return true;
    }
  }

  //Returns the machine retraction plane coordinate (by default it sending first plane)
  getRetractPlane() {
    return 2;
  }

  // we are sending just number
  getAxisU() {
    return new Axis();
  }
  getAxisV() {
    return new Axis();
  }
  getAxisW() {
    return new Axis();
  }

  //Returns the matrix for the specified ABC angles.
  getOrientation(abc) {
    const a = abc.x;
    const b = abc.y;
    const c = abc.z;

    // Calculate the matrix for the specified ABC angles
    const sinA = Math.sin(a);
    const cosA = Math.cos(a);
    const sinB = Math.sin(b);
    const cosB = Math.cos(b);
    const sinC = Math.sin(c);
    const cosC = Math.cos(c);

    const orientationMatrix = new Matrix();

    orientationMatrix.data[0][0] = cosA * cosB;
    orientationMatrix.data[0][1] = -sinA * cosC + cosA * sinB * sinC;
    orientationMatrix.data[0][2] = sinA * sinC + cosA * sinB * cosC;
    orientationMatrix.data[1][0] = sinA * cosB;
    orientationMatrix.data[1][1] = cosA * cosC + sinA * sinB * sinC;
    orientationMatrix.data[1][2] = -cosA * sinC + sinA * sinB * cosC;
    orientationMatrix.data[2][0] = -sinB;
    orientationMatrix.data[2][1] = cosB * sinC;
    orientationMatrix.data[2][2] = cosB * cosC;

    return orientationMatrix;
  }

  //not found exect logic just sending vector (not implemented)
  getABCByPreference(orientation, current, controllingAxis, type, options) {
    let ABCByPre = new Vector();
    return ABCByPre;
  }
  setMultiAxisFeedrate(
    feedMode,
    maximumFeedrate,
    feedType,
    outputTolerance,
    bpwRatio
  ) {}

  //Returns the multi-axis feed mode. Returns FEED_INVERSE_TIME, FEED_DPM or FEED_FPM(ND)
  getMultiAxisFeedrateMode() {
    return 1;
  }
  getMultiAxisFeedrateInverseTimeUnits() {
    return 1;
  }
  getMultiAxisFeedrateDPMType() {
    return 1;
  }
  getMultiAxisFeedrateMaximum() {
    return 1;
  }
  getMultiAxisFeedrateBpwRatio() {
    return 1;
  }
  getMultiAxisFeedrateOutputTolerance() {
    return 1;
  }
}
//ND
global.FEED_INVERSE_TIME = 1;
global.FEED_DPM = 1;
global.FEED_FPM = 1;

global.clamp = function (min, value, max) {
  return Math.min(Math.max(value, min), max);
};

global.MachineConfiguration = MachineConfiguration;

module.exports = MachineConfiguration;
