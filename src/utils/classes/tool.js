class Tool {
  constructor() {
    this.number = Math.floor(Math.random() * 90) + 10; // genrateing 2 digite random number
    this.diameter = (Math.floor(Math.random() * 90000) + 10000) / 10000;
    this.cornerRadius = -(Math.floor(Math.random() * 90000) + 10000) / 10000;
  }
  number;
  turret;
  diameterOffset;
  lengthOffset;
  compensationOffset;
  manualToolChange;
  breakControl;
  liveTool;
  holderNumber;
  spindleMode;
  spindleRPM;
  rampingSpindleRPM;
  surfaceSpeed;
  maximumSpindleSpeed;
  numberOfFlutes;
  threadPitch;
  coolant;
  material;
  comment;
  vendor;
  productId;
  unit;
  type;
  diameter;
  cornerRadius;
  taperAngle;
}

global.Tool = Tool;

module.exports = Tool;
