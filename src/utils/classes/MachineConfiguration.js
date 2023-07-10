const { priorOutput } = require("../helper");
const Axis = require("./Axis");
const Matrix = require("./Matrix");
const Vector = require("./Vector");
const VectorPair = require("./VectorPair");

class MachineConfiguration {
  constructor(...args) {
    if (args.length === 0) {
      this.axis = {
        x: new Axis(), //0
        y: new Axis(), //0
        z: new Axis(), //0
        u: undefined,
        v: undefined,
        w: undefined,
      };
    } else if (args.length === 1) {
      this.axis = {
        x: new Axis(), //0
        y: new Axis(), //0
        z: new Axis(), //0
        u: new Axis(), //0
        v: new Axis(),
        w: new Axis(),
      };
    } else if (args.length === 2) {
      this.axis = this.axis = {
        x: new Axis(), //0
        y: new Axis(), //0
        z: new Axis(), //0
        u: new Axis(), //0
        v: new Axis(), //0
        w: new Axis(),
      };
    } else if (args.length === 3) {
      this.axis = this.axis = {
        x: new Axis(), //0
        y: new Axis(), //0
        z: new Axis(), //0
        u: new Axis(), //0
        v: new Axis(), //0
        w: new Axis(), //0
      };
    }
    this.homePosition = {
      x: null,
      y: null,
      z: null,
    };
    this.centerPosition = {
      x: null,
      y: null,
      z: null,
    };
    this.parkPosition = {
      x: null,
      y: null,
      z: null,
    };
    this.numberExtruders = null;
    this.extruderOffsets = {};
    this.coolantSupported = {};
    this.retractOnIndexing = false;
    this.shortestAngularRotation = false;
    this.headAttachPoint = new Vector();
    this.tableAttachPoint = new Vector();
  }
  configData = {
    vendor: "fanuc",
    model: "fanuc",
    description: "Description",
    maximumSpindleSpeed: 1000,
    vendorUrl: "google.com",
    control: 12,
  };

  getMilling() {
    return this.milling;
  }

  setMilling(milling) {
    if (!(typeof milling === "boolean")) {
      throw new Error("setMilling Invalid Auguments.");
    }
    this.milling = milling;
  }

  getTurning() {
    return this.turning;
  }

  setTurning(turning) {
    if (!(typeof turning === "boolean")) {
      throw new Error("setTurning Invalid Auguments.");
    }
    this.turning = turning;
  }

  getWire() {
    return this.wire;
  }

  setWire(wire) {
    if (!(typeof wire === "boolean")) {
      throw new Error("setWire Invalid Auguments.");
    }
    this.wire = wire;
  }

  getJet() {
    return this.jet;
  }

  setJet(jet) {
    if (!(typeof jet === "boolean")) {
      throw new Error("setJet Invalid Auguments");
    }
    this.jet = jet;
  }

  getAdditiveFFF() {
    return this.additive;
  }

  setAdditiveFFF(additive) {
    if (!(typeof additive === "boolean")) {
      throw new Error("setAdditiveFFF Invalid Auguments.");
    }
    this.additive = additive;
  }

  getInspection() {
    return this.inspection;
  }

  setInspection(inspection) {
    if (!(typeof inspection === "boolean")) {
      throw new Error("setInspection Invalid Auguments.");
    }
    this.inspection = inspection;
  }

  getToolChanger() {
    return this.toolChanger;
  }

  setToolChanger(toolChanger) {
    if (!(typeof toolChanger === "boolean")) {
      throw new Error("setToolChanger Invalid Auguments.");
    }
    this.toolChanger = toolChanger;
  }

  getToolPreload() {
    return this.toolPreload;
  }

  setToolPreload(toolPreload) {
    if (!(typeof toolPreload === "boolean")) {
      throw new Error("setToolPreload Invalid Auguments.");
    }
    this.toolPreload = toolPreload;
  }

  getNumberOfTools() {
    return this.numberOfTools;
  }

  setNumberOfTools(numberOfTools) {
    if (!Number.isInteger(numberOfTools)) {
      throw new Error("setNumberOfTools Invalid Auguments");
    }
    this.numberOfTools = numberOfTools;
  }

  getMaximumToolLength() {
    return this.maximumToolLength;
  }

  setMaximumToolLength(maximumToolLength) {
    if (!(typeof maximumToolLength === "number")) {
      throw new Error("invalid auguments");
    }
    this.maximumToolLength = maximumToolLength;
  }

  getMaximumToolLength() {
    return this.maximumToolLength;
  }

  setMaximumToolLength(maximumToolLength) {
    if (!(typeof maximumToolLength === "number")) {
      throw new Error("invalid auguments");
    }
    this.maximumToolLength = maximumToolLength;
  }

  getMaximumToolDiameter() {
    return this.maximumToolDiameter;
  }

  setMaximumToolDiameter(maximumToolDiameter) {
    if (!(typeof maximumToolDiameter === "number")) {
      throw new Error("invalid auguments");
    }
    this.maximumToolDiameter = maximumToolDiameter;
  }

  getMaximumFeedrate() {
    return this.maximumFeedrate;
  }

  setMaximumFeedrate(maximumFeedrate) {
    if (!(typeof maximumFeedrate === "number")) {
      throw new Error("invalid auguments");
    }
    this.maximumFeedrate = maximumFeedrate;
  }

