class Template {
  constructor(text) {
    this.text = text;
  }

  substitute(map) {
    let substitutedText = this.text;

    for (const [key, value] of Object.entries(map)) {
      const pattern = new RegExp(`\\$\\{${key}\\}`, "g");
      substitutedText = substitutedText.replace(pattern, value);
    }

    return substitutedText;
  }
}

global.Template = Template;
module.exports = Template;
