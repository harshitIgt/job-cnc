class MachineConfiguration {
  constructor(...args) { 
    if (args.length === 0) {
      this.axis = []
    } else if (args.length === 1) {
      this.axis = [args[0]]
    } else if (args.length === 2) {
      this.axis = [args[0], args[1]]
    } else if (args.length === 3) { 
      this.axis = [args[0], args[1], args[2] ]
    }
  }
  configData = {
    vendor: 'fanuc',
    model: 'fanuc',
    description: 'Description',
    maximumSpindleSpeed: 1000,
  }

  getCenterPositionX(id) {
    return this.configData.centerPositionX;
  }

  getCenterPositionY(id) {
    return this.configData.centerPositionY;
  }

  getCenterPositionZ(id) {
    return this.configData.centerPositionZ;
  }

  getExtruderOffsetX(id) {
    return this.configData.extruderOffsetX;
  }

  getExtruderOffsetY(id) {
    return this.configData.extruderOffsetY;
  }

  getExtruderOffsetZ(id) {
    return this.configData.extruderOffsetZ;
  }

  getVendor() {
    return this.configData.vendor;
  }

  getModel() {
    return this.configData.model;
  }

  getNumberExtruders() {
    return this.configData.numberExtruders;
  }

  getWidth() {
    return this.configData.width;
  }

  getDepth() {
    return this.configData.depth;
  }

  getHeight() {
    return this.configData.height;
  }

  getDescription() {
    return this.configData.description;
  }

  getMaximumSpindleSpeed() {
    return this.configData.maximumSpindleSpeed;
  }
  
  isHeadConfiguration() {
    if (this.axis.length === 3) {
      return true
    } else {
      return false
    }
  }
  isMultiAxisConfiguration() {
    if (this.axis.length === 3 && this.axis[0] && this.axis[1] && this.axis[2]) {
      return true
    } else {
      return false
    }
  }
  isReceived() {
    return false
  }
  isMachineCoordinate(coordinate) {
    if (coordinate === 0) {
      return this.axis[0] !== 0
    } else if (coordinate === 1) {
      return this.axis[1] !== 0
    } else if (coordinate === 2) { 
      return this.axis[2] !== 0
    }
  }
}

module.exports = { MachineConfiguration }