  getMaximumCuttingFeedrate() {
    return this.maximumCuttingFeedrate;
  }

  setMaximumCuttingFeedrate(maximumCuttingFeedrate) {
    if (!(typeof maximumCuttingFeedrate === "number")) {
      throw new Error("invalid auguments");
    }
    this.maximumCuttingFeedrate = maximumCuttingFeedrate;
  }

  getMaximumBlockProcessingSpeed() {
    return this.maximumBlockProcessingSpeed;
  }

  setMaximumBlockProcessingSpeed(maximumBlockProcessingSpeed) {
    if (!Number.isInteger(maximumBlockProcessingSpeed)) {
      throw new Error("invalid auguments");
    }
    this.maximumBlockProcessingSpeed = maximumBlockProcessingSpeed;
  }

  getFeedrateRatio() {
    return this.feedrateRatio;
  }

  setFeedrateRatio(feedrateRatio) {
    if (!(typeof feedrateRatio === "number")) {
      throw new Error("invalid auguments");
    }
    this.feedrateRatio = feedrateRatio;
  }

  getToolChangeTime() {
    return this.toolChangeTime;
  }

  setToolChangeTime(toolChangeTime) {
    if (!(typeof toolChangeTime === "number")) {
      throw new Error("invalid auguments");
    }
    this.toolChangeTime = toolChangeTime;
  }

  axisArray = [];
  addAxis(axis) {
    if (!(axis instanceof Axis)) {
      throw new Error("Invalid Arguments.");
    }
    this.axisArray.push[axis];
  }

  performRewinds() {
    return this.rewind;
  }

  enableMachineRewinds() {
    this.rewind = true;
  }

  disableMachineRewinds() {
    this.rewind = false;
  }

  getReconfigure() {
    return this.reconfigure;
  }

  setReconfigure(enable) {
    if (!(typeof enable === "boolean")) {
      throw new Error("setReconfigure Invalid Arguments.");
    }
    this.reconfigure = enable;
  }

  getRewindStockExpansion() {
    return this.expansion;
  }

  setRewindStockExpansion(expansion) {
    if (!(expansion instanceof Vector)) {
      throw new Error("setRewindStockExpansion Invalid Arguments.");
    }
    this.expansion = expansion;
  }

  getSafeRetractDistance() {
    return this.safeRetractDistance;
  }

  setSafeRetractDistance(safeRetractDistance) {
    if (!(typeof safeRetractDistance === "number")) {
      throw new Error("setSafeRetractDistance Invalid Arguments.");
    }
    this.safeRetractDistance = safeRetractDistance;
  }

  getSafeRetractFeedrate() {
    return this.safeRetractFeedrate;
  }

  setSafeRetractFeedrate(safeRetractFeedrate) {
    if (!(typeof safeRetractFeedrate === "number")) {
      throw new Error("setSafeRetractFeedrate Invalid Arguments.");
    }
    this.safeRetractFeedrate = safeRetractFeedrate;
  }

  getSafePlungeFeedrate() {
    return this.safePlungeFeedrate;
  }

  setSafePlungeFeedrate(safePlungeFeedrate) {
    if (!(typeof safePlungeFeedrate === "number")) {
      throw new Error("setSafePlungeFeedrate Invalid Arguments.");
    }
    this.safePlungeFeedrate = safePlungeFeedrate;
  }

  getDimensions() {
    return this.dimensions;
  }

  setDimensions(dimensions) {
    if (!(dimensions instanceof Vector)) {
      throw new Error("setDimensions Invalid Arguments.");
    }
    this.dimensions = dimensions;
  }

  getWidth() {
    return this.width;
  }

  setWidth(width) {
    if (!(typeof width === "number")) {
      throw new Error("setWidth Invalid Arguments.");
    }
    this.width = width;
  }

  getDepth() {
    return this.depth;
  }

  setDepth(depth) {
    if (!(typeof depth === "number")) {
      throw new Error("setDepth Invalid Arguments.");
    }
    this.depth = depth;
  }

  setHeight() {
    return this.height;
  }

  setHeight(height) {
    if (!(typeof height === "number")) {
      throw new Error("setHeight Invalid Arguments.");
    }
    this.height = height;
  }

  getWeight() {
    return this.weight;
  }

  setWeight(weight) {
    if (!(typeof weight === "number")) {
      throw new Error("setWeight Invalid Arguments.");
    }
    this.weight = weight;
  }

  getPartDimensions() {
    return this.partDimensions;
  }

  setPartDimensions(partDimensions) {
    if (!(partDimensions instanceof Vector)) {
      throw new Error("setPartDimensions Invalid Arguments.");
    }
    this.partDimensions = partDimensions;
  }

  setPartMaximumY() {
    return this.maximumDepth;
  }

  setPartMaximumY(depth) {
    if (!(typeof depth === "number")) {
      throw new Error("setPartMaximumY Invalid Arguments.");
    }
    this.maximumDepth = depth;
  }

  getPartMaximumX() {
    return this.maximumWeight;
  }

  setPartMaximumX(weight) {
    if (!(typeof weight === "number")) {
      throw new Error("setPartMaximumX Invalid Arguments.");
    }
    this.maximumWeight = weight;
  }

