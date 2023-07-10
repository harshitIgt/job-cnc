const Tool = require("./tool");
const { priorOutput } = require("../helper");
const Vector = require("./Vector");
const Matrix = require("./Matrix");
const Record = require("./Record");
const Range = require("./Range");
const BoundingBox = require("./BoundingBox");
const MachineConfiguration = require("./MachineConfiguration");
//const { getMachineConfiguration } = require("./PostProcessor");

class Section {
  // always returns true or false
  constructor(id = Math.floor(Math.random() * 90) + 10) {
    this.id = id; // custom
    this.recordList = []; //custom
    this.unit = 1; //NC
    this.workOrigin = new Vector();
    this.workPlane = new Matrix(1);
    this.wcsOrigin = new Vector();
    this.wcsPlane = new Matrix(1);
    this.workOffset = 1;
    this.probeWorkOffset = 2;
    this.wcsIndex = 1;
    this.wcs = "G54";
    this.dynamicWorkOffset = 1;
    this.axisSubstitution = true;
    this.axisSubstitutionRadius = 0.1;
    this.type = 1;
    this.quality = 2;
    this.tailstock = false;
    this.partCatcher = true;
    this.spindle = 1;
    this.properties = new Map();
    this.strategy = "optimize";
    this.cycles = []; // Assuming you have an array to store the cycles
  }

  Parameters = {
    STRATEGY_2D: 1,
    STRATEGY_3D: 2,
    STRATEGY_ROUGHING: 3,
    STRATEGY_FINISHING: 4,
    STRATEGY_MILLING: 5,
    STRATEGY_TURNING: 6,
    STRATEGY_JET: 6,
    STRATEGY_ADDITIVE: 7,
    STRATEGY_PROBING: 8,
    STRATEGY_INSPECTION: 9,
    STRATEGY_DRILLING: 10,
    STRATEGY_HOLEMILLING: 11,
    STRATEGY_THREAD: 12,
    STRATEGY_SAMPLING: 13,
    STRATEGY_ROTARY: 14,
    STRATEGY_SECONDARYSPINDLE: 14,
    STRATEGY_SURFACE: 15,
    STRATEGY_CHECKSURFACE: 16,
    STRATEGY_MULTIAXIS: 17,
  }; // default values
  TYPE_MILLING = 1;

  //Returns the zero-based id of the section.
  getId = function () {
    return this.id;
  };

  getOperationProperties() {
    return this.properties;
  }

  getStrategy() {
    return this.strategy;
  }

  getNumberOfRecords() {
    return this.recordList.length;
  }

  getRecord(id) {
    if (id < 0 || id > this.recordList.length - 1) {
      throw new Error("invalid id");
    }
    return this.recordList[id];
  }

  //Returns the job id of the this. (ND)
  getJobId() {}
  getPatternId() {}
  getNumberOfPatternInstances() {}
  isPatterned() {}
  getChannel() {}
  getForceToolChange() {}

  isOptional() {
    let state = true;

    return function () {
      const result = state;
      state = !state;
      return result;
    };
  }

  getFirstCompensationOffset() {}

  getTool() {
    // this function is not completed dont know (how it will work)
    return Tool;
  }

  getContent() {}

  isMultiAxis() {
    // Returns true is the section contains multi-axis toolpath.
    let state = true;

    return function () {
      const result = state;
      state = !state;
      return result;
    };
  }

  getUnit() {
    return this.unit;
  }

  getType() {
    this.type;
  }

  getQuality() {
    return this.quality;
  }

  getJetMode() {}

  getTailstock() {
    return this.tailstock;
  }

  getPartCatcher() {
    return this.partCatcher;
  }

  getSpindle() {
    return this.spindle;
  }

  getFeedMode() {}

  getToolOrientation() {}

  getWorkOrigin() {
    return this.wcsOrigin;
  }

  getWorkPlane() {
    return this.workPlane;
  }

  getDynamicWCSOrigin() {
    return this.workPlane; //NC
  }

  getDynamicWCSPlane() {
    return this.workPlane; //NC
  }

  getDynamicWorkOffset() {
    if (this.workOffset) {
      return new Matrix();
    }
  }

  getAxisSubstitution() {
    return this.axisSubstitution;
  }

  getAxisSubstitutionRadius() {
    return this.axisSubstitutionRadius;
  }

  getGlobalPosition(p) {
    if (p instanceof Vector) {
      let x_cordinate = p.x + this.wcsOrigin.x;
      let y_cordinate = p.y + this.wcsOrigin.y;
      let z_cordinate = p.z + this.wcsOrigin.z;

      return new Vector(x_cordinate, y_cordinate, z_cordinate);
    }
  }

  getWCSPosition(p) {
    if (p instanceof Vector) {
      let x_cordinate = p.x + this.wcsOrigin.x;
      let y_cordinate = p.y + this.wcsOrigin.y;
      let z_cordinate = p.z + this.wcsOrigin.z;

      return new Vector(x_cordinate, y_cordinate, z_cordinate);
    }
  }

