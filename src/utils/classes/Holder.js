class Holder {
  constructor() {
    this.maximumDiameter = 0;
    this.length = 0;
    this.sections = []; // Array to store sections
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
    } else {
      throw new Error("Invalid section index.");
    }
  }

  getLength(index) {
    if (index >= 0 && index < this.sections.length) {
      return this.sections[index].length;
    } else {
      throw new Error("Invalid section index.");
    }
  }

  addSection(diameter, length) {
    if (typeof diameter === "number" && typeof length === "number") {
      this.sections.push({ diameter, length });
      if (diameter > this.maximumDiameter) {
        this.maximumDiameter = diameter;
      }
      this.length += length;
    } else {
      throw new Error("Invalid section dimensions.");
    }
  }

  removeSection(index) {
    if (index >= 0 && index < this.sections.length) {
      const removedSection = this.sections.splice(index, 1)[0];
      if (removedSection.diameter === this.maximumDiameter) {
        // Recalculate maximum diameter if necessary
        this.maximumDiameter = this.calculateMaximumDiameter();
      }
      this.length -= removedSection.length;
    } else {
      throw new Error("Invalid section index.");
    }
  }

  calculateMaximumDiameter() {
    let maxDiameter = 0;
    for (const section of this.sections) {
      if (section.diameter > maxDiameter) {
        maxDiameter = section.diameter;
      }
    }
    return maxDiameter;
  }
}

global.Holder = Holder;
module.exports = Holder;
