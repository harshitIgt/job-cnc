class Vector {
  constructor(x = 0, y = 0, z = 0) {
    (this.x = x), (this.y = y), (this.z = z);
  }

  // Function to check if a vector has non-zero length
  isNonZero() {
    // Calculate the length of the vector
    let vector = [this.x, this.y, this.z];
    const length = Math.sqrt(
      vector.x * vector.x + vector.y * vector.y + vector.z * vector.z
    );

    // Return true if the length is non-zero, false otherwise
    return length !== 0;
  }

  // Function to check if a vector has zero length
  isZero() {
    // Calculate the length of the vector
    let vector = [this.x, this.y, this.z];
    const length = Math.sqrt(
      vector.x * vector.x + vector.y * vector.y + vector.z * vector.z
    );

    // Return true if the length is non-zero, false otherwise
    return length === 0;
  }

  //set the position
  setCoordinate(coordinate, value) {
    if (coordinate === 0) {
      this.x = value;
    } else if (coordinate === 1) {
      this.y = value;
    } else if (coordinate === 2) {
      this.z = value;
    } else {
      //invalid coordinate
    }
  }

  getCoordinate(coordinate) {
    // if (typeof coordinate != "number") {
    //   throw new Error("Invalid coordinate type");
    // }
    if (coordinate > 2 && coordinate <= 0) {
      throw new Error("Invalid coordinate");
    }
    if (coordinate === 0) return this.x;
    else if (coordinate === 1) return this.y;
    else return this.z;
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

  static dot(left, right) {
    let result = 0;
    const length = Math.min(left.length, right.length);

    for (let i = 0; i < length; i++) {
      result += left[i] * right[i];
    }

    return result;
  }
  static cross(left, right) {
    let x1 = left.x,
      y1 = left.y,
      z1 = left.z;
    let x2 = right.x,
      y2 = right.y,
      z2 = right.z;

    const resultX = y1 * z2 - z1 * y2;
    const resultY = z1 * x2 - x1 * z2;
    const resultZ = x1 * y2 - y1 * x2;

    return new Vector(resultX, resultY, resultZ);
  }

  getNormalized() {
    const length = Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    const normalizedX = this.x / length;
    const normalizedY = this.y / length;
    const normalizedZ = this.z / length;
    return new Vector(normalizedX, normalizedY, normalizedZ);
  }
}

global.Vector = Vector;

module.exports = Vector;
