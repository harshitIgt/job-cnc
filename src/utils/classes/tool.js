const BoundingBox = require("./BoundingBox");
const Vector = require("./Vector");
const Curve = require("./Curve");
const Mesh = require("./Mesh");

class Tool {
  constructor() {
    this.number = Math.floor(Math.random() * 90) + 10; // genrateing 2 digite random number
    this.diameter = (Math.floor(Math.random() * 90000) + 10000) / 10000;
    this.cornerRadius = -(Math.floor(Math.random() * 90000) + 10000) / 10000;
    this.turret = 0;
    this.diameterOffset = 0;
    this.lengthOffset = 0;
    this.compensationOffset = 0;
    this.manualToolChange = false;
    this.breakControl = false;
    this.liveTool = false;
    this.holderNumber = 0;
    this.spindleMode = 0;
    this.spindleRPM = 0;
    this.rampingSpindleRPM = 0;
    this.surfaceSpeed = 0;
    this.maximumSpindleSpeed = 0;
    this.numberOfFlutes = 0;
    this.threadPitch = 0;
    this.coolant = 0;
    this.material = 0;
    this.comment = "";
    this.vendor = "";
    this.productId = "";
    this.unit = 0;
    this.type = 0;
    this.diameter = 0;
    this.cornerRadius = 0;
    this.taperAngle = 0;
    this.fluteLength = 0;
    this.shoulderLength = 0;
    this.shaftDiameter = 0;
    this.bodyLength = 0;
    this.overallLength = 0;
    this.shaft = null;
    this.holderTipDiameter = 0;
    this.holderDiameter = 0;
    this.holderLength = 0;
    this.holder = null;
    this.boringBarOrientation = 0;
    this.inscribedCircleDiameter = 0;
    this.edgeLength = 0;
    this.noseRadius = 0;
    this.reliefAngle = 0;
    this.thickness = 0;
    this.grooveWidth = 0;
    this.crossSection = "";
    this.tolerance = "";
    this.pitch = 0;
    this.hand = "";
    this.clamping = "";
    this.jetDistance = 0;
    this.jetDiameter = 0;
    this.kerfWidth = 0;
    this.machineQualityControl = "";
    this.cutHeight = 0;
    this.pierceHeight = 0;
    this.pressure = 0;
    this.pierceTime = 0;
    this.abrasiveFlowRate = 0;
    this.piercePower = 0;
    this.cutPower = 0;
    this.assistGas = "";
  }

  //
  getToolId() {
    return;
  }

  //Returns the tool number.
  getNumber() {
    return this.number;
  }

  // Returns the tool diameterOffset.
  getDiameterOffset() {
    return this.diameterOffset;
  }

  // Returns the tool length offset.
  getLengthOffset() {
    return this.lengthOffset;
  }

  //
  getSecondaryLengthOffset() {}

  //
  getSecondaryLengthOffset() {}

  //
  isTurningTool() {}

  // Returns the holder number
  getHolderNumber() {
    return this.holder;
  }

  // Returns the spindle mode.
  getSpindleMode() {
    return this.spindleMode;
  }

  //Returns the spindle speed in RPM (rotations per minute).
  getSpindleRPM() {
    return this.spindleRPM;
  }

  //Returns the ramping spindle speed in RPM (rotations per minute).
  getRampingSpindleRPM() {
    return this.rampingSpindleRPM;
  }

  //
  isClockwise() {}

  // Returns the surfaceSpeed
  getSurfaceSpeed() {
    return this.surfaceSpeed;
  }

  // Returns the maximum spindle speed (RPM) when using surface speed (CSS).
  getMaximumSpindleSpeed() {
    return this.maximumSpindleSpeed;
  }

  //
  getNumberOfFlutes() {}

  // Returns the flute length.
  getFluteLength() {
    return this.numberOfFlutes;
  }

  //  Returns the number of threads per unit of length.
  getThreadPitch() {
    return this.threadPitch;
  }

  // Returns the number of threads per unit of length.
  getThreadPitch() {
    return this.threadPitch;
  }

  //
  getTappingFeedrate() {}

  //
  isDrill() {}

  // Returns the coolant mode.
  getCoolant() {
    return this.coolant;
  }

  // Returns the material.
  getMaterial() {
    return this.material;
  }

  //
  getDescription() {}

  // Returns the tool comment.
  getComment() {
    return this.comment;
  }

  // Returns the tool vendor.
  getVendor() {
    return this.vendor;
  }

  // Returns the tool product id.
  getProductId() {
    return this.productId;
  }

