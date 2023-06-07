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
global.writeWords = function (...args) {
  let wordString = Object.values(args[0]).join("");
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
  let parameterVlaue = { [parameterName]: `${defaultValue}` };
  parameterArray.push(parameterVlaue);
  return parameterVlaue;
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
global.tool = 1;

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
  return { X: 0, Y: 0, Z: 0 };
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
  const newFrame = new Vector(); //not clear with this property, so just sending properties
  return newFrame;
};

//change (M06). (Not Sure)
global.COMMAND_LOAD_TOOL = 06;
global.COMMAND_COOLANT_OFF = 09;
global.COMMAND_COOLANT_ON = 08;
global.COMMAND_STOP = 00;
global.COMMAND_OPTIONAL_STOP = 01;
global.COMMAND_START_SPINDLE = 03; //right now fixed
global.COMMAND_START_CHIP_TRANSPORT = 0;
global.COMMAND_UNLOCK_MULTI_AXIS = 0;
global.OPTIMIZE_NONE = 1; // ND

//cycle
global.cycle = 30; // dont know how will it work

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