  getPartMaximumZ() {
    return this.maximumHeight;
  }

  setPartMaximumZ(height) {
    if (!(typeof height === "number")) {
      throw new Error("setPartMaximumZ Invalid Arguments.");
    }
    this.maximumHeight = height;
  }

  getWeightCapacity() {
    return this.weightCapacity;
  }

  setWeightCapacity(weightCapacity) {
    if (!(typeof weightCapacity === "number")) {
      throw new Error("setWeightCapacity Invalid Arguments.");
    }
    this.weightCapacity = weightCapacity;
  }

  getSpindleAxis() {
    return this.spindleAxis;
  }

  setSpindleAxis(spindleAxis) {
    if (!(spindleAxis instanceof Vector)) {
      throw new Error("setRewindStockExpansion Invalid Arguments.");
    }
    this.spindleAxis = spindleAxis;
  }

  getSpindleDescription() {
    return this.spindleDescription;
  }

  setSpindleDescription(spindleDescription) {
    if (!(typeof spindleDescription === "string")) {
      throw new Error("setSpindleDescription Invalid Arguments.");
    }
    this.spindleDescription = spindleDescription;
  }

  getMaximumSpindlePower() {
    return this.maximumSpindlePower;
  }

  setMaximumSpindlePower(maximumSpindlePower) {
    if (!(typeof maximumSpindlePower === "number")) {
      throw new Error("setMaximumSpindlePower Invalid Arguments.");
    }
    this.maximumSpindlePower = maximumSpindlePower;
  }

  getMaximumSpindleSpeed() {
    return this.maximumSpindleSpeed;
  }

  setMaximumSpindleSpeed(maximumSpindleSpeed) {
    if (!(typeof maximumSpindleSpeed === "number")) {
      throw new Error("	setMaximumSpindleSpeed Invalid Arguments.");
    }
    this.maximumSpindleSpeed = maximumSpindleSpeed;
  }

  getCollectChuck() {
    return this.collectChuck;
  }

  setCollectChuck(collectChuck) {
    if (!(typeof collectChuck === "string")) {
      throw new Error("setCollectChuck Invalid Arguments.");
    }
    this.collectChuck = collectChuck;
  }

  getToolLength() {
    return this.toolLength;
  }

  setToolLength(toolLength) {
    if (!(typeof toolLength === "number")) {
      throw new Error("	setToolLength Invalid Arguments.");
    }
    this.toolLength = toolLength;
  }

  getVirtualTooltip() {
    return this.virtualPositioning;
  }

  setVirtualTooltip(virtualPositioning) {
    if (!(typeof virtualPositioning === "boolean")) {
      throw new Error("setVirtualTooltip Invalid Auguments.");
    }
    this.virtualPositioning = virtualPositioning;
  }

  getAxisByName(name) {
    if (!(typeof name === "string")) {
      throw new Error("getAxisByName Invalid Arguments.");
    }
    switch (name) {
      case "X":
        return this.axis.x;
        break;
      case "Y":
        return this.axis.y;
        break;
      case "Z":
        return this.axis.z;
        break;
      case "U":
        return this.axis.u;
        break;
      case "V":
        return this.axis.v;
        break;
      case "W":
        return this.axis.z;
        break;
      default:
        throw new Error("Invalid Axis.");
        break;
    }
  }

  getAxisX() {
    return this.axis.x;
  }
  getAxisY() {
    return this.axis.y;
  }
  getAxisZ() {
    this.axis.z;
  }

  isSupportedPosition(position) {
    if (!(position instanceof Vector)) {
      throw new Error("issupportedPosition Invalid Arguments.");
    }
    let a =
      position.x >= this.x._range.minimum &&
      position.x <= this.x._range.maximum;
    let b =
      position.y >= this.y._range.minimum &&
      position.y <= this.y._range.maximum;
    let c =
      position.z >= this.z._range.minimum &&
      position.z <= this.z._range.maximum;

    return a && b && c;
  }

  getValidityStatus() {} // Pending
  isSupported() {} // Pending

  setMultiAxisFeedrate(
    feedMode,
    maximumFeedrate,
    feedType,
    outputTolerance,
    bpwRatio
  ) {
    this.multiAxisFeedrateMode = feedMode;
    this.multiAxisFeedrateMaximum = maximumFeedrate;
    this.multiAxisFeedrateDPMType = feedType;
    this.multiAxisFeedrateInverseTimeUnits; // Not Defined
    this.multiAxisFeedrateOutputTolerance = outputTolerance;
    this.multiAxisFeedrateBpwRatio = bpwRatio;
  }

  getMultiAxisFeedrateMode() {
    return this.multiAxisFeedrateMode;
  }
  getMultiAxisFeedrateMaximum() {
    return this.multiAxisFeedrateMaximum;
  }
  getMultiAxisFeedrateDPMType() {
    this.multiAxisFeedrateDPMType;
  }
  getMultiAxisFeedrateInverseTimeUnits() {
    //Not Defined
  }
  getMultiAxisFeedrateOutputTolerance() {
    return this.multiAxisFeedrateOutputTolerance;
  }
  getMultiAxisFeedrateBpwRatio() {
    return this.multiAxisFeedrateBpwRatio;
  }

