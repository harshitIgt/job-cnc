const fs = require("fs");
const path = require("path");
const filePath = "output.nc";

const Section = require("./Section");
const { priorOutput } = require("../helper");
const Format = require("./Format");
const Modal = require("./Modal");
const Variable = require("./Variable");
const ToolTable = require("./ToolTable");
const Vector = require("./Vector");
const Tool = require("./tool");

//property will run only inside the onSection() and onSectionEnd() functions
global.currentSection = new Section();

//this function may be incorrect, have to check again
global.isToolChangeNeeded = function (section = currentSection, arguments) {
  // if (typeof section !== "Section" && typeof arguments !== "string") {
  //   throw new Error("Please enter valid arguments");
  // }
  return false; // there is no logic just return false
};

// this function is not completed
global.localize = function (message) {
  return message;
};

// check if  tool axis points along the Z-axis
global.is3D = function () {
  if (priorOutput.Z != undefined) {
    return true;
  } else return false;
};

global.createFormat = function (args) {
  let newFormatVale = new Format(args);
  return newFormatVale;
};

global.createModal = function (specifiers, format = undefined) {
  let newModal = new Modal(specifiers, format);
  return newModal;
};

// writes word in  nc file
let i = 0;
global.writeWords = function (...args) {
  let wordString;
  if (args[0] == "/") {
    wordString = args
      .slice(1)
      .map((obj) => Object.values(obj).join(""))
      .join(" ");
  } else {
    wordString = args.map((obj) => Object.values(obj).join("")).join(" ");
  }

  fs.appendFile(filePath, wordString + "\n", (err) => {
    if (err) throw err;
  });
  //console.log(wordString);
};

// writes multiple word's in  nc file
global.writeWords2 = function (...args) {
  let wordString = args.map((obj) => Object.values(obj).join("")).join(" ");
  fs.appendFile(filePath, wordString + "\n", (err) => {
    if (err) throw err;
  });
  //console.log(wordString);
};

// it will return new variable
global.createVariable = function (specifiers = {}, format = {}) {
  const resultVariable = new Variable(specifiers, format);
  return resultVariable;
};

//function is  not copmleted
global.isNewWorkOffset = function (Section) {
  return true;
};

//function is  not copmleted
global.isNewWorkPlane = function (Section) {
  return true;
};

// return true if current section is first section
global.isFirstSection = function () {
  return true; // write now we assume erevry section is first section but we will corrent the logic
};

//storing the parameters value in the array and getParameter function is updating the parameter's
let parameterArray = [];
global.getParameter = function (parameterName, defaultValue = undefined) {
  for (let i of parameterArray) {
    if (i === parameterName) {
      return parameterArray[i];
    }
  }
  let parameterVlaue = { [parameterName]: `${defaultValue}` };
  parameterArray.push(parameterVlaue);
  return defaultValue ? defaultValue : "";
};

//return true if parameter is present else return false
global.hasParameter = function (parameterName) {
  const foundKey = Object.keys(parameterArray).find(
    (key) => key === parameterName
  );
  if (foundKey) return true;
  else return false;
};

//need to check
global.TOOL_PROBE = 1;
global.spindleSpeed = 1;

// not implemented
global.isDrillingCycle = function () {
  return true;
};

// did not find about this function
global.writeSectionNotes = function () {
  return;
};

//Returns the next tool with a different tool number (ND)
global.getNextTool = function (number) {
  // if (typeof  number !== "number") {
  //   throw new Error("gerNextTool must be a number");
  // }
  return number;
};
global.getFirstTool = function () {
  return 1;
};

//attributes
// it returns the current tool by it is currently return 1 (not detail information in docs)
global.tool = new Tool();

//coordinate index
global.X = priorOutput.X;
global.Y = priorOutput.Y;
global.Z = priorOutput.Z;

//Returns true if section is a tapping operation, otherwise returns false (ND)
global.isTappingCycle = function (sections) {
  return true;
};

// Returns true if activatePolarMode() has been called
global.isPolarModeActive = function () {
  return true;
};

// Returns the tool axis if the section is not optimized for the machine (ND)
global.getCurrentDirection = function () {
  return new Vector();
};

//Returns the id of the current section. Returns -1 is no section is active
global.getCurrentSectionId = function () {
  return 1; // we are currently sending 1
};

global.isInspectionOperation = function (section) {
  return false; // temporarily
};
global.isProbeOperation = function (section) {
  return true;
};

//Sets the tool axis if the section is not optimized for the machine
global.setCurrentDirection = function (direction) {
  return; // not implemented yet
};

//Called to pass the current machine angles back to the post engine. (not implemented yet)
global.setCurrentABC = function () {
  return;
};

global.getToolTable = function () {
  return new ToolTable();
};

global.getToolTypeName = function (tool) {
  return "drill"; // ND
};

global.getFramePosition = function (position) {
  const newFrame = new Vector(0, 0, 0); //not clear with this property, so just sending properties
  return newFrame;
};

global.isSameDirection = function (vector1, vector2) {
  return Vector.dot(vector1, vector2) > 1 - 1e-7;
};

//Returns true if the specified parameter has been defined globally
global.hasGlobalParameter = function () {
  return true; // we don't complete it for now
};

