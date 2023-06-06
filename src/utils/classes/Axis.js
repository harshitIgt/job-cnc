class Axis {
  constructor(...args) {
    if (args.length === 0) {
      this._axis = [0, 0, 0]; // for testing
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

  isEnabled() {
    if (
      (this._axis[0] < 0 && this._axis[0] > 2) ||
      (this._axis[1] < 0 && this._axis[1] > 2) ||
      (this._axis[2] < 0 && this._axis[2] > 2)
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
}

global.Axis = Axis;
module.exports = Axis;
