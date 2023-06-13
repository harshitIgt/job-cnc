const fs = require("fs");
const path = require("path");
const { StatusCodes } = require("http-status-codes");

const { NodeVM } = require("vm2");
const vm = new NodeVM({
  require: {
    external: true,
    context: "host",
    root: "./functions.js",
  },
});

const functions = async function (req, res) {
  try {
    let functionCode;
    if (req.file) {
      functionCode = req.file.buffer.toString("utf8");
    } else {
      functionCode = req.body;
    }
    const funcFile = `functions.js`;

    // const context = vm.createContext({});
    // const mergedContext = { context, myModule: require("../utils/helper") };
    //vm.runInNewContext(functionCode, mergedContext)

    fs.truncate(funcFile, 0, function (err) {
      if (err) throw err;
    });

    const file = fs.createWriteStream(funcFile);

    let resultString =
      `require("./src/utils/index")\nconst Vector = require("./src/utils/classes/Vector");\n` +
      functionCode;
    resultString += `\nmodule.exports = { onOpen, onLinear, onClose, onSection, onSectionEnd, onCircular, onRapid, onCycle, onCycleEnd, onCyclePoint,onDwell,onRotateAxes,onRapid5D,onSpindleSpeed,defineMachine}`;
    file.write(resultString);

    setTimeout(() => {
      let err = `file uploading successfully`;
      res.status(StatusCodes.OK).render("index.ejs", { err });
    }, 3500);
  } catch (error) {
    //console.log(error);
    let err = error.message;
    res.status(StatusCodes.BAD_REQUEST).render({ err });
  }
};

const actions = async function (req, res) {
  try {
    const actionCode = req.body.message;

    const filename = "action.js";
    const outputFile = path.join(__dirname, "../../output.nc");
    const funcFile = path.join(__dirname, "../../functions.js");
    const srcFile = path.join(__dirname, "../../action.js");
    let file = fs.readFileSync(funcFile, "utf8");

    if (!file) {
      err = "Please upload file";
      res.render("index.ejs", { err });
      return;
    } else {
      try {
        //let compiledFunctionFile = removeLastLine(file);
        // const myContext = {
        //   require: (moduleName) => {
        //     const modulePath = path.join(__dirname, "../utils/index");
        //     return require(modulePath);
        //   },
        // };
        // vm.runInNewContext(file, myContext);
      } catch (error) {
        //console.log("eerrr:", error);
        err = error.message;
        res.render("index.ejs", { err });
        return;
      }
    }

    // change the size of the files (empty files)
    fs.truncate(filename, 0, function (err) {
      if (err) throw err;
    });
    fs.truncate("output.nc", 0, function (err) {
      if (err) throw err;
    });

    // adding the data in the action file
    fs.appendFile(
      filename,
      `const {onOpen, onLinear, onClose, onSection, onSectionEnd,
             onCircular, onRapid, onCycle, onCycleEnd, onCyclePoint, defineMachine, onDwell,onRapid5D,onSpindleSpeed,onRotateAxes} = require('./functions.js')\n\n${actionCode}`,
      (err) => {
        if (err) throw err;
      }
    );

    fs.readFile(srcFile, "utf8", (err, data) => {
      if (err) throw err;

      const helperPath = "../utils/helper.js";
      delete require.cache[require.resolve(helperPath)];

      const filePath = "../../functions.js";
      delete require.cache[require.resolve(filePath)];

      // const context = {
      //   console: console,
      //   myModule: require(filePath),
      //   exports: {},
      //   require: require,
      // };
      try {
        vm.run(data);
      } catch (error) {
        //console.log(">>e", error);
        err = error.message;
        res.render("index.ejs", { err });
        return;
      }
    });
    setTimeout(() => {
      res.status(StatusCodes.OK).sendFile(outputFile);
    }, 4000);
  } catch (error) {
    res.status(StatusCodes.OK).json({ error: error.message }); //sending error and server will not crash
  }
};

// function removeLastLine(string) {
//   const lines = string.split("\n");
//   if (lines.length <= 1) {
//     return "";
//   } else {
//     lines.pop();
//     lines.splice(0, 1);
//     return lines.join("\n");
//   }
// }

module.exports = { functions, actions };