// Returns the first value of the specified global parameter
global.getGlobalParameter = function (value, defaultValue = "") {
  let globalParameters = [];
  if (value in globalParameters) {
    return globalParameters[value];
  }

  // Return the defaultValue if the parameter is not defined
  return defaultValue;
};

//Returns true if the current section is the last section. (right now we are assuming current section is the last section is the last section)
global.isLastSection = function () {
  return true;
};

//Returns true if the output is being redirected(ND)
global.isRedirecting = function () {
  return false;
};

//Returns the current position
global.getCurrentPosition = function () {
  return new Vector(priorOutput.X, priorOutput.Y, priorOutput.Z);
};

//ND
global.optimizeMachineAngles2 = function (optimizeType) {
  return;
};

// there are multiple types of cycleType but for testing adding one cycle
global.cycleType = "probing - x";

//change (M06). (Not Sure)
global.COMMAND_LOAD_TOOL = 6;
global.COMMAND_COOLANT_OFF = 9;
global.COMMAND_COOLANT_ON = 8;
global.COMMAND_STOP = 0;
global.COMMAND_OPTIONAL_STOP = 1;
global.COMMAND_START_SPINDLE = 3; //right now fixed
global.COMMAND_START_CHIP_TRANSPORT = 0;
global.COMMAND_UNLOCK_MULTI_AXIS = 0;
global.OPTIMIZE_NONE = 1; // ND
global.COMMAND_STOP_SPINDLE = 5;
global.COMMAND_COOLANT_OFF = 9;

// create but may not correct (Locks the 4th and 5th axes. This command is optional)
global.COMMAND_LOCK_MULTI_AXIS = function () {
  priorOutput.AXIS_4 = undefined;
  priorOutput.AXIS_5 = undefined;
};

//Unlocks the 4th and 5th axes. This command is optional
global.COMMAND_UNLOCK_MULTI_AXIS = function () {
  priorOutput.AXIS_4 = 1;
  priorOutput.AXIS_5 = 1;
};

global.COMMAND_STOP_CHIP_TRANSPORT = function () {
  return true; // ND
};

global.COMMAND_STOP_CHIP_TRANSPORT = function () {
  return true; // ND
};
global.COMMAND_BREAK_CONTROL = function () {
  return true; // ND
};
global.COMMAND_TOOL_MEASURE = function () {
  return true; // ND
};
global.COMMAND_PROBE_ON = function () {
  return true; // ND
};
global.COMMAND_PROBE_OFF = function () {
  return true; // ND
};

//Returns the string id for the specified command (ND)
global.getCommandStringId = function (command) {
  if (command <= 5) return COMMAND_STOP_SPINDLE; // temporarily fix
  return Math.floor(Math.random() * 9000 + 9000);
};

//Called to invoke onRapid5D in the post engine. (ND)
global.invokeOnRapid5D = function (x, y, z, dx, dy, dz) {
  return true;
};

//
global.onUnsupportedCoolant = function (coolant) {
  return;
};

//
global.MOVEMENT_HIGH_FEED = 1; // ND

//
global.highFeedMapping = 2;
global.HIGH_FEED_NO_MAPPING = 2;

// Specifies the capability flags. (ND how to set the capability)
global.CAPABILITY_MILLING = 1;
global.CAPABILITY_TURNING = 2;
global.CAPABILITY_JET = 4;
global.CAPABILITY_SETUP_SHEET = 8;
global.CAPABILITY_INTERMEDIATE = 16;
global.CAPABILITY_CASCADING = 32;
global.CAPABILITY_MACHINE_SIMULATION = 64;

// default unit IN
global.unit = `IN`;
global.DEG = `DEG`;
global.description = "FANUC";
global.vendor = "Fanuc";

//
global.ENABLE_WCS = 1; // dont know how will it work

//cycle
global.cycle = 30; // dont know how will it work

//mode
global.COOLANT_FLOOD = "COOLANT_FLOOD";
global.COOLANT_MIST = "COOLANT_MIST";
global.COOLANT_THROUGH_TOOL = "COOLANT_THROUGH_TOOL";
global.COOLANT_AIR = "COOLANT_AIR";
global.COOLANT_AIR_THROUGH_TOOL = "COOLANT_AIR_THROUGH_TOOL";
global.COOLANT_SUCTION = "COOLANT_SUCTION";
global.COOLANT_FLOOD_MIST = "COOLANT_FLOOD_MIST";
global.COOLANT_FLOOD_THROUGH_TOOL = "COOLANT_FLOOD_THROUGH_TOOL";
global.COOLANT_OFF = "COOLANT_OFF";

module.exports = {
  currentSection,
  localize,
  is3D,
  createModal,
  writeWords,
  writeWords2,
  createVariable,
  isNewWorkOffset,
  isNewWorkPlane,
  isFirstSection,
  getParameter,
  hasParameter,
  TOOL_PROBE,
  isDrillingCycle,
  spindleSpeed,
  writeSectionNotes,
  tool,
  X,
  Y,
  Z,
  COMMAND_LOAD_TOOL,
  COMMAND_COOLANT_OFF,
  COMMAND_COOLANT_ON,
  COMMAND_STOP,
  COMMAND_OPTIONAL_STOP,
  COMMAND_START_SPINDLE,
};
