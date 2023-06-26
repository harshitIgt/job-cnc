const Vector = require("./Vector");

class BoundingBox {
  constructor(a, b) {
    this.lower = new Vector();
    this.upper = new Vector();
    if (a && b) {
      this.lower = new Vector(
        Math.min(a.x, b.x),
        Math.min(a.y, b.y),
        Math.min(a.z, b.z)
      );
      this.upper = new Vector(
        Math.max(a.x, b.x),
        Math.max(a.y, b.y),
        Math.max(a.z, b.z)
      );
    }
  }

  expandTo(point) {
    this.lower.x = Math.min(this.lower.x, point.x);
    this.lower.y = Math.min(this.lower.y, point.y);
    this.lower.z = Math.min(this.lower.z, point.z);
    this.upper.x = Math.max(this.upper.x, point.x);
    this.upper.y = Math.max(this.upper.y, point.y);
    this.upper.z = Math.max(this.upper.z, point.z);
  }

  expandToBox(box) {
    this.lower.x = Math.min(this.lower.x, box.lower.x);
    this.lower.y = Math.min(this.lower.y, box.lower.y);
    this.lower.z = Math.min(this.lower.z, box.lower.z);
    this.upper.x = Math.max(this.upper.x, box.upper.x);
    this.upper.y = Math.max(this.upper.y, box.upper.y);
    this.upper.z = Math.max(this.upper.z, box.upper.z);
  }

  getRayIntersection(origin, direction, expansion = new Vector()) {
    const t1 = (this.lower.x - origin.x) / direction.x;
    const t2 = (this.upper.x - origin.x) / direction.x;
    const t3 = (this.lower.y - origin.y) / direction.y;
    const t4 = (this.upper.y - origin.y) / direction.y;
    const t5 = (this.lower.z - origin.z) / direction.z;
    const t6 = (this.upper.z - origin.z) / direction.z;

    const tmin = Math.max(
      Math.max(Math.min(t1, t2), Math.min(t3, t4)),
      Math.min(t5, t6)
    );
    const tmax = Math.min(
      Math.min(Math.max(t1, t2), Math.max(t3, t4)),
      Math.max(t5, t6)
    );

    if (tmax < 0 || tmin > tmax) {
      // No intersection
      return null;
    }

    const intersection1 = new Vector(
      origin.x + direction.x * tmin,
      origin.y + direction.y * tmin,
      origin.z + direction.z * tmin
    );
    const intersection2 = new Vector(
      origin.x + direction.x * tmax,
      origin.y + direction.y * tmax,
      origin.z + direction.z * tmax
    );

    return [intersection1, intersection2];
  }
}

global.BoundingBox = BoundingBox;
module.exports = BoundingBox;