  setSingularity(
    adjust,
    method,
    cone,
    angle,
    tolerance,
    linearizationTolerance
  ) {
    this.singularityAdjust = adjust;
    this.singularityMethod = method;
    this.singularityCone = cone;
    this.singularityAngle = angle;
    this.singularityTolerance = tolerance;
    this.singularityLinearizationTolerance = linearizationTolerance;
  }

  getSingularityAdjust() {
    return this.singularityAdjust;
  }

  getSingularityMethod() {
    return this.singularityMethod;
  }

  getSingularityCone() {
    return this.singularityCone;
  }

  getSingularityAngle() {
    return this.singularityAngle;
  }

  getSingularityTolerance() {
    return this.singularityTolerance;
  }

  getSingularityLinearizationTolerance() {
    return this.singularityLinearizationTolerance;
  }

  isMachineAxisRotation(abc) {
    if (!(abc instanceof Vector)) {
      throw new Error("isMachineAxisRotation Invalid Arguments.");
    }
    let a = abc.x,
      b = abc.y,
      c = abc.z;
    const isRotationAroundNonMachineAxisZero = a === 0 && b === 0 && c === 0;

    return isRotationAroundNonMachineAxisZero;
  }

  is3DConfiguration() {
    let a = this.u === undefined ? true : false;
    let b = this.v === undefined ? true : false;
    let c = this.w === undefined ? true : false;

    return a && b && c;
  }

  isMultiAxisConfiguration() {
    let a = this.u === undefined ? true : false;
    let b = this.v === undefined ? true : false;
    let c = this.w === undefined ? true : false;

    return a || b || c;
  }

  getNumberOfAxes() {
    let count = 0;
    this.x !== undefined ? count++ : count;
    this.y !== undefined ? count++ : count;
    this.z !== undefined ? count++ : count;
    this.u !== undefined ? count++ : count;
    this.v !== undefined ? count++ : count;
    this.w !== undefined ? count++ : count;

    return count;
  }

  isHeadConfiguration() {
    // Not Sure
    let a = this.u === undefined ? true : false;
    let b = this.v === undefined ? true : false;
    let c = this.w === undefined ? true : false;

    return a || b || c;
  }

  isTableConfiguration() {
    // Not Sure
    let a = this.u === undefined ? true : false;
    let b = this.v === undefined ? true : false;
    let c = this.w === undefined ? true : false;

    return !(a && b && c);
  }

  getAxisU() {
    return this.axis.u;
  }
  getAxisV() {
    return this.axis.v;
  }
  getAxisW() {
    return this.axis.w;
  }

  getIndexOfAxisById(id) {
    const axisIds = ["x", "y", "z", "u", "v", "w"];
    const index = axisIds.indexOf(id);
    return index !== -1 ? index : -1;
  }

  isMachineCoordinate(coordinate) {
    const isMappedAxis = coordinate >= 0 && coordinate <= 2;
    return isMappedAxis;
  }

  clamp(abc) {
    if (!(abc instanceof Vector)) {
      throw new Error("clamp Invalid Arguments.");
    }
    let a = abc.x,
      b = abc.y,
      c = abc.z;

    const clampedA = a !== undefined ? Math.max(0, Math.min(a, 360)) : 0;
    const clampedB = b !== undefined ? Math.max(0, Math.min(b, 360)) : 0;
    const clampedC = c !== undefined ? Math.max(0, Math.min(c, 360)) : 0;

    return new Vector(clampedA, clampedB, clampedC);
  }

  // plese look into it
  clampToResolution(abc) {
    if (!(abc instanceof Vector)) {
      throw new Error("clamp Invalid Arguments.");
    }
    let a = abc.x,
      b = abc.y,
      c = abc.z;

    const resolution = 0.1; // Not fix

    const clampedA =
      a !== undefined ? Math.round(a / resolution) * resolution : 0;
    const clampedB =
      b !== undefined ? Math.round(b / resolution) * resolution : 0;
    const clampedC =
      c !== undefined ? Math.round(c / resolution) * resolution : 0;

    return new Vector(clampedA, clampedB, clampedC);
  }

  getRotationAxis() {} // incomplete (hidden)
  preserveRotaryAtZero() {}
  preserveRotaryAtZero() {}
  getClosestABC() {}

  isXYZSupported(xyz) {
    if (!(xyz instanceof Vector)) {
      throw new Error("clamp Invalid Arguments.");
    }
    let x = xyz.x,
      y = xyz.y,
      z = xyz.z;

    const isXSupported = x !== undefined;
    const isYSupported = y !== undefined;
    const isZSupported = z !== undefined;

    return isXSupported && isYSupported && isZSupported;
  }

  isABCSupported(_abc) {
    if (!(_abc instanceof Vector)) {
      throw new Error("clamp Invalid Arguments.");
    }
    let x = _abc.x,
      y = _abc.y,
      z = _abc.z;

    const isXSupported = x !== undefined;
    const isYSupported = y !== undefined;
    const isZSupported = z !== undefined;
    if (this.x && this.y && this.z) {
      isXSupported = x !== undefined;
      isYSupported = y !== undefined;
      isZSupported = z !== undefined;
      return isXSupported && isYSupported && isZSupported;
    } else if (this.x && this.y) {
      isXSupported = x !== undefined;
      isYSupported = y !== undefined;
      return isXSupported && isYSupported;
    } else if (this.x && this.z) {
      isZSupported = z !== undefined;
      isXSupported = x !== undefined;
      return isXSupported && isZSupported;
    } else if (this.y && this.z) {
      isZSupported = z !== undefined;
      isYSupported = y !== undefined;
      return isYSupported && isZSupported;
    } else if (this.x) {
      return (isXSupported = x !== undefined);
    } else if (this.y) {
      return (isYSupported = y !== undefined);
    } else if (this.z) {
      return (isXSupported = x !== undefined);
    }

    return false;
  }

