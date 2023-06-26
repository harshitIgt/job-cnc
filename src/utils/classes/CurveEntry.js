const Vector = require("./Vector");

class CurveEntity {
  constructor() {
    this.arc = false;
    this.clockwise = false;
    this.start = new Vector();
    this.center = new Vector();
    this.end = new Vector();
  }

  // Makes an arc entity.
  static getArc(start, end, center, clockwise) {
    this.arc = true;
    this.start = start;
    this.end = end;
    this.center = center;
    this.clockwise = clockwise;
    return curve;
  }

  // Makes a line entity.
  static getLine(start, end) {
    this.start = start;
    this.end = end;
    return curve;
  }

  // Returns the length of the entity.
  getLength() {
    if (this.arc) {
      const radius = this.getRadius();
      const sweep = this.getSweep();
      return Math.abs(radius * sweep);
    } else {
      return this.start.distanceTo(this.end);
    }
  }

  // Returns the radius of the arc entity as defined by the end and center.
  getRadius() {
    return this.center.distanceTo(this.end);
  }

  // Returns the sweep for the arc entity.
  getSweep() {
    const startAngle = Math.atan2(
      this.start.y - this.center.y,
      this.start.x - this.center.x
    );
    const endAngle = Math.atan2(
      this.end.y - this.center.y,
      this.end.x - this.center.x
    );
    let sweep = endAngle - startAngle;
    if (sweep < 0) {
      sweep += 2 * Math.PI;
    }
    return sweep;
  }

  // Returns true if the arc entity if big. Sweep > 180deg.
  isBigArc() {
    const sweep = this.getSweep();
    return sweep > Math.PI;
  }

  // Reverse the entity by swapping the start and end positions
  reverse() {
    [this.start, this.end] = [this.end, this.start];
  }

  // Translate the entity by adding the offset to the start, center, and end positions
  translate(offset) {
    this.start.add(offset);
    this.center.add(offset);
    this.end.add(offset);
  }
}

global.CurveEntity = CurveEntity;
module.exports = CurveEntity;
