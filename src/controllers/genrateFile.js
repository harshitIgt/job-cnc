const fs = require("fs");
const path = require("path");
const os = require("os");

const { NodeVM } = require("vm2");

const { chekFileLocation } = require("../utils/comman");

const userActions = chekFileLocation("C:/ProgramData/job-cnc/action.js");
const programOutput = chekFileLocation("C:/ProgramData/job-cnc/output.nc");
const userCpsFunctions = chekFileLocation(
  "C:/ProgramData/job-cnc/functions.js"
);

const functions = async function (filePath) {
  try {
    let functionCode = fs.readFileSync(filePath, "utf8"); // this is Sunchronously we have to convert Asynchronous

    fs.truncate(userCpsFunctions, 0, function (err) {
      if (err) throw err;
    });
    clearprogramOutput();

    const file = fs.createWriteStream(userCpsFunctions);

    let resultString = functionCode;
    resultString += `\nmodule.exports = { onOpen, onLinear, onClose, onSection, onSectionEnd, onCircular, onRapid, onCycle, onCycleEnd, onCyclePoint,onDwell,onRotateAxes,onRapid5D,onSpindleSpeed,defineMachine,onCommand,onLinear5D,onPassThrough,onReturnFromSafeRetractPosition,onComment,onRadiusCompensation,onRewindMachineEntry  ,onMoveToSafeRetractPosition, onParameter}`;
    file.write(resultString);

    console.log("file uploading successfully");
  } catch (error) {
    console.log(error);
  }
};

const actions = async function (text) {
  try {
    const actionCode = text;
    let file = fs.readFileSync(userCpsFunctions, "utf8");

    if (!file) {
      err = "Please upload file";
      res.render("index.ejs", { err });
      return;
    }

    fs.truncate(userActions, 0, function (err) {
      if (err) throw err;
    });

    fs.appendFile(
      userActions,
      `const {onOpen, onLinear, onClose, onSection, onSectionEnd,
             onCircular, onRapid, onCycle, onCycleEnd, onCyclePoint, onRadiusCompensation, defineMachine, onDwell,onRapid5D,onSpindleSpeed,onRotateAxes,onCommand,onLinear5D,onPassThrough, onRewindMachineEntry,onMoveToSafeRetractPosition,onReturnFromSafeRetractPosition,onComment, onParameter} = require("${userCpsFunctions}")\n\n${actionCode}`,
      (err) => {
        if (err) throw err;
      }
    );

    //deleteFileCache();

    fs.readFile(userActions, "utf8", (err, data) => {
      if (err) throw err;

      try {
        const vm = new NodeVM({
          console: "inherit",
          sandbox: {
            postProcessor: require("../utils/index"),
            Vector: require("../utils/classes/Vector"),
          },
          require: {
            external: true,
            context: "host",
            root: userCpsFunctions,
          },
        });

        vm.run(data, "sandbox.js");
      } catch (error) {
        console.log(">>e", error);
        err = error.message;
        return;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

function deleteFileCache() {
  const helperPath = path.join(__dirname, "../utils/helper.js");
  delete require.cache[require.resolve(helperPath)];
  const filePath = userCpsFunctions;
  delete require.cache[require.resolve(filePath)];
}

function sendFile() {
  //const filePath = path.join(__dirname, "../../output.nc");
  const userActions = "output.nc";

  const downloadFolder = path.join(os.homedir(), "Downloads");
  const destinationPath = path.join(
    downloadFolder,
    path.basename(programOutput)
  );

  if (fs.existsSync(destinationPath)) {
    const timestamp = Date.now();
    const uniqueuserActions = `${path.parse(userActions).name}_${timestamp}${
      path.parse(userActions).ext
    }`;
    const uniqueDestinationPath = path.join(downloadFolder, uniqueuserActions);

    fs.copyFileSync(programOutput, uniqueDestinationPath);
  } else {
    fs.copyFileSync(programOutput, destinationPath);
  }
}

function clearprogramOutput() {
  fs.truncate(programOutput, 0, function (err) {
    if (err) throw err;
  });
}

module.exports = {
  functions,
  actions,
  sendFile,
  clearprogramOutput,
  deleteFileCache,
};
