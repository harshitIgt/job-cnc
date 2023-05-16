const { writeToFile, writeln, onMovements, defaultFeedRate, onParameters, defaultSpindleSpeed, defaultToolOffset } =  require('./src/utils/helper')


function onOpen() {
 
  const gCode = [
    '%',
    'G90 ',
    'G0 X10 Y10 Z5 ',
    'G1 Z-10 F100 ',
    'G0 Z5 '
  ];

  const gCodeText = gCode.join('\n');
  writeToFile(gCodeText);
}

function onClose() {
  
  const gCode = [
    'G0 X0 Y0 Z0 ',
    'M5 ',
    'M30',
    '%'
  ];

  const gCodeText = gCode.join('\n');
  writeToFile(gCodeText);
  
}


function onSection() {
  
  const gCode = [
    'G90',
    'G0 X20 Y20 Z10 ',
    'G1 Z-5 F200 ',
    'G2 X30 Y30 I5 J5 F100 ',
    'G1 X40 Y40 F200 ',
    'G1 Z0 ',
    'G0 X20 Y20 '
  ];
  const gCodeText = gCode.join('\n');
  writeToFile(gCodeText);
  
}


function onSectionEnd() {

  const gCode = [
    'G0 X0 Y0 ',
    'M5 ',
    'M30 '
  ];

  const gCodeText = gCode.join('\n');
  writeToFile(gCodeText);
  
}





function onLinear (_x, _y, _z, _feedRate){
  writeln(`G1`)
  writeln(`X${_x}`)
  writeln(`Y${_y}`)
  writeln(`Z${_z}`)
}

function onCircular(clockwise, cx, cy, cz, x, y, z, feed) {
  
  const gCode = clockwise ? 'G2' : 'G3';
  
  const i = cx - x;
  const j = cy - y;
  const k = cz - z;
  const iCode = `I${i.toFixed(4)}`;
  const jCode = `J${j.toFixed(4)}`;
  const kCode = `K${k.toFixed(4)}`;
  
  
  const xCode = `X${x.toFixed(4)}`;
  const yCode = `Y${y.toFixed(4)}`;
  const zCode = `Z${z.toFixed(4)}`;
  
 
  const fCode = feed != 0 ?`F${feed.toFixed(2)}`: `F${defaultFeedRate.toFixed(2)}` ;
  
  const value = `${gCode} ${xCode} ${yCode} ${zCode} ${iCode} ${jCode} ${kCode} ${fCode}`;
  writeToFile(value)
  return ;
}
function onMovement(value){
  onMovements(value)
}
function onParameter(name, value){
  onParameters(name, value)
}

module.exports = { onOpen, onLinear, onClose, onSection, onSectionEnd, onCircular, onMovement, onParameter }