  getSectionPosition(p) {
    if (p instanceof Vector) {
      let x_cordinate = p.x + this.wcsOrigin.x;
      let y_cordinate = p.y + this.wcsOrigin.y;
      let z_cordinate = p.z + this.wcsOrigin.z;

      return new Vector(x_cordinate, y_cordinate, z_cordinate);
    }
  }

  getMaximumSpindleSpeed() {
    let maximumSpindleSpeed = new Tool().maximumSpindleSpeed;
    return maximumSpindleSpeed;
  }

  getMaximumFeedrate() {
    return PostProcessor.feedRate; //NC
  }

  getCuttingDistance() {}
  getRapidDistance() {}

  getMovements() {
    return PostProcessor.movement;
  }

  getCycleTime() {}

  getNumberOfCyclePoints() {}

  getZRange() {
    return new Range();
  }

  getGlobalZRange() {
    return new Range();
  }

  getGlobalRange() {
    //not correct
    const positions = [];
    for (const point of this.toolpathPoints) {
      const positionAlongDirection =
        point.x * direction.x + point.y * direction.y + point.z * direction.z;
      positions.push(positionAlongDirection);
    }

    let min = Infinity;
    let max = -Infinity;
    for (const position of positions) {
      if (position < min) {
        min = position;
      }
      if (position > max) {
        max = position;
      }
    }

    const range = new Range(min, max);
    return range;
  }

  getBoundingBox() {
    return new BoundingBox();
  }

  getGlobalBoundingBox() {
    return new BoundingBox();
  }

  getOptimizedBoundingBox(machine, abc) {
    if (!(machine instanceof MachineConfiguration && abc instanceof Vector)) {
      throw new Error(
        "getOptimizedBoundingBox is require firt angumenst as MachineConfiguration and second as Vector."
      );
    }
    //incomplete
  }

  isCuttingMotionAwayFromRotary(distance, tolerance) {
    if (!(typeof distance === "number" && typeof tolerance === "number")) {
      throw new Error(
        "isCuttingMotionAwayFromRotary accepts number as arguments"
      );
    }
    // incomplete
  }

  hasWellDefinedPosition() {
    return (
      this.getInitialPosition() !== null && this.getFinalPosition() !== null
    );
  }

  getInitialPosition() {
    return new Vector(priorOutput.X, priorOutput.Y, priorOutput.Z);
  }

  getFinalPosition() {
    return new Vector();
  }

  getInitialToolAxis() {
    return new Vector();
  }

  getGlobalInitialToolAxis() {
    return new Vector();
  }

  getInitialToolAxisABC() {
    return new Vector();
  }

  getFinalToolAxis() {
    return new Vector();
  }

  getFinalToolAxisABC() {
    return new Vector();
  }

  getGlobalFinalToolAxis() {
    return new Vector();
  }

  getInitialSpindleOn() {
    return this.spindle ? true : false;
  }

  getInitialSpindleSpeed() {}

  getMaximumTilt() {
    return 1; //NC
  }

  getLowerToolAxisABC() {
    return new Vector();
  }

  getUpperToolAxisABC() {
    return new Vector();
  }

  isOptimizedForMachine() {
    const machineConfig = new MachineConfiguration();

    if (this.type === this.TYPE_MILLING && machineConfig.optimizationEnabled) {
      return true;
    }

    return false;
  }

  getOptimizedTCPMode() {
    if (this.isOptimizedForMachine()) {
      return 1; //NC
    }
    return null;
  }

  hasParameter(name) {
    if (!(typeof name === "string")) {
      throw new Error("hasParameter accepts only string.");
    }
    this.Parameters.find((element) => {
      if (element === name) {
        return true;
      }
    });
    return false;
  }

  getParameter(name, defaultValue) {
    if (!(typeof name === "string")) {
      throw new Error("getParameter accepts as a string");
    }
    this.Parameters.find((element) => {
      if (element === name) {
        this.Parameters[element];
      }
    });
    return defaultValue;
  }

  hasCycle(uri) {
    //NC
    if (!(typeof uri === "string")) {
      throw new Error("hasCycle invalid parameters.");
    }
    for (const cycle of this.cycles) {
      if (cycle.id === uri) {
        return true;
      }
    }
    return false;
  }

  hasAnyCycle() {
    return this.cycles.length > 0;
  }

  //NC
  getNumberOfCyclesWithId(uri) {
    if (!(typeof uri === "string")) {
      throw new Error("getNumberOfCycleswithId accepts string.");
    }
    let count = 0;
    for (const cycle of this.cycles) {
      if (cycle.id === uri) {
        count++;
      }
    }
    return count;
  }

  getNumberOfCycles() {
    return this.cycles.length;
  }

