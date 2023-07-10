const fs = require("fs");
const path = require("path");

const readline = require("readline");

const {
  functions,
  actions,
  sendFile,
  clearprogramOutput,
  deleteFileCache,
} = require("./src/controllers/genrateFile");

// Setup Auto Counfiguration
(function () {
  const requiredPackages = [
    "child_process",
    "vm-browserify",
    "readline",
    "vm2",
  ];

  function arePackagesInstalled() {
    try {
      const packageJson = require("./package.json");
      const installedPackages = Object.keys(packageJson.dependencies || {});
      return requiredPackages.every((pkg) => installedPackages.includes(pkg));
    } catch (error) {
      return false;
    }
  }

  function runApplication() {
    console.log("Application is running...");
  }

  if (arePackagesInstalled()) {
    runApplication();
  } else {
    console.log("Required npm packages are not found. Installing...");
    require("./installPackages");
    if (arePackagesInstalled()) {
      console.log("Packages installed successfully.");
      runApplication();
    } else {
      console.error("Failed to install required npm packages.");
    }
  }
})();

// CLI Execution
(function () {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let isTextInputMode = false;

  function processInput(input) {
    if (input === "exit") {
      sendFile();
      console.log(
        "file downloaded successfully Please check your Downloads directory"
      );
    } else if (input === "1") {
      rl.question("Enter the file path: ", (filePath) => {
        uploadFile(filePath);
      });
    } else if (input === "2") {
      deleteFileCache();
      clearprogramOutput();
      isTextInputMode = true;
      console.log('Enter text (Press "exit" to stop):');
    } else if (input === "close") {
      rl.close();
    } else if (isTextInputMode) {
      processText(input);
    } else {
      console.log(`You entered: ${input}`);
      rl.prompt(); // Display the prompt for the next input
    }
  }

  function uploadFile(filePath) {
    if (!fs.existsSync(filePath)) {
      console.log("File does not exist!");
      rl.prompt();
      return;
    }

    functions(filePath);

    rl.prompt();
  }

  function processText(text) {
    if (text === "exit") {
      isTextInputMode = false;
      rl.prompt();
    } else {
      actions(text);

      rl.prompt(); // Display the prompt for the next input
    }
  }

  rl.prompt();

  rl.on("line", (input) => {
    processInput(input.trim());
  });

  rl.on("close", () => {
    console.log("Exiting the application");
    process.exit(0);
  });
})();
