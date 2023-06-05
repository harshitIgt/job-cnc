const fs = require("fs");
const path = require("path");
const { format } = require("path");
const filePath = "output.nc";
const stream = fs.createReadStream("action.js");

global.defaultFeedRate = 0;
global.defaultSpindleSpeed = 0;
global.defaultToolOffset = 0;

let priorOutput = {
  X: undefined,
  Y: undefined,
  Z: undefined,
  R: undefined,
  RCount: false,
};

global.minimumChordLength = 0;
global.minimumCircularRadius = 0;
global.maximumCircularRadius = 0;
global.minimumCircularSweep = 0;
global.maximumCircularSweep = 0;
global.allowHelicalMoves = 0;

let isProbeOperation = false;
let isProbingCycle = false;
let isRedirecting = false;

global.setCodePage = function (pageType) {
  stream.encoding = pageType;
};

global.writeBlock = function (data) {
  fs.appendFile(filePath, data + "\n", (err) => {
    if (err) throw err;
  });
};
global.writeln = function (data) {
  fs.appendFile(filePath, data + "\n", (err) => {
    if (err) throw err;
  });
};

global.onLinear = function () {
  writeBlock(``);
};

global.onMovements = function (selectedObjects) {
  if (selectedObjects.length > 0) {
    switch (selectedObjects) {
      case "MOVEMENT_CUTTING":
        performCutting();
        break;
      case "MOVEMENT_DRILLING":
        performDrilling();
        break;
      case "MOVEMENT_LEAD_OUT":
        performLeadOut();
        break;
      case "MOVEMENT_LEAD_IN":
        performLeadIn();
        break;
      default:
        break;
    }
  }
};

function performCutting() {
  writeBlock(`\n(Cutting)\n`);
}

function performDrilling() {
  writeBlock(`\n(Drilling)\n`);
}

function performLeadIn() {
  writeBlock(`\n(MOVEMENT_LEAD_IN)\n`);
}
function performLeadOut() {
  writeBlock(`\n(MOVEMENT_LEAD_OUT)\n`);
}

global.onParameters = function (name, value) {
  switch (name) {
    case "feedRate":
      setCNCFeedRate(value);
      break;
    case "spindleSpeed":
      setCNCSpindleSpeed(value);
      break;
    case "toolOffset":
      setCNCToolOffset(value);
      break;
    default:
      break;
  }
};
function setCNCFeedRate(value) {
  global.defaultFeedRate = value;
}
function setCNCSpindleSpeed(value) {
  global.defaultSpindleSpeed = value;
}
function setCNCToolOffset(value) {
  global.defaultToolOffset = value;
}

global.reactPlane = function (Z = undefined) {
  let reactPlaneValue = "";
  if (Z !== priorOutput.Z) {
    reactPlaneValue += `R${priorOutput.Z}`;
  }
  return reactPlaneValue;
};

global.toFixedFormat = function (value) {
  let result = Number(String(value.toFixed(4)));
  return result;
};

global.resetPriorValues = function () {
  for (let key in priorOutput) {
    priorOutput[key] = undefined;
  }
  return;
};

// property: createReferenceVariable
global.createReferenceVariable = (obj, formatVariable) => {
  let variable = {
    prefix: obj.prefix,
    force: obj.force,
    onchange: obj.onchange,
    suffix: obj.suffix,
    fist: obj.fist,
    formatVariable: formatVariable,
    format: function (value, decimals) {
      if (value === decimals) {
        return "";
      }
      if (typeof value === "number") {
        return this.prefix + value.toFixed(decimals).padStart(this.fist, "0");
      } else {
        return "";
      }
    },
  };
  return variable;
};

// property:createAxis
global.createAxis = function (details) {
  let variable = {
    actuator: details.actuator,
    table: details.table,
    axis: details.axis,
    homePosition: details.homePosition,
    offset: details.offset,
    coordinate: details.coordinate ? details.coordinate : 0,
    cyclic: details.cyclic,
    tcp: details.tcp,
    range: details.range,
    preference: details.preference,
    resolution: details.resolution ? details.resolution : 0,
    maximumFeed: details.maximumFeed ? details.maximumFeed : 0,
    rapidFeed: details.rapidFeed ? details.rapidFeed : 0,
    reset: details.reset ? details.reset : 0,
  };

  return variable;
};

