const {onOpen, onLinear, onClose, onSection, onSectionEnd,
             onCircular, onRapid, onCycle, onCycleEnd, onCyclePoint, defineMachine, onDwell,onRapid5D,onSpindleSpeed,onRotateAxes} = require('./functions.js')

onOpen()
onSection()
onRapid(1,2,3)
onRapid5D(3,2,1,1,2,3)
onLinear(1,2,3)
onDwell(21)
onCycle()
onCyclePoint(1,2,3)
onCycleEnd()
onSectionEnd()
onClose()
h