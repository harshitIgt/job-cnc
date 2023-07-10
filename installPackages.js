const { execSync } = require("child_process");

try {
  console.log("Installing required npm packages...");
  execSync("npm install");
  console.log("Packages installed successfully.");
} catch (error) {
  console.error("Error occurred while installing packages:", error.message);
}
