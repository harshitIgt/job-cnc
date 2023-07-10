const fs = require("fs");

class TextFile {
  constructor(path, write, encoding) {
    this.path = path;
    this.writeMode = write;
    this.encoding = encoding;
    this.fileHandle = null;
    this.open();
  }

  open() {
    const flag = this.writeMode ? "w" : "r";
    try {
      this.fileHandle = fs.openSync(this.path, flag);
    } catch (error) {
      console.error(`Error opening file: ${error}`);
    }
  }

  isOpen() {
    return this.fileHandle !== null;
  }

  readln() {
    if (!this.isOpen() || this.writeMode) {
      console.error("File is not open for reading.");
      return null;
    }

    const buffer = Buffer.alloc(1024);
    try {
      const bytesRead = fs.readSync(
        this.fileHandle,
        buffer,
        0,
        buffer.length,
        null
      );
      if (bytesRead > 0) {
        return buffer.toString(this.encoding, 0, bytesRead);
      }
    } catch (error) {
      console.error(`Error reading file: ${error}`);
    }

    return null;
  }

  write(text) {
    if (!this.isOpen() || !this.writeMode) {
      console.error("File is not open for writing.");
      return;
    }

    try {
      fs.writeSync(this.fileHandle, text, null, this.encoding);
    } catch (error) {
      console.error(`Error writing to file: ${error}`);
    }
  }

  writeln(text) {
    if (!this.isOpen() || !this.writeMode) {
      console.error("File is not open for writing.");
      return;
    }

    try {
      fs.writeSync(this.fileHandle, text + "\n", null, this.encoding);
    } catch (error) {
      console.error(`Error writing to file: ${error}`);
    }
  }

  close() {
    if (this.isOpen()) {
      try {
        fs.closeSync(this.fileHandle);
      } catch (error) {
        console.error(`Error closing file: ${error}`);
      } finally {
        this.fileHandle = null;
      }
    }
  }
}

global.TextFile = TextFile;
module.exports = TextFile;
