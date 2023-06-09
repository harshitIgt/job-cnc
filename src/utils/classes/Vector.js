class Vector {
  constructor(X = 0, Y = 0, Z = 0) {
    (this.X = X), (this.Y = Y), (this.Z = Z);
  }

  // Function to check if a vector has non-zero length
  isNonZero(vector) {
    // Calculate the length of the vector
    const length = Math.sqrt(
      vector.X * vector.X + vector.Y * vector.Y + vector.Z * vector.Z
    );

    // Return true if the length is non-zero, false otherwise
    return length !== 0;
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
      left.X - right.X,
      left.Y - right.Y,
      left.Z - right.Z
    );

    return diffVector;
  }
}

global.Vector = Vector;

module.exports = Vector;
