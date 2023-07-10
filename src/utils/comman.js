const fs = require("fs");
const path = require("path");

// chcking file and file location and if does not exist the created file
exports.chekFileLocation = (filePath) => {
  const directoryPath = path.dirname(filePath);
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "");
    return filePath;
  } else {
    return filePath;
  }
};
