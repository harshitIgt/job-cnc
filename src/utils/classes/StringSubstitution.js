class StringSubstitution {
  constructor() {
    this.substitutionMap = new Map();
  }

  setValue(name, value) {
    this.substitutionMap.set(name, value);
  }

  substitute(text) {
    const regex = /\${(.*?)}/g;
    return text.replace(regex, (match, key) => {
      const value = this.substitutionMap.get(key.trim());
      return value !== undefined ? value : match;
    });
  }
}

global.StringSubstitution = StringSubstitution;
module.exports = StringSubstitution;
