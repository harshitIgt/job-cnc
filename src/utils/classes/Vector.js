class Vector {
  constructor(X = 0, Y = 0, Z = 0) {
    (this.X = X), (this.Y = Y), (this.Z = Z);
  }
}

global.Vector = Vector;

module.exports = Vector;
