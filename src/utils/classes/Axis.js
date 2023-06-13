const Vector = require("./Vector");

class Axis {
  constructor(...args) {
    if (args.length === 0) {
      (this.X = 0), (this.Y = 0), (this.Z = 0);
    } else if (args.length === 4) {
      this._table = _table;
      this._axis = _axis;
      this._offset = _offset;
      this._coordinate = _coordinate;
    } else if (args.length === 5) {
      this._table = _table;
      this._axis = _axis;
      this._offset = _offset;
      this._coordinate = _coordinate;
      this._range = _range;
    } else {
      throw new Error("Invalid arguments");
    }
  }

  // NS
  getCoordinate() {
    if (this.X === 0) {
      return 0;
    } else if (this.Y === 0) {
      return 1;
    } else if (this.Z === 0) {
      return 2;
    } else {
      return 0; // Invalid axis
    }
  }

  isEnabled() {
    if (
      (this.X < 0 && this.X > 2) ||
      (this.Y < 0 && this.Y > 2) ||
      (this.Z < 0 && this.Z > 2)
    ) {
      return false;
    }
    return true;
  }

  getCoordinate() {
    if (this._axis) {
      return this._axis;
    } else return -1;
  }

  //Returns true if TCP is enabled for the rotary axis.(ND)
  isTCPEnabled() {
    return true;
  }
}

global.Axis = Axis;
module.exports = Axis;
