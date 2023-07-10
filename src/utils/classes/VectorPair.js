const Vector = require("./Vector");

class VectorPair {
  constructor(first = null, second = null) {
    this.first = first;
    this.second = second;
  }
}

global.VectorPair = VectorPair;
module.exports = VectorPair;
