const BoundingBox = require("./BoundingBox");
const Vector = require("./Vector");

class Mesh {
  constructor() {
    this.vertices = [];
    this.facets = [];
  }

  //Adds facet. It is good convention to keep all facets CCW-wound
  addFacet(a, b, c) {
    this.facets.push([a, b, c]);
  }

  // Clears the mesh.
  clear() {
    this.vertices = [];
    this.facets = [];
  }

  // Returns the bounding box of the mesh.
  getBoundingBox() {
    let min_x = Infinity;
    let min_y = Infinity;
    let min_z = Infinity;
    let max_x = -Infinity;
    let max_y = -Infinity;
    let max_z = -Infinity;

    for (const [x, y, z] of this.vertices) {
      min_x = Math.min(min_x, x);
      min_y = Math.min(min_y, y);
      min_z = Math.min(min_z, z);
      max_x = Math.max(max_x, x);
      max_y = Math.max(max_y, y);
      max_z = Math.max(max_z, z);
    }

    return new BoundingBox(
      new Vector(min_x, min_y, min_z),
      new Vector(max_x, max_y, max_z)
    );
  }

  // Returns the number of facets in the mesh.
  getNumberOfFacets() {
    return this.facets.length;
  }

  // Returns the number of vertices.
  getNumberOfVertices() {
    return this.vertices.length;
  }

  // Returns the given vertex.
  getVertex(index) {
    if (index >= 0 && index < this.vertices.length) {
      return this.vertices[index];
    }
    throw new Error("Invalid vertex index");
  }

  // Returns the given facet vertex index for the returned node.
  getFacet(index, node) {
    if (index >= 0 && index < this.facets.length) {
      const facet = this.facets[index];
      if (node >= 0 && node < 3) {
        return facet[node];
      }
      throw new Error("Invalid facet node");
    }
    throw new Error("Invalid facet index");
  }

  // Reserves memory for the given number of facets. (it may wrong)
  reserve(numberOfFacets) {
    this.facets = new Array(numberOfFacets);
  }

  // Scales mesh. (it may wrong)
  scale(factor) {
    this.vertices = this.vertices.map(([x, y, z]) => [
      x * factor,
      y * factor,
      z * factor,
    ]);
  }

  // Transforms mesh. new vertex = ORIENTATION * vertex + TRANSLATION (ND)
  transform(translation, orientation) {
    this.vertices = this.vertices.map(([x, y, z]) =>
      orientation.multiplyVector([x, y, z]).add(translation)
    );
  }

  // Translates mesh.
  translate(translation) {
    this.vertices = this.vertices.map(([x, y, z]) => [
      x + translation.x,
      y + translation.y,
      z + translation.z,
    ]);
  }

  // Not implemented
  static loadMesh(path, format) {}
  static saveMesh(path, format, mesh) {}
}

global.Mesh = Mesh;
module.exports = Mesh;
