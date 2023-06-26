const CurveEntity = require("./CurveEntry");
const BoundingBox = require("./BoundingBox");

class Curve {
  constructor() {
    this.entities = [];
    this.closed = false;
    this.arcs = false;
    this.length = 0;
    this.extent = new BoundingBox();
  }

  // Returns the number of entities in the curve.
  getNumberOfEntities() {
    return this.entities.length;
  }

  // Returns the entity at the given index.
  getEntity(index) {
    if (index >= 0 && index < this.entities.length) {
      return this.entities[index];
    }
    return null;
  }

  // Returns true if the curve is closed.
  isClosed() {
    return this.closed;
  }

  // Returns true if the curve has arcs.
  hasArcs() {
    return this.arcs;
  }

  // Returns the length of the curve.
  getLength() {
    return this.length;
  }

  // Returns the extent of the curve.
  getExtent() {
    return this.extent;
  }

  // Returns the number of entities in the curve.
  getLinearize(tolerance) {}
}

global.Curve = Curve;
module.exports = Curve;
