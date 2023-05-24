const  fs = require('fs');
const { format } = require('path');
const filePath = 'output.nc';

global.defaultFeedRate = 0 ;
global.defaultSpindleSpeed = 0 ;
global.defaultToolOffset = 0 ;

let priorOutput = {
  X: undefined,
  Y: undefined,
  Z: undefined,
  R: undefined,
  RCount: false,
}


global.writeToFile = function(data) {
    fs.appendFile(filePath, data + '\n', (err) => {
      if (err) throw err;
    });
  }
global.writeln = function(data) {
    fs.appendFile(filePath, data + ' ', (err) => {
      if (err) throw err;
    });
  }
// const createFormate = function(value) {
//   console.log('>>>>>>>>>>>>>>>>>>>>>>>')
//        let variable = {
//         decimals: value.decimals ? value.decimals : 6,
//         prefix: value.prefix ? value.prefix : undefined, 
//         sufix: value.sufix ? value.sufix : undefined, 
//        }  
//        return variable
// }


global.moveX = function(value){
  writeToFile(`x${value}`)
}
global.moveY = function(value){
  writeToFile(`y${value}`)
}
global.moveZ = function(value){
  writeToFile(`z${value}`)
}
global.onLinear = function(){
  writeToFile(``)
}

global.onMovements = function(selectedObjects) {
  if (selectedObjects.length > 0) {
      
      switch (selectedObjects) {
        case 'MOVEMENT_CUTTING':
          
          performCutting();
          break;
        case 'MOVEMENT_DRILLING':
          
          performDrilling();
          break;
        case 'MOVEMENT_LEAD_OUT':
          
        performLeadOut();
          break;
        case 'MOVEMENT_LEAD_IN':
          
        performLeadIn();
          break;
        default:
          
          break;
    }
  }
}

function performCutting() {
  writeToFile(`\n(Cutting)\n`)
}

function performDrilling() {
  writeToFile(`\n(Drilling)\n`)
}

function performLeadIn() {
  writeToFile(`\n(MOVEMENT_LEAD_IN)\n`)
}
function performLeadOut() {
  writeToFile(`\n(MOVEMENT_LEAD_OUT)\n`)
}

global.onParameters = function(name, value) {
  
  switch (name) {
    case 'feedRate':
      setCNCFeedRate(value);
      break;
    case 'spindleSpeed':
      setCNCSpindleSpeed(value);
      break;
    case 'toolOffset':
      setCNCToolOffset(value);
      break;
    default:
      break;
  }
}
function setCNCFeedRate(value) {
  global.defaultFeedRate = value;
}
function setCNCSpindleSpeed(value){
  global.defaultSpindleSpeed = value;
}
function setCNCToolOffset(value){
  global.defaultToolOffset = value;
}


global.generateAxisCommand = function( X, Y, Z, points ) {
  let gCodeCommand = ''
  if (X !== priorOutput.X) {
    gCodeCommand += `X${X} `
    priorOutput.X = X
  }
  if (Y !== priorOutput.Y) {
    gCodeCommand += `Y${Y} `
    priorOutput.Y = Y
  }
  if(points){
    if(priorOutput.RCount === true){
      gCodeCommand += priorOutput.R ? `R${priorOutput.R} ` : ``
      priorOutput.RCount = false
    }
  }
  else{
    priorOutput.R = Z
    priorOutput.RCount = true
  }
  if (Z !== priorOutput.Z) {
    gCodeCommand += `Z${Z} `
    priorOutput.Z = Z
  }
  return gCodeCommand
}

global.reactPlane = function(Z = undefined){
  let reactPlaneValue = ''
  if (Z !== priorOutput.Z) {
    reactPlaneValue += `R${priorOutput.Z}`
  }
  return reactPlaneValue
}

global.toFixedFormat = function (value) {
  let result = Number(String(value.toFixed(4)))
  return result
}

global.resetPriorValues = function () {
  for(let key in priorOutput){
    priorOutput[key] = undefined
  }
  return
}

//properties: createFormat
const createFormate = function (details){
  let variable = {
     prefix: details.prefix,
     decimals: details.decimals ? details.decimals : 6,
     forceDecimal: details.forceDecimal ? details.forceDecimal : false,
     zeropad: details.zeropad ? details.zeropad : false,
     width: details.width ? details.width : 0,
     format: function (value){
      value = value.toString()
      let result = this.prefix
      if(this.zeropad){
        value = value.replace(/0/g, '')
      }
      if(value.length > this.width){
        value = value.slice(-this.width)
      }
      if(value.length < this.width){
        value = value.padStart(this.width, '0')
      }
      result +=value+' '
      return result
     }
  }
  return variable
}

//properties: createVariable
const createVariable  = function(details, formatVariable) {
  
  let variable = {
    prefix: details.prefix,
    force: details.force,
    onchange: details.onchange,
    formatVariable: formatVariable,
    format: function(value){
      let previousVariableValue 
      if(this.prefix === 'X'){
        //compare the previous X variable value
        if(value !== priorOutput.X){
          previousVariableValue = value
          priorOutput.X = value
        }else{
          return ''
        }
      }else if (this.prefix === 'Y'){
        //compare the previous Y variable value
        if(value !== priorOutput.Y){
          previousVariableValue = value
          priorOutput.Y = value
        }else{
          return ''
        }
      }else if (this.prefix === 'Z'){
        //compare the previous Z variable value
        if(value !== priorOutput.Z){
          previousVariableValue = value
          priorOutput.Z = value
        }else{
          return ''
        }
      }else {
        previousVariableValue = value
      }
      let decimalPlaces = this.formatVariable.decimals
      let result = previousVariableValue.toFixed(decimalPlaces)
      result = `${this.prefix}${result} `
      return result
    }
  }

  return variable
}


module.exports = {writeToFile, createFormate, createVariable, moveX,
   moveY, moveZ, onMovements, writeln, onParameters, defaultFeedRate, defaultSpindleSpeed, 
   defaultToolOffset, generateAxisCommand, reactPlane, toFixedFormat, resetPriorValues } 