  isDirectionSupported(direction) {
    // it may incorect
    if (!(xyz instanceof Vector)) {
      throw new Error("clamp Invalid Arguments.");
    }
    if (this.X === direction) return true;
    else if (this.y === direction) return true;
    else if (this.z === direction) return true;
    else if (this.u === direction) return true;
    else if (this.v === direction) return true;
    else if (this.w === direction) return true;
    return false;
  }

  getOptimizedPosition() {}
  getOptimizedDirection() {}
  getOptimizedTables() {}
  getOptimizedHeads() {}

  getABC(orientation) {
    if (!(orientation instanceof Matrix)) {
      throw new Error("getABC Invalid Arguments.");
    }
    const a =
      Math.atan2(orientation.data[1][2], orientation.data.data[2][2]) *
      (180 / Math.PI);
    const b =
      Math.atan2(
        -orientation.data[0][2],
        Math.sqrt(
          orientation.data[1][2] * orientation.data[1][2] +
            orientation.data[2][2] * orientation.data[2][2]
        )
      ) *
      (180 / Math.PI);
    const c =
      Math.atan2(orientation.data[0][1], orientation.data[0][0]) *
      (180 / Math.PI);

    return new Vector(a, b, c);
  }

  getABCByDirectionBoth(direction) {
    if (!(direction instanceof Vector)) {
      throw new Error("getABCByDirectionBoth Invalid Arguments.");
    }
    const a1 = Math.atan2(direction.y, direction.z) * (180 / Math.PI);
    const b1 =
      Math.atan2(
        -direction.x,
        Math.sqrt(direction.y * direction.y + direction.z * direction.z)
      ) *
      (180 / Math.PI);
    const c1 = 0;

    const a2 = 180 - a1;
    const b2 = -b1;
    const c2 = 180;

    return new VectorPair(new Vector(a1, b1, c1), new Vector(a2, b2, c2));
  }

  getABCByDirection(direction) {
    if (!(direction instanceof Vector)) {
      throw new Error("getABCByDirection Invalid Arguments.");
    }
    const a = Math.atan2(direction.y, direction.z) * (180 / Math.PI);
    const b =
      Math.atan2(
        -direction.x,
        Math.sqrt(direction.y * direction.y + direction.z * direction.z)
      ) *
      (180 / Math.PI);
    const c = 0; // Assuming no rotation around the Z-axis is needed

    return new Vector(a, b, c);
  }

  getABCByDirection2(direction) {
    if (!(direction instanceof Vector)) {
      throw new Error("getABCByDirection Invalid Arguments.");
    }
    const a1 = Math.atan2(direction.y, direction.z) * (180 / Math.PI);
    const b1 =
      Math.atan2(
        -direction.x,
        Math.sqrt(direction.y * direction.y + direction.z * direction.z)
      ) *
      (180 / Math.PI);
    const c1 = 0;

    const a2 = a1 + 180;
    const b2 = -b1;
    const c2 = 180;

    const isSecondarySolutionExist =
      a2 >= 0 && a2 <= 360 && b2 >= 0 && b2 <= 360;

    if (isSecondarySolutionExist) {
      return new Vector(a2, b2, c2);
    } else {
      return new Vector(a1, b1, c1);
    }
  }

  //incomplete
  getABCByPreference(orientation, current, controllingAxis, type, options) {}

  //NS
  getOtherABCByDirection(abc) {
    if (!(abc instanceof Vector)) {
      throw new Error("getOtherABCByDirection Invalid Arguments.");
    }
    const otherA = abc.a + 180;
    const otherB = -abc.b;
    const otherC = 180;

    return new Vector(otherA, otherB, otherC);
  }

  //incomplete
  getPreferredABC(abc) {
    if (!(abc instanceof Vector)) {
      throw new Error("getPreferredABC Invalid Arguments.");
    }
  }

