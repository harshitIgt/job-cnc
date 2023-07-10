class MachineParameters {
  constructor(
    spindleOrientation,
    chipBreakingDistance,
    drillingSafeDistance,
    spindleSpeedDwell
  ) {
    this.spindleOrientation = spindleOrientation;
    this.chipBreakingDistance = chipBreakingDistance;
    this.drillingSafeDistance = drillingSafeDistance;
    this.spindleSpeedDwell = spindleSpeedDwell;
  }
}

global.MachineParameters = MachineParameters;
module.exports = MachineParameters;
