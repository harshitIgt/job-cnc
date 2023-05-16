const { writeToFile, writeln, onMovements } =  require('./src/utils/helper')


function onOpen() {
 
  const gCode = [
    '%',
    'G90 ; Set absolute distance mode',
    'G0 X10 Y10 Z5 ; Rapid positioning to the start point',
    'G1 Z-10 F100 ; Drill down to a depth of -10mm at a feed rate of 100mm/min',
    'G0 Z5 ; Rapid positioning to clear the workpiece'
  ];

  const gCodeText = gCode.join('\n');
  writeToFile(gCodeText);
}

function onClose() {
  
  const gCode = [
    'G0 X0 Y0 Z0 ; Rapid positioning to home position',
    'M5 ; Stop the spindle',
    'M30 ; End program',
    '%'
  ];

  const gCodeText = gCode.join('\n');
  writeToFile(gCodeText);
  
}


function onSection() {
  
  const gCode = [
    'G90 ; Set absolute distance mode',
    'G0 X20 Y20 Z10 ; Rapid positioning to the start point of the section',
    'G1 Z-5 F200 ; Move down to a depth of -5mm at a feed rate of 200mm/min',
    'G2 X30 Y30 I5 J5 F100 ; Perform a clockwise circular move with a radius of 5mm and a feed rate of 100mm/min',
    'G1 X40 Y40 F200 ; Move in a straight line to X=40, Y=40 at a feed rate of 200mm/min',
    'G1 Z0 ; Move up to the clearance plane',
    'G0 X20 Y20 ; Rapid positioning to the start point of the next section'
  ];
  const gCodeText = gCode.join('\n');
  writeToFile(gCodeText);
  
}


function onSectionEnd() {

  const gCode = [
    'G0 X0 Y0 ; Rapid positioning to the home position',
    'M5 ; Stop the spindle',
    'M30 ; End program'
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
  
 
  const fCode = `F${feed.toFixed(2)}`;
  
  const value = `${gCode} ${xCode} ${yCode} ${zCode} ${iCode} ${jCode} ${kCode} ${fCode}`;
  writeToFile(value)
  return ;
}
function onMovement(value){
    onMovements(value)
}

module.exports = { onOpen, onLinear, onClose, onSection, onSectionEnd, onCircular, onMovements, defaultFeedRate, defaultSpindleSpeed, defaultToolOffset }