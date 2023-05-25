const{ createFormate, createVariable } = require('./src/utils/helper')
let unit = `MM`
let xyzFormat = createFormate({decimals:(unit === `MM` ? 3 : 4), forceDecimal:true})
let ijkFormat = createFormate({decimals:(unit === `MM` ? 3 : 4), forceDecimal:true})
var gFormat = createFormate({prefix:"G", width:2, zeropad:true, decimals:1})

let xOutput = createVariable({prefix:'X'}, xyzFormat)
let yOutput = createVariable({prefix:'Y'}, xyzFormat)
let zOutput = createVariable({prefix:'Z'}, xyzFormat)
let iOutput = createVariable({prefix:'I'}, ijkFormat)
let jOutput = createVariable({prefix:'J'}, ijkFormat)
let kOutput = createVariable({prefix:'K'}, ijkFormat)

minimumChordLength = spatial(0.25, unit)
minimumCircularRadius = spatial(0.01, unit)
maximumCircularRadius = spatial(1000, unit)
minimumCircularSweep = toRad(0.01)
maximumCircularSweep = toRad(180)

let currentMotionMode = gFormat.format(80)


function onOpen() {

 const gCode = [
   '%',
   'G90 ',
   'G0 X10 Y10 Z5 ',
   'G1 Z-10 F100 ',
   'G0 Z5 '
 ];

 const gCodeText = gCode.join('\n')
 writeBlock(gCodeText);
}

function onClose() {
 
 const gCode = [
   'G0 X0 Y0 Z0 ',
   'M5 ',
   'M30',
   '%'
 ];

 const gCodeText = gCode.join('\n')
 writeBlock(gCodeText);
 
}


function onSection() {
 
 resetPriorValues() // reset all values unknown

 const gCode = [
   'G90',
   'G0 X20 Y20 Z10 ',
   'G1 Z-5 F200 ',
   'G2 X30 Y30 I5 J5 F100 ',
   'G1 X40 Y40 F200 ',
   'G1 Z0 ',
   'G0 X20 Y20 '
 ];
 const gCodeText = gCode.join('\n')
 writeBlock(gCodeText);
 
}


function onSectionEnd() {

 const gCode = [
   'G0 X0 Y0 ',
   'M5 '
 ];

 const gCodeText = gCode.join('\n')
 writeBlock(gCodeText)
}

function onLinear (_X, _Y, _Z, _feedRate){
 const gCode = gFormat.format(1)
 const xCode = xOutput.format(_X)
 const yCode = yOutput.format(_Y)
 const zCode = zOutput.format(_Z)
 
  const value = `${gCode}${xCode}${yCode}${zCode}`
  writeBlock(value)
}

function onCircular(clockwise, cx, cy, cz, x, y, z, feed) {
 
 const gCode = clockwise ? gFormat.format(2) : gFormat.format(3)
 
 const i = cx - x
 const j = cy - y
 const k = cz - z

 const iCode = iOutput.format(i)
 const jCode = jOutput.format(j)
 const kCode = kOutput.format(k)
 
 const xCode = xOutput.format(x)
 const yCode = yOutput.format(z)   
 const zCode = zOutput.format(z)
 

 const fCode = feed != 0 ?`F${feed.toFixed(2)} `: `F${defaultFeedRate.toFixed(2)} ` 
 
 const circularCode = `${gCode}${xCode}${yCode}${zCode}${iCode}${jCode}${kCode}${fCode}`
 writeBlock(circularCode)
 return 
}

function onRapid ( _X, _Y, _Z ) {
 const gCode =  gFormat.format(0)
 const xCode = xOutput.format(_X)
 const yCode = yOutput.format(_Y)
 const zCode = zOutput.format(_Z)

 const value = `${gCode}${xCode}${yCode}${zCode}`
 writeBlock(value)
 return
}

function onCycle(){
 writeln(`G81`)
 currentMotionMode = `G81 `
 return
}

function onCycleEnd(){
 if(currentMotionMode !== `G80 `){
   currentMotionMode = `G80 `
 }
 return
}

function  onCyclePoint( _X, _Y, _Z){

 const xCode = _X.toFixed(3)
 const yCode = _Y.toFixed(3)
 const zCode = _Z.toFixed(3)

 const command = generateAxisCommand(xCode, yCode, zCode, true)

 //const command = `${xCode} ${yCode} ${reactPlaneValue} ${zCode}`
 writeBlock(command)
 return
}

function onMovement(value){
 onMovements(value)
}
function onParameter(name, value){
 onParameters(name, value)
}
module.exports = { onOpen, onLinear, onClose, onSection, onSectionEnd, onCircular, onMovement, onParameter, onRapid, onCycle, onCycleEnd, onCyclePoint}