  remapABC(abc) {
    if (!(abc instanceof Vector)) {
      throw new Error("remapABC Invalid Arguments.");
    }
    const preferredRanges = {
      a: { min: -180, max: 180 },
      b: { min: -90, max: 90 },
      c: { min: -180, max: 180 },
    };

    let a, b, c;

    if (abc.x) {
      const angle = abc.x;

      if (!preferredRanges.hasOwnProperty(axis)) {
        throw new Error(`Unsupported rotation for axis: ${axis}`);
      }

      const range = preferredRanges[axis];
      let remappedAngle = angle;

      if (angle < range.min || angle > range.max) {
        remappedAngle = (angle - range.min) % (range.max - range.min);
        if (remappedAngle < 0) {
          remappedAngle += range.max - range.min;
        }
        remappedAngle += range.min;
      }
      a = remappedAngle;
    }

    if (abc.y) {
      const angle = abc.y;

      if (!preferredRanges.hasOwnProperty(axis)) {
        throw new Error(`Unsupported rotation for axis: ${axis}`);
      }

      const range = preferredRanges[axis];

      let remappedAngle = angle;

      if (angle < range.min || angle > range.max) {
        remappedAngle = (angle - range.min) % (range.max - range.min);
        if (remappedAngle < 0) {
          remappedAngle += range.max - range.min;
        }
        remappedAngle += range.min;
      }

      b = remappedAngle;
    }

    if (abc.z) {
      const angle = abc.z;

      if (!preferredRanges.hasOwnProperty(axis)) {
        throw new Error(`Unsupported rotation for axis: ${axis}`);
      }
      const range = preferredRanges[axis];
      let remappedAngle = angle;
      if (angle < range.min || angle > range.max) {
        remappedAngle = (angle - range.min) % (range.max - range.min);
        if (remappedAngle < 0) {
          remappedAngle += range.max - range.min;
        }
        remappedAngle += range.min;
      }

      c = remappedAngle;
    }
    return new Vector(a, b, c);
  }

  //incomplete
  remapToABC(abc, current) {
    if (!(abc instanceof Vector && current instanceof Vector)) {
      throw new Error("remapABC Invalid Arguments.");
    }

    const preferredRanges = {
      a: { min: -180, max: 180 },
      b: { min: -90, max: 90 },
      c: { min: -180, max: 180 },
    };

    // for (const axis in abc) {
    //   if (abc.hasOwnProperty(axis)) {
    //     const angle = abc[axis];
    //     if (!preferredRanges.hasOwnProperty(axis)) {
    //       throw new Error(`Unsupported rotation for axis: ${axis}`);
    //     }

    //     const currentAngle = current[axis];
    //     let remappedAngle = currentAngle + angle;
    //     const range = preferredRanges[axis];
    //     if (remappedAngle < range.min || remappedAngle > range.max) {
    //       remappedAngle = (remappedAngle - range.min) % (range.max - range.min);
    //       if (remappedAngle < 0) {
    //         remappedAngle += range.max - range.min;
    //       }
    //       remappedAngle += range.min;
    //     }

    //     remappedABC[axis] = remappedAngle;
    //   }
    // }

    // return remappedABC;
  }

  ////
  getRetractPlane() {
    return this.retractPlane;
  }

  setRetractPlane(retractPlane) {
    if (!(typeof retractPlane === "number")) this.retractPlane = retractPlane;
  }

  hasHomePositionX() {
    return this.homePosition.x !== null;
  }

  getHomePositionX() {
    return this.homePosition.x;
  }

  setHomePositionX(x) {
    this.homePosition.x = x;
  }

  hasHomePositionY() {
    return this.homePosition.y !== null;
  }

  getHomePositionY() {
    return this.homePosition.y;
  }

  setHomePositionY(y) {
    this.homePosition.y = y;
  }

  hasHomePositionZ() {
    return this.homePosition.z !== null;
  }

  getHomePositionZ() {
    return this.homePosition.z;
  }

  setHomePositionZ(z) {
    this.homePosition.z = z;
  }

  hasCenterPosition() {
    return (
      this.centerPosition.x !== null ||
      this.centerPosition.y !== null ||
      this.centerPosition.z !== null
    );
  }

  getCenterPositionX() {
    return this.centerPosition.x;
  }

  setCenterPositionX(x) {
    this.centerPosition.x = x;
  }

  getCenterPositionY() {
    return this.centerPosition.y;
  }

  setCenterPositionY(y) {
    this.centerPosition.y = y;
  }

  getCenterPositionZ() {
    return this.centerPosition.z;
  }

  setCenterPositionZ(z) {
    this.centerPosition.z = z;
  }

  hasParkPosition() {
    return (
      this.parkPosition.x !== null ||
      this.parkPosition.y !== null ||
      this.parkPosition.z !== null
    );
  }

  getParkPositionX() {
    return this.parkPosition.x;
  }

  setParkPositionX(x) {
    this.parkPosition.x = x;
  }

  getParkPositionY() {
    return this.parkPosition.y;
  }

  setParkPositionY(y) {
    this.parkPosition.y = y;
  }

  getParkPositionZ() {
    return this.parkPosition.z;
  }

  setParkPositionZ(z) {
    this.parkPosition.z = z;
  }

  getNumberExtruders() {
    return this.numberExtruders;
  }

  setNumberExtruders(num) {
    this.numberExtruders = num;
  }

  getExtruderOffsetX(extruderNo) {
    if (!Number.isInteger(extruderNo)) {
      throw new Error("getExtruderOffsetX Invalid Arguments.");
    }
    return this.extruderOffsets[extruderNo]?.x;
    // return this.numberOfTools;
  }

  setExtruderOffsetX(extruderNo, x) {
    if (!(Number.isInteger(extruderNo) && typeof x === "number")) {
      throw new Error("setExtruderOffsetX Invalid Auguments");
    }
    if (!this.extruderOffsets[extruderNo]) {
      this.extruderOffsets[extruderNo] = {};
    }
    this.extruderOffsets[extruderNo].x = x;
    //this.numberOfTools = numberOfTools;
  }

