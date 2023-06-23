const Vector = require("./Vector");

class Matrix {
  constructor(...args) {
    if (args.length === 0) {
      this.data = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ];
    } else if (args.length === 9) {
      // Constructor for the canonical matrix
      this.data = [
        [args[0], args[1], args[2]],
        [args[3], args[4], args[5]],
        [args[6], args[7], args[8]],
      ];
    } else if (args.length === 1) {
      // Constructor for the scale matrix
      const scale = typeof args[0][1] === "number" ? args[0][1] : 1; //fix it is showing array, so i just pick array middle indexing
      this.data = [
        [scale, 0, 0],
        [0, scale, 0],
        [0, 0, scale],
      ];
    } else if (args.length === 3) {
      // Constructor using three vectors
      const [right, up, forward] = args;
      this.data = [
        [right.x, up.x, forward.x],
        [right.y, up.y, forward.y],
        [right.z, up.z, forward.z],
      ];
    } else if (args.length === 2) {
      // Constructor for rotation matrix around the vector
      const [vector, angle] = args;
      const c = Math.cos(angle);
      const s = Math.sin(angle);
      const t = 1 - c;

      const { x, y, z } = vector.normalized();

      this.data = [
        [t * x * x + c, t * x * y - s * z, t * x * z + s * y],
        [t * x * y + s * z, t * y * y + c, t * y * z - s * x],
        [t * x * z - s * y, t * y * z + s * x, t * z * z + c],
      ];
    } else {
      throw new Error("Invalid number of arguments for Matrix constructor.");
    }
  }

  // n1 = this.getN1();
  // n2 = this.getN2();
  // negated = this.getNegated();
  // transposed = this.getTransposed();
  // up = this.getUp();
  // right = this.getRight();
  // forward = this.getForward();
  // eulerXZX;
  // eulerYXY;
  // eulerZYZ;
  // eulerXZX_R;
  // eulerYXY_R;
  // eulerZYZ_R;
  // eulerXZY;
  // eulerYXZ;
  // eulerZYX;
  // eulerYZX_R;
  // eulerZXY_R;
  // eulerXYZ_R;
  // eulerXYX;
  // eulerYZY;
  // eulerZXZ;
  // eulerXYX_R;
  // eulerYZY_R;
  // eulerZXZ_R;
  // eulerXYZ;
  // eulerYZX;
  // eulerZXY;
  // eulerZYX_R;
  // eulerXZY_R;
  // eulerYXZ_R;

  // Rotates this matrix around the X-axis by the specified angle
  rotateX(angle) {
    if (typeof angle !== "number") throw new Error("Invalid angle");

    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    const rotatedMatrix = [
      [1, 0, 0],
      [0, cos, -sin],
      [0, sin, cos],
    ];
    const newMatrix = this.multiplyRotate(rotatedMatrix);
    this.data = newMatrix;
  }

  //Rotates this matrix around the Y-axis by the specified angle.
  rotateY(angle) {
    if (typeof angle !== "number") throw new Error("Invalid angle");

    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    const rotatedMatrix = [
      [cos, 0, sin],
      [0, 1, 0],
      [-sin, 0, cos],
    ];
    const newMatrix = this.multiplyRotate(rotatedMatrix);
    this.data = newMatrix;
  }

  //Rotates this matrix around the Z-axis by the specified angle.
  rotateZ(angle) {
    if (typeof angle !== "number") throw new Error("Invalid angle");

    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    const rotatedMatrix = [
      [cos, -sin, 0],
      [sin, cos, 0],
      [0, 0, 1],
    ];
    const newMatrix = this.multiplyRotate(rotatedMatrix);
    this.data = newMatrix;
  }

  multiplyRotate(otherMatrix) {
    const result = [];
    for (let i = 0; i < this.data.length; i++) {
      result[i] = [];
      for (let j = 0; j < otherMatrix[0].length; j++) {
        let sum = 0;
        for (let k = 0; k < this.data[0].length; k++) {
          sum += this.data[i][k] * otherMatrix[k][j];
        }
        result[i][j] = sum;
      }
    }
    return result;
  }

  // Returns the value of the specified element.
  getElement(row, column) {
    if (row >= 0 && row <= 2 && column >= 0 && column <= 2) {
      return this.data[row][column];
    } else {
      throw new Error("Invalid row or column index.");
    }
  }

  //Sets the value of the specified element
  setElement(row, column, value) {
    if (row >= 0 && row <= 2 && column >= 0 && column <= 2) {
      this.data[row][column] = value;
    } else {
      throw new Error("Invalid row or column index.");
    }
  }

  //Returns the specified row.
  getRow(row) {
    if (row >= 0 && row <= 2) {
      let a, b, c;
      for (let i = 0; i < 3; i++) {
        if (i == 0) {
          a = this.data[row][i];
        } else if (i == 1) {
          b = this.data[row][i];
        } else {
          c = this.data[row][i];
        }
        return new Vector(a, b, c);
      }
    } else {
      throw new Error("Invalid row index.");
    }
  }

  //Sets the specified row
  setRow(row, value) {
    if (row >= 0 && row <= 2 && value instanceof Vector) {
      let a = value.x,
        b = value.y,
        c = value.z;
      for (let i = 0; i < 3; i++) {
        if (i == 0) {
          this.data[row][i] = a;
        } else if (i == 1) {
          this.data[row][i] = b;
        } else {
          this.data[row][i] = c;
        }
      }
    } else {
      throw new Error("Invalid row index or value type not vector.");
    }
  }

  //Returns the specified column.
  getColumn(column) {
    if (column >= 0 && column <= 2) {
      let a, b, c;
      for (let i = 0; i < 3; i++) {
        if (i == 0) {
          a = this.data[i][column];
        } else if (i == 1) {
          b = this.data[i][column];
        } else {
          c = this.data[i][column];
        }
        return new Vector(a, b, c);
      }
    } else {
      throw new Error("Invalid column index.");
    }
  }

  //Sets the specified Column
  setColumn(column, value) {
    if (column >= 0 && column <= 2 && value instanceof Vector) {
      let a = value.x,
        b = value.y,
        c = value.z;
      for (let i = 0; i < 3; i++) {
        if (i == 0) {
          this.data[i][column] = a;
        } else if (i == 1) {
          this.data[i][column] = b;
        } else {
          this.data[i][column] = c;
        }
      }
    } else {
      throw new Error("Invalid column index or value type not vector.");
    }
  }

  //Returns the forward vector
  getForward() {
    // The forward vector is the third column of the matrix
    return new Vector(this.data[0][2], this.data[1][2], this.data[2][2]);
  }

  //Sets the forward vector.
  setForward(value) {
    if (value instanceof Vector) {
      this.data[0][2] = value.x;
      this.data[1][2] = value.y;
      this.data[2][2] = value.z;
    } else {
      throw new Error("setForward requires a Vector parameter");
    }
  }

  //Returns the up vector
  getUp() {
    // The up vector is the second row of the matrix
    const up = new Vector(this.data[1][0], this.data[1][1], this.data[1][2]);
    return up;
  }

  //Sets the up vector.
  setUp(value) {
    if (value instanceof Vector) {
      this.data[1][0] = value.x;
      this.data[1][1] = value.y;
      this.data[1][2] = value.z;
    } else {
      throw new Error("setUp requires a Vector parameter");
    }
  }

  //Returns the right vector.
  getRight() {
    // The right vector is the first row of the matrix
    const right = new Vector(this.data[0][0], this.data[0][1], this.data[0][2]);
    return right;
  }

  //Sets the right vector
  setRight(value) {
    if (value instanceof Vector) {
      this.data[0][0] = value.x;
      this.data[0][1] = value.y;
      this.data[0][2] = value.z;
    } else {
      throw new Error("setUp requires a Vector parameter");
    }
  }

  //Returns the X and Y rotations around the fixed frame to match the forward direction
  getTiltAndTilt(primary, secondary) {
    if (primary === secondary && typeof primary === "number") {
      console.log("Primary and secondary coordinates must be different.");
      return null;
    }

    const forward = this.getForward();

    const xRotation = Math.atan2(forward[secondary], forward[primary]);
    const yRotation = Math.atan2(
      forward[2],
      Math.sqrt(forward[primary] ** 2 + forward[secondary] ** 2)
    );

    return new Vector(xRotation, yRotation, 0);
  }

  // Returns the X, Y, Z rotations around the fixed frame to match the forward direction
  getTurnAndTilt(primary, secondary) {
    if (primary === secondary && typeof primary === "number") {
      console.log("Primary and secondary coordinates must be different.");
      return null;
    }

    const forward = this.getForward();

    const xRotation = Math.atan2(forward[secondary], forward[primary]);
    const yRotation = Math.atan2(forward[(primary + 1) % 3], forward[2]);
    const zRotation = Math.atan2(forward[primary], forward[(primary + 1) % 3]);

    return new Vector(xRotation, yRotation, zRotation);
  }

  //Returns the Euler angle for the specified convention in radians.
  getEuler(convention) {
    // Check the specified convention
    if (convention === 2) {
      throw new Error("Use getEuler2() to get the standard Euler conventions.");
      return null;
    }

    // Calculate the Euler angles based on the convention
    let angles;
    if (convention === 0) {
      angles = this.calculateEulerConvention0();
    } else if (convention === 1) {
      angles = this.calculateEulerConvention1();
    } else {
      console.log("Invalid Euler convention specified.");
      return null;
    }

    return angles;
  }

  //Returns the Euler angle for the specified convention in radians.
  getEuler2(convention) {
    let angles;
    if (convention === 0) {
      angles = this.calculateEulerConvention0();
    } else if (convention === 1) {
      angles = this.calculateEulerConvention1();
    } else if (convention === 2) {
      angles = this.calculateEulerConvention2();
    } else if (convention === 3) {
      angles = this.calculateEulerConvention3();
    } else {
      console.log("Invalid Euler convention specified.");
      return null;
    }

    return angles;
  }

  calculateEulerConvention0() {
    const xRotation = Math.atan2(this.data[2][1], this.data[2][2]);
    const yRotation = Math.atan2(
      -this.data[2][0],
      Math.sqrt(this.data[2][1] ** 2 + this.data[2][2] ** 2)
    );
    const zRotation = Math.atan2(this.data[1][0], this.data[0][0]);

    return new Vector(xRotation, yRotation, zRotation);
  }

  calculateEulerConvention1() {
    const xRotation = Math.atan2(-this.data[1][2], this.data[1][1]);
    const yRotation = Math.atan2(
      this.data[0][2],
      Math.sqrt(this.data[1][1] ** 2 + this.data[1][2] ** 2)
    );
    const zRotation = Math.atan2(-this.data[0][1], this.data[0][0]);

    return new Vector(xRotation, yRotation, zRotation);
  }

  calculateEulerConvention2() {
    const xRotation = Math.atan2(
      this.data[1][2],
      Math.sqrt(this.data[0][0] ** 2 + this.data[1][0] ** 2)
    );
    const yRotation = Math.atan2(-this.data[0][2], this.data[2][2]);
    const zRotation = Math.atan2(this.data[0][1], this.data[0][0]);

    return new Vector(xRotation, yRotation, zRotation);
  }

  calculateEulerConvention3() {
    const xRotation = Math.atan2(
      -this.data[1][2],
      Math.sqrt(this.data[0][0] ** 2 + this.data[1][0] ** 2)
    );
    const yRotation = Math.atan2(this.data[0][2], this.data[2][2]);
    const zRotation = Math.atan2(-this.data[0][1], this.data[0][0]);

    return new Vector(xRotation, yRotation, zRotation);
  }

  // Returns the Euler angles (ZXZ convention) in radians
  getEulerZXZ() {
    const phi = Math.atan2(this.data[2][0], -this.data[2][1]);
    const theta = Math.acos(this.data[2][2]);
    const psi = Math.atan2(this.data[0][2], this.data[1][2]);

    return new Vector(phi, theta, psi);
  }

  //Returns the Euler angles (ZYZ convention) in radians.
  getEulerZYZ() {
    const phi = Math.atan2(this.data[1][2], this.data[0][2]);
    const theta = Math.acos(this.data[2][2]);
    const psi = Math.atan2(this.data[2][1], -this.data[2][0]);

    return new Vector(phi, theta, psi);
  }

  //Returns the Euler angles (XYZ convention) in radians
  getEulerXYZ() {
    const phi = Math.atan2(-this.data[1][2], this.data[2][2]);
    const theta = Math.asin(this.data[0][2]);
    const psi = Math.atan2(-this.data[0][1], this.data[0][0]);

    return new Vector(phi, theta, psi);
  }

  //Returns the Euler angles (ZYX convention) in radians
  getEulerZYX() {
    const phi = Math.atan2(this.data[1][0], this.data[0][0]);
    const theta = Math.asin(-this.data[2][0]);
    const psi = Math.atan2(this.data[2][1], this.data[2][2]);

    return [phi, theta, psi];
  }

  // Clamps the matrix elements to -1, 0, and -1 with the specified epsilon value.
  clamp(epsilon) {
    if (typeof epsilon !== "number")
      throw new Error("clamp accepts parameter as a number");
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Clamp the element to the range [-1, 1] based on the epsilon value
        if (Math.abs(this.data[i][j]) < epsilon) {
          this.data[i][j] = 0;
        } else if (this.data[i][j] < -1) {
          this.data[i][j] = -1;
        } else if (this.data[i][j] > 1) {
          this.data[i][j] = 1;
        }
      }
    }
  }

  //Returns true if the matrix is the zero matrix (i.e. all elements are set to 0)
  isZero() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.data[i][j] !== 0) {
          return false;
        }
      }
    }
    return true;
  }

  //Returns true if the matrix is the identity matrix.
  isIdentity() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (i == j && this.data[i][j] !== 1) {
          return false;
        }
        if (this.data[i][j] !== 0) {
          return false;
        }
      }
    }
    return true;
  }

  // Return N1 of this matrix (it may wrong)
  getN1() {
    let sum = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        console.log(this.data);
        sum += Math.abs(this.data[i][j]);
      }
    }
    return sum;
  }

  //Return N2 of this matrix (it may wrong)
  getN2() {
    let sum = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        sum += Math.pow(this.data[i][j], 2);
      }
    }
    return Math.sqrt(sum);
  }

  //Normalizes the orientation
  //normalize()

  //Adds the specified matrix to this matrix
  add(right) {
    if (right instanceof Matrix) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          this.data[i][j] += right.data[i][j];
        }
      }
    }
  }

  //Subtracts the specified matrix from this matrix
  subtract(right) {
    if (right instanceof Matrix) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          this.data[i][j] -= right.data[i][j];
        }
      }
    }
  }

  //Negates this matrix
  negate() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.data[i][j] = -this.data[i][j];
      }
    }
  }

  //Returns the negated matrix.
  getNegated() {
    let negateMatrix = new Matrix();
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        negateMatrix.data[i][j] = -this.data[i][j];
      }
    }
    return negateMatrix;
  }

  //Transposed this matrix
  transpose() {
    const transposedElements = this.data;
    for (let i = 0; i < 3; i++) {
      transposedElements.push([
        this.data[0][i],
        this.data[1][i],
        this.data[2][i],
      ]);
    }
    this.data = transposedElements;
  }

  getTransposed() {
    const transposedElements = this.data;
    for (let i = 0; i < 3; i++) {
      transposedElements.push([
        this.data[0][i],
        this.data[1][i],
        this.data[2][i],
      ]);
    }
    return new Matrix(transposedElements);
  }

  multiply(value) {
    const elements = this.data;
    if (typeof value === "number") {
      const result = new Matrix();
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          result.data[i][j] = elements[i][j] * value;
        }
      }
      return result;
    }
    if (value.length === 3 && value[0].length === 3) {
      const result = new Matrix();
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < 3; j++) {
          let sum = 0;
          for (let k = 0; k < 3; k++) {
            sum += elements[i][k] * value.data[k][j];
          }
          result.data[i][j] = sum;
        }
      }
      return result;
    } else {
      let vector = [value.x, value.y, value.z];
      let result = new Vector();
      for (let i = 0; i < 3; i++) {
        let sum = 0;
        for (let j = 0; j < 3; j++) {
          sum += elements[i][j] * vector[j];
        }
        if (i === 0) {
          result.x = sum;
        } else if (i === 1) {
          result.y = sum;
        } else {
          result.z = sum;
        }
      }
      return result;
    }
  }

  //Converts the matrix to a string (e.g. [[1, 2, 3], [4, 5, 6], [7, 8, 9]]).
  toString() {
    let matrixString = "[";

    for (let i = 0; i < 3; i++) {
      matrixString += "[";
      for (let j = 0; j < 3; j++) {
        matrixString += this.data[i][j];
        if (j !== 2) {
          matrixString += ", ";
        }
      }
      matrixString += "]";
      if (i !== 2) {
        matrixString += ", ";
      }
    }
    matrixString += "]";
    return matrixString;
  }
}

global.Matrix = Matrix;

module.exports = Matrix;
