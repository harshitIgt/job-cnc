const {onOpen, onLinear, onClose, onSection, onSectionEnd,
             onCircular, onMovement, onParameter, onRapid, onCycle, onCycleEnd, onCyclePoint} = myModule

onOpen()
onSection()
onRapid(80, -24.38, 15)
onRapid(80, -24.38, 5)
onLinear(80, -24.38, -1 , 1000)
onLinear(-80, -24.38, -1 , 1000)
onLinear(80, 0.95, -1 , 1000)
onRapid(80, 0.95, 15)
onSectionEnd()
onClose()