  getExtruderOffsetY(extruderNo) {
    if (!Number.isInteger(extruderNo)) {
      throw new Error("getExtruderOffsetY Invalid Auguments");
    }
    return this.extruderOffsets[extruderNo]?.x;
    //return this.numberOfTools;
  }

  setExtruderOffsetY(extruderNo, y) {
    if (!(Number.isInteger(extruderNo) && typeof y === "number")) {
      throw new Error("setExtruderOffsetY Invalid Auguments");
    }
    if (!this.extruderOffsets[extruderNo]) {
      this.extruderOffsets[extruderNo] = {};
    }
    this.extruderOffsets[extruderNo].y = y;
    //this.numberOfTools = numberOfTools;
  }

  getExtruderOffsetZ(extruderNo) {
    if (!Number.isInteger(extruderNo)) {
      throw new Error("getExtruderOffsetZ Invalid Auguments");
    }
    return this.extruderOffsets[extruderNo]?.x;
    //return this.numberOfTools;
  }

  setExtruderOffsetZ(extruderNo, z) {
    if (!(Number.isInteger(extruderNo) && typeof z === "number")) {
      throw new Error("setExtruderOffsetZ Invalid Auguments");
    }
    if (!this.extruderOffsets[extruderNo]) {
      this.extruderOffsets[extruderNo] = {};
    }
    this.extruderOffsets[extruderNo].z = z;
    //this.numberOfTools = numberOfTools;
  }

  getModel() {
    return this.configData.model;
  }

  setModel(model) {
    this.configData.model = model;
  }

  getDescription() {
    return this.configData.description;
  }

  setDescription(description) {
    this.description = description;
  }

  getVendor() {
    return this.configData.vendor;
  }

  setVendor(vendor) {
    this.configData.vendor = vendor;
  }

  getVendorUrl() {
    return this.configData.vendorUrl;
  }

  setVendorUrl(vendorUrl) {
    this.configData.vendorUrl = vendorUrl;
  }

  getControl() {
    return this.configData.control;
  }

  setControl(control) {
    this.configData.control = control;
  }

  isCoolantSupported(coolant) {
    return this.coolantSupported[coolant] || false;
  }

  setCoolantSupported(coolant, available) {
    this.coolantSupported[coolant] = available;
  }

  getRetractOnIndexing() {
    return this.retractOnIndexing;
  }

  setRetractOnIndexing(retractOnIndexing) {
    this.retractOnIndexing = retractOnIndexing;
  }

  getShortestAngularRotation() {
    return this.shortestAngularRotation;
  }

  setShortestAngularRotation(shortestAngularRotation) {
    this.shortestAngularRotation = shortestAngularRotation;
  }

  getHeadAttachPoint() {
    return this.headAttachPoint;
  }

  getTableAttachPoint() {
    return this.tableAttachPoint;
  }

  isReceived() {} //not complete
  setIsReceived(received) {} //not complete

  static getAsSpatial(text) {
    if (!(typeof text === "string")) {
      throw new Error("getAsSpatial Invalid Arguments.");
    }
    let matches = text.match(/\d+(\.\d+)?/g);
    if (matches && matches.length > 0) {
      return parseFloat(matches[0]);
    } else {
      throw new Error("No number found in the input string.");
    }
  }

  static getAsSpatialFeedrate(text) {
    if (typeof text !== "string") {
      throw new Error("getAsSpatialFeedrate Invalid Argument.");
    }

    var regex = /(\d+(\.\d+)?)\s*(mm|cm|in|m|ft|km)\/min/g;
    var matches = text.match(regex);

    if (matches && matches.length > 0) {
      var match = matches[0];
      var value = parseFloat(match);
      return value;
    } else {
      throw new Error("No spatial value found in the input string.");
    }
  }

  static getAsAngularFeedrate(text) {
    if (typeof text !== "string") {
      throw new Error("getAsAngularFeedrate Invalid Argument.");
    }

    var regex = /(\d+(\.\d+)?)\s*(deg|rad)\/min/g;
    var matches = text.match(regex);

    if (matches && matches.length > 0) {
      var match = matches[0];
      var value = parseFloat(match);

      if (match.includes("deg")) {
        return (value * Math.PI) / 180;
      } else {
        return value;
      }
    } else {
      throw new Error("No angular feedrate value found in the input string.");
    }
  }

  static getAsWeight(text) {
    if (typeof text !== "string") {
      throw new Error("getAsWeight Invalid Argument.");
    }

    var regex = /(\d+(\.\d+)?)\s*(g|kg|lb)/g;
    var matches = text.match(regex);

    if (matches && matches.length > 0) {
      var match = matches[0];
      var value = parseFloat(match);

      if (match.includes("g")) {
        return value / 1000; // Convert grams to kilograms
      } else if (match.includes("lb")) {
        return value * 0.453592; // Convert pounds to kilograms
      } else {
        return value;
      }
    } else {
      throw new Error("No weight value found in the input string.");
    }
  }

  static getAsPower(text) {
    if (typeof text !== "string") {
      throw new Error("getAsPower Invalid Argument.");
    }

    var regex = /(\d+(\.\d+)?)\s*(W|kW|hp)/g;
    var matches = text.match(regex);

    if (matches && matches.length > 0) {
      var match = matches[0];
      var value = parseFloat(match);

      if (match.includes("kW")) {
        return value * 1000; // Convert kilowatts to watts
      } else if (match.includes("hp")) {
        return value * 745.7; // Convert horsepower to watts
      } else {
        return value;
      }
    } else {
      throw new Error("No power value found in the input string.");
    }
  }

