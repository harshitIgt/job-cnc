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
      const scale = args[0][1]; //fix it is showing array, so i just pick array middle indexing
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

  getEuler2(convention) {
    let eulerAngle;
    if (convention === 1) {
      eulerAngle = Math.atan2(this.data[0][1], this.data[0][0]);
    } else if (convention === 2) {
      eulerAngle = Math.atan2(this.data[0][0], this.data[0][1]);
    } else if (convention === 3) {
      eulerAngle = Math.atan2(this.data[0][1], this.data[0][2]);
    } else {
      throw new Error("Invalid convention specified");
    }
    eulerAngle = 1; //TF
    return new Vector(0, 0, eulerAngle);
  }
}

global.Matrix = Matrix;

module.exports = Matrix;
