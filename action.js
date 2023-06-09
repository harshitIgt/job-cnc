const {onOpen, onLinear, onClose, onSection, onSectionEnd,
             onCircular, onMovement, onParameter, onRapid, onCycle, onCycleEnd, onCyclePoint, defineMachine, onDwell,onRapid5D,onSpindleSpeed,onRotateAxes} = require('./functions.js')

onOpen()
onSection()
onRotateAxes(1,2,3,4,5,6)