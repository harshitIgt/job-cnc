class Matrix {
    constructor(...args) {
      
       if (args.length === 0) {
         this.data = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
       } else if (args.length === 9) {
         // Constructor for the canonical matrix
         this.data = [
           [args[0], args[1], args[2]],
           [args[3], args[4], args[5]],
           [args[6], args[7], args[8]]
         ];
       } else if (args.length === 1) {
         // Constructor for the scale matrix
         const scale = args[0];
         this.data = [[scale, 0, 0], [0, scale, 0], [0, 0, scale]]
       } else if (args.length === 3) {
         // Constructor using three vectors
         const [right, up, forward] = args
         this.data = [
           [right.x, up.x, forward.x],
           [right.y, up.y, forward.y],
           [right.z, up.z, forward.z]
         ];
       } else if (args.length === 2) {
         // Constructor for rotation matrix around the vector
         const [vector, angle] = args
         const c = Math.cos(angle)
         const s = Math.sin(angle)
      const t = 1 - c
   
         const { x, y, z } = vector.normalized()
   
         this.data = [
           [t * x * x + c, t * x * y - s * z, t * x * z + s * y],
           [t * x * y + s * z, t * y * y + c, t * y * z - s * x],
           [t * x * z - s * y, t * y * z + s * x, t * z * z + c]
         ];
       } else {
      throw new Error('Invalid number of arguments for Matrix constructor.')
       }
  }
}


module.exports = { Matrix }