  getCycleId(index) {
    if (!(typeof index === "number")) {
      throw new Error("gerCycle invalid parameters.");
    }
    const numberOfCycles = this.getNumberOfCycles();
    if (index >= numberOfCycles) {
      throw new Error("Index exceeds the limit of cycles.");
    }
    return this.cycles[index].id;
  }

  getFirstCycle() {
    const numberOfCycles = this.getNumberOfCycles();
    if (numberOfCycles === 0) {
      return "";
    }
    return this.cycles[0].id;
  }

  getLastCycle() {
    const numberOfCycles = this.getNumberOfCycles();
    if (numberOfCycles === 0) {
      return "";
    }
    return this.cycles[numberOfCycles - 1].id;
  }

  doesStartWithCycle(uri) {
    if (!(typeof uri === "string")) {
      throw new Error("isFirstEffectiveMove accepts as String");
    }
    for (let i = 0; i < this.getNumberOfCycles(); i++) {
      const cycleId = this.getCycleId(i);

      if (cycleId !== "onParameter" && cycleId !== "onComment") {
        if (cycleId === uri) {
          return i === 0;
        } else {
          break;
        }
      }
    }

    return false;
  }

  doesEndWithCycle(uri) {
    if (!(typeof uri === "string")) {
      throw new Error("isFirstEffectiveMove accepts as String");
    }
    let lastCycle = this.getLastCycle();
    while (lastCycle === "onParameter" || lastCycle === "onComment") {
      lastCycle = this.getPreviousCycle(lastCycle);
    }

    _uri = lastCycle;

    return lastCycle === uri;
  }

  doesStartWithCycleIgnoringPositioning(uri) {
    if (!(typeof uri === "string")) {
      throw new Error("isFirstEffectiveMove accepts as String");
    }

    let firstCycle = this.getFirstCycle();

    while (
      firstCycle === "onParameter" ||
      firstCycle === "onComment" ||
      firstCycle === "onDwell"
    ) {
      firstCycle = this.getNextCycle(firstCycle);
    }

    return firstCycle === uri;
  }

  doesEndWithCycleIgnoringPositioning(uri) {
    if (!(typeof uri === "string")) {
      throw new Error("isFirstEffectiveMove accepts as String");
    }
    let lastEffectiveCycle = null;
    let currentIndex = this.getNumberOfCycles() - 1;

    while (currentIndex >= 0) {
      const cycleId = this.getCycleId(currentIndex);

      if (
        cycleId !== "onParameter" &&
        cycleId !== "onComment" &&
        cycleId !== "onDwell"
      ) {
        lastEffectiveCycle = cycleId;
        break;
      }

      currentIndex--;
    }

    return lastEffectiveCycle === uri;
  }

  doesStrictCycle(uri) {
    if (!(typeof uri === "string")) {
      throw new Error("isFirstEffectiveMove accepts as String");
    }
    let effectiveCycleCount = 0;
    for (let i = 0; i < this.getNumberOfCycles(); i++) {
      const cycleId = this.getCycleId(i);
      if (cycleId !== "onParameter" && cycleId !== "onComment") {
        effectiveCycleCount++;
      }
    }

    return effectiveCycleCount === 1 && this.getCycleId(0) === uri;
  }

  hasCycleParameter(index, name) {
    if (!(typeof index === "number" && typeof name === "string")) {
      throw new Error("hasCycleParameter invalid parameters.");
    }
    const cycleId = this.getCycleId(index);
    return this.hasParameter(cycleId + "." + name);
  }

  getCycleParameter(index, name) {
    if (!(typeof index === "number" && typeof name === "string")) {
      throw new Error("getCycleParameter invalid parameters.");
    }
    const cycleId = this.getCycleId(index);
    return this.getParameter(cycleId + "." + name, null);
  }

  getModelOrigin() {
    return new Vector(priorOutput.X, priorOutput.Y, priorOutput.Z); // ND
  }

  getModelPlane() {
    return new Matrix();
  }
  // getParameter = function (parameterName, defaultValue = undefined) {
  //   let parameterArray = [];
  //   for (let i of parameterArray) {
  //     if (i === parameterName) {
  //       return parameterArray[i];
  //     }
  //   }
  //   let parameterVlaue = { [parameterName]: `${defaultValue}` };
  //   parameterArray.push(parameterVlaue);
  //   return defaultValue ? defaultValue : "";
  // };

  // Return records with the given parameters as a id
  // also we have add records array for now

  //unkwnown method's

  getNextCycle(currentCycle) {
    //
    const currentIndex = this.cycles.findIndex(
      (cycle) => cycle === currentCycle
    );

    if (currentIndex !== -1 && currentIndex < this.cycles.length - 1) {
      return this.cycles[currentIndex + 1];
    }
    return null;
  }
}

global.Section = Section;

module.exports = Section;
