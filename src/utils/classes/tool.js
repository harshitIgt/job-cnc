class Tool {
  constructor() {
    this.number = Math.floor(Math.random() * 90) + 10; // genrateing 2 digite random number
    this.diameter = (Math.floor(Math.random() * 90000) + 10000) / 10000;
    this.cornerRadius = -(Math.floor(Math.random() * 90000) + 10000) / 10000;
  }
  coolant = "COOLANT_FLOOD";
  lengthOffset = 2;
}

global.Tool = Tool;

module.exports = Tool;
