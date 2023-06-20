const Format = require("./Format");

class ModalGroup {
  constructor(
    {
      activeCodes = {},
      enabled = true,
      autoReset = false,
      force = false,
      strict = false,
    },
    arrayGroup = [],
    formats = new Format()
  ) {
    this.groups = arrayGroup;
    this.activeCodes = activeCodes;
    this.enabled = enabled;
    this.autoReset = autoReset;
    this.force = force;
    this.strict = strict;
    this.formats = formats;
    this.prefix = this.formats.prefix;
    this.suffix = this.formats.suffix;
  }

  addCode(group, code) {
    if (!this.groups[group]) {
      this.groups[group] = [];
    }
    this.groups[group].push(code);
  }

  createGroup() {
    this.groups.push([]);
  }

  disable() {
    this.enabled = false;
  }

  enable() {
    this.enabled = true;
  }

  format(code) {
    if (this.enabled) {
      if (this.isCodeDefined(code)) {
        const formatstedCode = this.prefix + this.formats;
        if (formatstedCode !== code || this.force) {
          return formatstedCode;
        }
      } else if (!this.strict && this.autoReset) {
        this.reset();
      } else if (this.strict) {
        throw new Error("Invalid code: " + code);
      }
    }
    return "";
  }

  getActiveCode(group) {
    return this.activeCodes[group] || "";
  }

  getGroup(code) {
    for (let group = 0; group < this.groups.length; group++) {
      if (this.groups[group].includes(code)) {
        return group;
      }
    }
    return Number.MAX_SAFE_INTEGER;
  }

  getNumberOfCodes() {
    let count = 0;
    this.groups.forEach((group) => {
      count += group.length;
    });
    return count;
  }

  getNumberOfCodesInGroup(group) {
    return this.groups[group] ? this.groups[group].length : 0;
  }

  getNumberOfGroups() {
    return this.groups.length;
  }

  hasActiveCode(group) {
    return !!this.activeCodes[group];
  }

  inSameGroup(code1, code2) {
    const group1 = this.getGroup(code1);
    const group2 = this.getGroup(code2);
    return group1 === group2;
  }

  isActiveCode(code) {
    return Object.values(this.activeCodes).includes(code);
  }

  isCodeDefined(code) {
    return this.groups.some((group) => group.includes(code));
  }

  isEnabled() {
    return this.enabled;
  }

  isGroup(group) {
    return !!this.groups[group];
  }

  makeActiveCode(code) {
    const group = this.getGroup(code);
    this.activeCodes[group] = code;
  }

  removeCode(code) {
    const group = this.getGroup(code);
    const index = this.groups[group].indexOf(code);
    if (index !== -1) {
      this.groups[group].splice(index, 1);
    }
    if (this.activeCodes[group] === code) {
      delete this.activeCodes[group];
    }
  }

  reset() {
    this.activeCodes = {};
  }

  resetGroup(group) {
    this.groups[group] = [];
    delete this.activeCodes[group];
  }

  setAutoReset(flag) {
    this.autoReset = flag;
  }

  setForce(force) {
    this.force = force;
  }

  setformatsNumber(formats) {
    this.formats = formats;
  }

  setPrefix(prefix) {
    this.prefix = prefix;
  }
}

global.ModalGroup = ModalGroup;
module.exports = ModalGroup;