  //
  getHolderDescription() {}
  getHolderComment() {}
  getHolderVendor() {}
  getHolderProductId() {}
  getAggregateId() {}

  // Returns the tool unit.
  getUnit() {
    return this.unit;
  }

  // 	The tool type.
  getType() {
    return this.type;
  }

  // Returns the tip diameter of the holder.
  getDiameter() {}
  getHolderTipDiameter() {
    return this.holderTipDiameter;
  }

  // Returns the corner radius.
  getCornerRadius() {
    return this.cornerRadius;
  }

  // Return the taperAngle
  getTaperAngle() {
    return this.taperAngle;
  }

  // Return the flute length.
  getFluteLength() {
    return this.fluteLength;
  }

  // Return the Sholder length
  getShoulderLength() {
    return this.shoulderLength;
  }

  // Return the Shaft Diameter
  getShaftDiameter() {
    return this.shaftDiameter;
  }

  // Return the body length
  getBodyLength() {
    return this.bodyLength;
  }

  // Return the entire lenght of the tool
  getOverallLength() {
    return this.overallLength;
  }

  //Return the shaft
  getShaft() {
    return this.shaft;
  }

  //
  getJetDistance() {
    return this.jetDistance;
  }

  //The waterjet/laser/plasma nozzle diameter.
  getJetDiameter() {
    return this.jetDiameter;
  }

  // The waterjet/laser/plasma kerf width.
  getKerfWidth() {
    return this.kerfWidth;
  }

  //The post processor must support this setting for "automatic " to have any effect on the output.
  getMachineQualityControl() {
    this.machineQualityControl;
  }

  //The height above the material to cut at for waterjet/laser/plasma operations.
  getCutHeight() {
    return this.cutHeight;
  }

  // The height above the material to pierce the material for last/plasma operations.
  getPierceHeight() {
    return this.pierceHeight;
  }

  // The water pressure for waterjet operations and gas pressure for laser/plasme operations.
  getPressure() {
    return this.pressure;
  }

  // The amoutn of time used to pierce the material for waterjet/laser/plasme operations.
  getPierceTime() {
    return this.pierceTime;
  }

  // The abrasive flow rate for waterjet oprations.
  getAbrasiveFlowRate() {
    return this.abrasiveFlowRate;
  }

  // The power used for piercing the material for laser/plasma operations.
  getPiercePower() {
    return this.piercePower;
  }

  // The power used for cutting the material for laser/plasma operations.
  getCutPower() {
    return this.cutPower;
  }

  // Return the name of the assist gas used for laser/plasma operations.
  getAssistGas() {
    return this.assistGas;
  }

  // Return the tip diameter of the holder.
  getHolderTipDiameter() {
    return this.holderTipDiameter;
  }

  // Return the maximum Holer Diameter.
  getHolderDiameter() {
    return this.holderDiameter;
  }

  // Return the toal length of the holder.
  getHolderLength() {
    return this.holderLength;
  }

  // Return the holder.
  getHolder() {
    return this.holder;
  }

  // Return the boring bar orientation in radians.
  getBoringBarOrientation() {
    return this.boringBarOrientation;
  }

  // Return the primary compensation offset for tuning.
  getCompensationOffset() {
    return this.compensationOffset;
  }

  //
  getSecondaryCompensationOffset() {}

  //Return true if the tool must be manually changed.
  getManualToolChange() {
    return this.manualToolChange;
  }

  // Return ture if break control is enabled.
  getBreakControl() {
    return this.breakControl;
  }

  // Return ture if the tool is live. Otherwise tool is static (ie. mounted without a spindle.)
  isLiveTool() {
    return this.liveTool;
  }

  // Return the turret for turning.
  getTurret() {
    return this.turret;
  }

  //
  getInsertType() {}
  getHolderType() {}
  getCompensationMode() {}
  getCompensationDisplacement() {
    return new Vector(1, 1, 0); // it may be wrong
  }

  //Returns the tool extent. (it may wrong)
  getExtent() {
    return new BoundingBox();
  }

  // Returns the profile of the cutter as a Curve.(ND)
  getCutterProfile() {
    return new Curve();
  }

  // Returns the profile of the Holder as a Curve.(ND)
  getHolderProfile() {
    return new Curve();
  }

  //
  getCutterProfileAsSVGPath() {}
  getHolderProfileAsSVGPath() {}

  // Returns the cutter as a mesh.(ND)
  getCutterAsMesh(tolerance) {
    return new Mesh();
  }
  // Returns the holder as a mesh.(ND)
  getHolderAsMesh(tolerance) {
    return new Mesh();
  }
}

global.Tool = Tool;

module.exports = Tool;
