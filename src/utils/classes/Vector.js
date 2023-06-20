class Vector {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  // length = this.getLength();
  // length2 = this.getLength2();
  // negated = this.getNegated();
  // abs = this.getAbsolute();
  // normalized = this.getNormalized();

  //Returns the X coordinate.
  getX() {
    return this.x;
  }

  //Sets the X coordinate.
  setX(x) {
    this.x = x;
  }

  //Returns the Y coordinate.
  getY() {
    return this.y;
  }

  //Sets the Y coordinate
  setY(y) {
    this.y = y;
  }

  //Returns the Z coordinate.
  getZ() {
    return this.z;
  }

  //Sets the Z coordinate
  setZ(z) {
    this.z = z;
  }

  //Returns the specified coordinate (0:X, 1:Y, and 2:Z).
  getCoordinate(coordinate) {
    if (typeof coordinate != "number") {
      throw new Error("Invalid coordinate type");
    }
    switch (coordinate) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("Invalid coordinate index.");
    }
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
      throw new Error("Invalid coordinate");
    }
  }

  // Adds the specified vector, Or Adds the specified X, Y, and Z coordinates.
  add(value) {
    if (value instanceof Vector) {
      this.x += value.x;
      this.y += value.y;
      this.z += value.z;
    } else if (typeof value === "number") {
      this.x += value;
      this.y += value;
      this.z += value;
    } else {
      throw new Error("Invalid parameter type. Expected Vector or number.");
    }
  }

  //Subtracts the specified vector, Or Subtracts the specified X, Y, and Z coordinates.
  subtract(value) {
    if (value instanceof Vector) {
      this.x -= value.x;
      this.y -= value.y;
      this.z -= value.z;
    } else if (typeof value === "number") {
      this.x -= value;
      this.y -= value;
      this.z -= value;
    } else {
      throw new Error("Invalid parameter type. Expected Vector or number.");
    }
  }

  //Multiplies the specified value.
  multiply(value) {
    if (typeof value === "number") {
      this.x *= value;
      this.y *= value;
      this.z *= value;
    } else {
      throw new Error("Invalid parameter type. Expected number.");
    }
  }

  //Divides the vector by the specified value.
  divide(value) {
    if (typeof value === "number") {
      if (value === 0) {
        throw new Error("Cannot divide by zero.");
      }
      this.x /= value;
      this.y /= value;
      this.z /= value;
    } else {
      throw new Error("Invalid parameter type. Expected number.");
    }
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

  // Returns the angle in the X-Y plane (spherical coordinate).
  getXYAngle() {
    return Math.atan2(this.y, this.x);
  }

  //Returns the Z angle relative to the X-Y plane (spherical coordinate).
  getZAngle() {
    return Math.atan2(this.z, Math.sqrt(this.x * this.x + this.y * this.y));
  }

  //Returns the length of this vector
  getLength() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  //Returns the square length of this vector.
  getLength2() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  //Normalizes the vector.
  normalize() {
    const length = this.getLength();
    if (length !== 0) {
      this.x /= length;
      this.y /= length;
      this.z /= length;
    }
  }

  //Returns the normalized vector.
  getNormalized() {
    const normalized = new Vector(this.x, this.y, this.z);
    normalized.normalize();
    return normalized;
  }

  //Negates the vector.
  negate() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
  }

  //Returns the negated vector.
  getNegated() {
    const negated = new Vector(this.x, this.y, this.z);
    //negated.negate();
    return negated;
  }

  //Returns the vector with the absolute values of the coordinates.
  getAbsolute() {
    const abs = new Vector(
      Math.abs(this.x),
      Math.abs(this.y),
      Math.abs(this.z)
    );
    return abs;
  }

  //Returns the value for the minimum coordinate.
  getMinimum() {
    return Math.min(this.x, this.y, this.z);
  }

  //Returns the value for the maximum coordinate.
  getMaximum() {
    return Math.max(this.x, this.y, this.z);
  }

  //Converts the vector to a string (e.g. (1, 2, 3)).
  toString() {
    return `(${this.x}, ${this.y}, ${this.z})`;
  }

  //Returns the value converted from radians to degrees.
  toDeg() {
    const toDegrees = (rad) => rad * (180 / Math.PI);
    return new Vector(toDegrees(this.x), toDegrees(this.y), toDegrees(this.z));
  }

  //Returns the value converted from degrees to radians.
  toRad() {
    const toRadians = (deg) => deg * (Math.PI / 180);
    return new Vector(toRadians(this.x), toRadians(this.y), toRadians(this.z));
  }

  // getNormalized() {
  //   const length = Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  //   const normalizedX = this.x / length;
  //   const normalizedY = this.y / length;
  //   const normalizedZ = this.z / length;
  //   return new Vector(normalizedX, normalizedY, normalizedZ);
  // }

  //Returns the sum of the specified vectors.
  static sum(left, right) {
    const sum = new Vector(
      left.x + right.x,
      left.y + right.y,
      left.z + right.z
    );
    return sum;
  }

  //Returns the difference of the specified vectors.
  static diff(left, right) {
    const diff = new Vector(
      left.x - right.x,
      left.y - right.y,
      left.z - right.z
    );
    return diff;
  }

  //Returns the product of the specified vector and number.
  static product(left, right) {
    const product = new Vector(left.x * right, left.y * right, left.z * right);
    return product;
  }

  //Returns the dot product of this vector and the specified vector.
  static dot(left, right) {
    return left.x * right.x + left.y * right.y + left.z * right.z;
  }

  //Returns the angle between the specified vectors.
  static getAngle(v1, v2) {
    const dotProduct = Vector.dot(v1, v2);
    const lengthProduct = v1.getLength() * v2.getLength();
    return Math.acos(dotProduct / lengthProduct);
  }

  //Returns the cross product of this vector and the specified vector.
  static cross(left, right) {
    const cross = new Vector(
      left.y * right.z - left.z * right.y,
      left.z * right.x - left.x * right.z,
      left.x * right.y - left.y * right.x
    );
    return cross;
  }

  //Returns the distance between the specified vectors
  static getDistance(left, right) {
    return Math.sqrt(
      (left.x - right.x) * (left.x - right.x) +
        (left.y - right.y) * (left.y - right.y) +
        (left.z - right.z) * (left.z - right.z)
    );
  }

  //Returns the square of the distance between the specified vectors
  static getDistance2(left, right) {
    return (
      (left.x - right.x) * (left.x - right.x) +
      (left.y - right.y) * (left.y - right.y) +
      (left.z - right.z) * (left.z - right.z)
    );
  }

  //Linear interpolation between the specified vectors.
  static lerp(left, right, u) {
    const x = left.x + u * (right.x - left.x);
    const y = left.y + u * (right.y - left.y);
    const z = left.z + u * (right.z - left.z);
    return new Vector(x, y, z);
  }

  //Returns the vector for the specified spherical coordinates
  static getBySpherical(xyAngle, zAngle, radius) {
    const x = radius * Math.cos(xyAngle) * Math.cos(zAngle);
    const y = radius * Math.sin(xyAngle) * Math.cos(zAngle);
    const z = radius * Math.sin(zAngle);
    return new Vector(x, y, z);
  }
}

global.Vector = Vector;

module.exports = Vector;