// converts degree to radians
global.toRad = function (degree) {
  let radians = degree * (Math.PI / 180);
  return radians;
};

global.toDeg = function (radians) {
  let degree = (radians * 180) / Math.PI;
  return degree;
};

// converts units either MM to IN or IN to MM
global.toPreciseUnit = function (value, unit) {
  let resultValue;
  if (unit === `MM`) {
    resultValue = value * 25.4;
  } else {
    resultValue = value / 25.4;
  }
  return resultValue;
};

// sending the value in the MM format
global.spatial = function (value, unit) {
  let resultValue;
  if (unit === `MM`) {
    resultValue = value * 25;
  }
  return resultValue;
};

// convert string to number
global.getAsInt = function (text) {
  if (typeof text === "string") {
    let value = Number(text);
    if (value) {
      return value;
    } else {
      return "";
    }
  }
  return "";
};

// sends the result if condition is true else return empty string
global.conditional = function (isTrue, value) {
  let resultString;
  if (isTrue === true) {
    resultString = value;
  } else {
    resultString = "";
  }
  return resultString;
};

let FirstCyclePoint = 0;

global.isFirstCyclePoint = function () {
  if (FirstCyclePoint === 0) {
    FirstCyclePoint++;
    return true;
  } else if (count > 0) {
    return false;
  }
};

global.validate = function (isTrue, action) {
  if (!isTrue) {
    return action;
  }
  return "";
};

global.setMachineConfiguration = function (machineConfig) {
  return true;
};

let sequenceNumber = 5;
global.getProperty = function (property) {
  // prperty has to be defined
  if (property === "sequenceNumberStart" || "showSequenceNumbers") {
    sequenceNumber += 5;
    return sequenceNumber;
  }
  if (property === "useParametricFeed") {
    return false;
  }
  return `true`;
};

//there is problem we have to handle
global.formatWords = function (...args) {
  let wordString = Object.values(args[0]).join("");
  return wordString;
};

// it sets the word separated
global.setWordSeparator = function (msg, separator = " ") {
  if (typeof msg === "string") {
    msg = msg.split(" ").join(separator);
    return;
  } else {
    throw new Error("Invalid type");
  }
};

// filter messages
global.filterText = function (text, keep) {
  if (typeof text === "string" && typeof keep === "string") {
    var filteredText = "";
    for (var i = 0; i < text.length; i++) {
      if (keep.includes(text[i])) {
        filteredText += text[i];
      }
    }
    return filteredText;
  }
};

// find the total number of sections in action file
global.getNumberOfSections = function () {
  let actinsFileLocation = path.join(__dirname, "../../action.js");
  let actions = "";
  fs.readFile(actinsFileLocation, "utf8", function (err, data) {
    if (err) throw err;
    actions = data;
  });
  const regex = new RegExp("\\b" + "onSection()" + "\\b", "gi");
  const matches = actions.match(regex);
  return matches ? matches : 0;
};

let properties;
global.getPropertyValues = function (value) {
  properties = value;
  console.log(`p: ${properties}`);
};

global.setProperty = function (propertyName, value) {
  if (properties[propertyName]) {
    let updatedProperty = properties[propertyName];
  }
};

module.exports = {
  setCodePage,
  isFirstCyclePoint,
  createReferenceVariable,
  toRad,
  toDeg,
  toPreciseUnit,
  spatial,
  conditional,
  onMovements,
  writeln,
  onParameters,
  defaultFeedRate,
  getProperty,
  defaultSpindleSpeed,
  defaultToolOffset,
  reactPlane,
  toFixedFormat,
  resetPriorValues,
  minimumChordLength,
  minimumCircularRadius,
  maximumCircularRadius,
  minimumCircularSweep,
  maximumCircularSweep,
  allowHelicalMoves,
  getAsInt,
  validate,
  createAxis,
  setMachineConfiguration,
  formatWords,
  setWordSeparator,
  filterText,
  getNumberOfSections,
  priorOutput,
  getPropertyValues,
};