  static getAsAngular(text) {
    if (typeof text !== "string") {
      throw new Error("getAsAngular Invalid Argument.");
    }

    var regex = /(\d+(\.\d+)?)\s*(rad)?/g;
    var matches = text.match(regex);

    if (matches && matches.length > 0) {
      var match = matches[0];
      var value = parseFloat(match);

      if (match.includes("rad")) {
        return value;
      } else {
        return value * Math.PI; // Convert degrees to radians
      }
    } else {
      throw new Error("No angle value found in the input string.");
    }
  }

  static getAsTime(text) {
    if (typeof text !== "string") {
      throw new Error("getAsTime Invalid Argument.");
    }

    var regex = /(\d+(\.\d+)?)\s*(s|min|h)/g;
    var matches = text.match(regex);

    if (matches && matches.length > 0) {
      var match = matches[0];
      var value = parseFloat(match);

      if (match.includes("s")) {
        return value;
      } else if (match.includes("min")) {
        return value * 60; // Convert minutes to seconds
      } else if (match.includes("h")) {
        return value * 3600; // Convert hours to seconds
      }
    } else {
      throw new Error("No time value found in the input string.");
    }
  }

  //incomplete
  static createFromXML(xml) {}
  createFromPath(path) {}
  getStatusDescription(status) {}
  //{
  // //Returns the X-coordinate home position
  // getHomePositionY() {
  //   return priorOutput.X;
  // }

  // //Returns the Y-coordinate home position
  // getHomePositionX() {
  //   return priorOutput.Y;
  // }

  // //Returns the Z-coordinate home position
  // getHomePositionZ() {
  //   return priorOutput.Z;
  // }

  // getCenterPositionX(id) {
  //   return this.configData.centerPositionX;
  // }

  // getCenterPositionY(id) {
  //   return this.configData.centerPositionY;
  // }

  // getCenterPositionZ(id) {
  //   return this.configData.centerPositionZ;
  // }
  // getNumberExtruders() {
  //   return this.configData.numberExtruders;
  // }

  // getMaximumSpindleSpeed() {
  //   return this.configData.maximumSpindleSpeed;
  // }

  // isHeadConfiguration() {
  //   if (this.axis.length === 3) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  // isMultiAxisConfiguration() {
  //   if (
  //     this.axis.length === 3 &&
  //     this.axis[0] &&
  //     this.axis[1] &&
  //     this.axis[2]
  //   ) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }
  // isReceived() {
  //   return false;
  // }
  // isMachineCoordinate(coordinate) {
  //   if (coordinate === 0) {
  //     return this.axis[0] !== 0;
  //   } else if (coordinate === 1) {
  //     return this.axis[1] !== 0;
  //   } else if (coordinate === 2) {
  //     return this.axis[2] !== 0;
  //   }
  // }

  // //Returns true if the X-coordinate of the home position is valid.
  // hasHomePositionX() {
  //   if (priorOutput.X !== undefined) {
  //     return true;
  //   } else return false;
  // }

  // //Returns true if the Y-coordinate of the home position is valid
  // hasHomePositionY() {
  //   if (priorOutput.Y !== undefined) {
  //     return true;
  //   }
  // }

  // //Returns true if the Z-coordinate of the home position is valid
  // hasHomePositionZ() {
  //   if (priorOutput.Z !== undefined) {
  //     return true;
  //   }
  // }

  // //Returns the machine retraction plane coordinate (by default it sending first plane)
  // getRetractPlane() {
  //   return 2;
  // }

  // //Returns the matrix for the specified ABC angles.
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

    //   const orientationMatrix = new Matrix();

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

  // //not found exect logic just sending vector (not implemented)
  // getABCByPreference(orientation, current, controllingAxis, type, options) {
  //   let ABCByPre = new Vector();
  //   return ABCByPre;
  // }
  // setMultiAxisFeedrate(
  //   feedMode,
  //   maximumFeedrate,
  //   feedType,
  //   outputTolerance,
  //   bpwRatio
  // ) {}

  // //Returns the multi-axis feed mode. Returns FEED_INVERSE_TIME, FEED_DPM or FEED_FPM(ND)
  // getMultiAxisFeedrateMode() {
  //   return 1;
  // }
  // getMultiAxisFeedrateInverseTimeUnits() {
  //   return 1;
  // }
  // getMultiAxisFeedrateDPMType() {
  //   return 1;
  // }
  // getMultiAxisFeedrateMaximum() {
  //   return 1;
  // }
  // getMultiAxisFeedrateBpwRatio() {
  //   return 1;
  // }
  // getMultiAxisFeedrateOutputTolerance() {
  //   return 1;
  // }
  //}
}
//ND
global.FEED_INVERSE_TIME = 1;
global.FEED_DPM = 1;
global.FEED_FPM = 1;
global.INVERSE_MINUTES = 1;

// global.clamp = function (min, value, max) {
//   return Math.min(Math.max(value, min), max);
// };

global.MachineConfiguration = MachineConfiguration;

module.exports = MachineConfiguration;
