class Vector {
  constructor(X = 0, Y = 0, Z = 0) {
    (this.X = X), (this.Y = Y), (this.Z = Z);
  }

  //set the position
  setCoordinate(coordinate, value) {
    if (coordinate === 0) {
      this.X = value;
    } else if (coordinate === 1) {
      this.Y = value;
    } else if (coordinate === 2) {
      this.Z = value;
    } else {
      throw new Error("Invalid coordinate");
    }
  }

  getCoordinate(coordinate) {
    // if (typeof coordinate != "number") {
    //   throw new Error("Invalid coordinate type");
    // }
    if (coordinate > 2 && coordinate <= 0) {
      throw new Error("Invalid coordinate");
    }
    if (coordinate === 0) return this.X;
    else if (coordinate === 1) return this.Y;
    else return this.Z;
  }

  // Returns the difference of the specified vectors
  static diff(left, right) {
    const diffVector = new Vector(
      left.x - right.x,
      left.y - right.y,
      left.z - right.z
    );

    return diffVector;
  }
}

global.Vector = Vector;

module.exports = Vector;
