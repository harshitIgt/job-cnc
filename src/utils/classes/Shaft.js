class Shaft {
  constructor() {
    this.sections = [];
    this.maximumDiameter = 0;
    this.length = 0;
  }

  addSection(diameter, length) {
    this.sections.push({ diameter, length });
    if (diameter > this.maximumDiameter) {
      this.maximumDiameter = diameter;
    }
    this.length += length;
  }

  hasSections() {
    return this.sections.length > 0;
  }

  getNumberOfSections() {
    return this.sections.length;
  }

  getMaximumDiameter() {
    return this.maximumDiameter;
  }

  getTotalLength() {
    return this.length;
  }

  getDiameter(index) {
    if (index >= 0 && index < this.sections.length) {
      return this.sections[index].diameter;
    }
    return null;
  }

  getLength(index) {
    if (index >= 0 && index < this.sections.length) {
      return this.sections[index].length;
    }
    return null;
  }
}

global.Shaft = Shaft;
module.exports = Shaft;
