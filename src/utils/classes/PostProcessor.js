const fs = require("fs");
const path = require("path");
const filePath = "output.nc";

const Section = require("./Section");
const { priorOutput } = require("../helper");
const Format = require("./Format");
const Modal = require("./Modal");
const Variable = require("./Variable");

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
};

// writes multiple word's in  nc file
global.writeWords2 = function (...args) {
  let wordString = args.map((obj) => Object.values(obj).join("")).join(" ");
  fs.appendFile(filePath, wordString + "\n", (err) => {
    if (err) throw err;
  });
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
};
