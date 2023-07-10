const Vector = require("./Vector");
const Section = require("./Section");
const MachineParameters = require("./MachineParameters ");
const Tool = require("./tool");
const MachineConfiguration = require("./MachineConfiguration");
const VectorPair = require("./VectorPair");
const BoundingBox = require("./BoundingBox");
const { priorOutput } = require("../helper");

class PostProcessor {
  constructor() {
    this.outputUnit = null;
    this.currentSection = null;
    this.highFeedMapping = 0;
    this.highFeedrate = 0;
    this.lineNumber = null;
    this.initialCyclePosition = null;
    this.abortOnDeprecation = false;
    this.end = null;
    this.length = 0;
    this.center = null;
    this.normal = null;
    this.plane = null;
    this.radius = 0;
    this.sweep = 0;
    this.clockwise = false;
    this.chordLength = 0;
    this.fullCircle = false;
    this.helical = false;
    this.helicalOffset = null;
    this.helicalDistance = 0;
    this.movement = null;
    this.radiusCompensation = null;
    this.description = "";
    this.vendor = "";
    this.vendorUrl = "";
    this.legal = "";
    this.unit = null;
    this.programName = "";
    this.programNameIsInteger = false;
    this.debugMode = false;
    this.preventPost = false;
    this.filename = "";
    this.extension = "";
    this.version = "";
    this.certificationLevel = null;
    this.revision = null;
    this.minimumRevision = null;
    this.deprecated = false;
    this.capabilities = null;
    this.tolerance = 0;
    this.mapWorkOrigin = false;
    this.mapToWCS = false;
    this.allowMachineChangeOnSection = false;
    this.minimumChordLength = 0;
    this.minimumCircularRadius = 0;
    this.maximumCircularRadius = 0;
    this.minimumCircularSweep = 0;
    this.maximumCircularSweep = 0;
    this.allowHelicalMoves = false;
    this.allowSpiralMoves = false;
    this.allowedCircularPlanes = null;
    this.allowFeedPerRevolutionDrilling = false;
    this.machineParameters = null;
    this.properties = new Map();
    this.NUL = "\x00";
    this.SOH = "\x01";
    this.STX = "\x02";
    this.ETX = "\x03";
    this.EOT = "\x04";
    this.ENQ = "\x05";
    this.ACK = "\x06";
    this.BEL = "\x07";
    this.BS = "\x08";
    this.TAB = "\x09";
    this.LF = "\x0A";
    this.VT = "\x0B";
    this.FF = "\x0C";
    this.CR = "\x0D";
    this.SO = "\x0E";
    this.SI = "\x0F";
    this.DLE = "\x10";
    this.DC1 = "\x11";
    this.DC2 = "\x12";
    this.DC3 = "\x13";
    this.DC4 = "\x14";
    this.NAK = "\x15";
    this.SYN = "\x16";
    this.ETB = "\x17";
    this.CAN = "\x18";
    this.EM = "\x19";
    this.SUB = "\x1A";
    this.ESC = "\x1B";
    this.FS = "\x1C";
    this.GS = "\x1D";
    this.RS = "\x1E";
    this.US = "\x1F";
    this.EOL = "\r\n";
    this.SP = " ";
    this.PATH_SEPARATOR = "/";
    this.IN = 0;
    this.MM = 1;
    this.PLANE_XY = 0;
    this.PLANE_XZ = 1;
    this.PLANE_ZX = 1;
    this.PLANE_YZ = 2;
    this.X = 0;
    this.Y = 1;
    this.Z = 2;
    this.A = 3;
    this.B = 4;
    this.C = 5;
    this.ABC = 6;
    this.TOOL_AXIS_X = 0;
    this.TOOL_AXIS_Y = 1;
    this.TOOL_AXIS_Z = 2;
    this.RADIUS_COMPENSATION_OFF = 0;
    this.RADIUS_COMPENSATION_LEFT = 1;
    this.RADIUS_COMPENSATION_RIGHT = 2;
    this.SINGULARITY_LINEARIZE_OFF = 0;
    this.SINGULARITY_LINEARIZE_LINEAR = 1;
    this.SINGULARITY_LINEARIZE_ROTARY = 2;
    this.COOLANT_DISABLED = 0;
    this.COOLANT_FLOOD = 1;
    this.COOLANT_MIST = 2;
    this.COOLANT_TOOL = 3;
    this.COOLANT_THROUGH_TOOL = 3;
    this.COOLANT_AIR = 4;
    this.COOLANT_AIR_THROUGH_TOOL = 4;
    this.COOLANT_SUCTION = 5;
    this.COOLANT_FLOOD_MIST = 6;
    this.COOLANT_FLOOD_THROUGH_TOOL = 6;
    this.MATERIAL_UNSPECIFIED = 0;
    this.MATERIAL_HSS = 1;
    this.MATERIAL_TI_COATED = 2;
    this.MATERIAL_CARBIDE = 3;
    this.MATERIAL_CERAMICS = 4;
    this.TOOL_UNSPECIFIED = 0;
    this.TOOL_DRILL = 1;
    this.TOOL_DRILL_CENTER = 2;
    this.TOOL_DRILL_SPOT = 3;
    this.TOOL_DRILL_BLOCK = 4;
    this.TOOL_MILLING_END_FLAT = 5;
    this.TOOL_MILLING_END_BALL = 6;
    this.TOOL_MILLING_END_BULLNOSE = 7;
    this.TOOL_MILLING_CHAMFER = 8;
    this.TOOL_MILLING_FACE = 9;
    this.TOOL_MILLING_SLOT = 10;
    this.TOOL_MILLING_RADIUS = 11;
    this.TOOL_MILLING_DOVETAIL = 12;
    this.TOOL_MILLING_TAPERED = 13;
    this.TOOL_MILLING_LOLLIPOP = 14;
    this.TOOL_TAP_RIGHT_HAND = 15;
    this.TOOL_TAP_LEFT_HAND = 16;
    this.TOOL_REAMER = 17;
    this.TOOL_BORING_BAR = 18;
    this.TOOL_COUNTER_BORE = 19;
    this.TOOL_COUNTER_SINK = 20;
    this.TOOL_HOLDER_ONLY = 21;
    this.TOOL_TURNING_GENERAL = 22;
    this.TOOL_TURNING_THREADING = 23;
    this.TOOL_TURNING_GROOVING = 24;
    this.TOOL_TURNING_BORING = 25;
    this.TOOL_TURNING_CUSTOM = 26;
    this.TOOL_PROBE = 27;
    this.TOOL_WIRE = 28;
    this.TOOL_WATER_JET = 29;
    this.TOOL_LASER_CUTTER = 30;
    this.TOOL_WELDER = 31;
    this.TOOL_GRINDER = 32;
    this.TOOL_MILLING_FORM = 33;
    this.TOOL_PLASMA_CUTTER = 34;
    this.TOOL_MARKER = 35;
    this.TOOL_MILLING_THREAD = 36;
    this.TOOL_COMPENSATION_INSERT_CENTER = 37;
    this.TOOL_COMPENSATION_TIP = 38;
    this.TOOL_COMPENSATION_TIP_CENTER = 39;
    this.TOOL_COMPENSATION_TIP_TANGENT = 40;
    this.HAS_PARAMETER = 1;
    this.HAS_RAPID = 2;
    this.HAS_LINEAR = 4;
    this.HAS_DWELL = 8;
    this.HAS_CIRCULAR = 16;
    this.HAS_CYCLE = 32;
    this.HAS_WELL_KNOWN_COMMAND = 64;
    this.HAS_COMMENT = 128;
    this.RECORD_INVALID = -1;
    this.RECORD_WELL_KNOWN_COMMAND = 0;
    this.RECORD_PARAMETER = 1;
    this.RECORD_LINEAR = 2;
    this.RECORD_LINEAR_5D = 3;
    this.RECORD_LINEAR_ZXN = 4;
    this.RECORD_LINEAR_EXTRUDE = 5;
    this.RECORD_CIRCULAR = 6;
    this.RECORD_DWELL = 7;
    this.RECORD_CYCLE = 8;
    this.RECORD_CYCLE_OFF = 9;
    this.RECORD_COMMENT = 10;
    this.RECORD_WIDE_COMMENT = 11;
    this.RECORD_CIRCULAR_EXTRUDE = 12;
    this.COMMAND_INVALID = -1;
    this.COMMAND_STOP = 0;
    this.COMMAND_OPTIONAL_STOP = 1;
    this.COMMAND_END = 2;
    this.COMMAND_SPINDLE_CLOCKWISE = 3;
    this.COMMAND_SPINDLE_COUNTERCLOCKWISE = 4;
    this.COMMAND_START_SPINDLE = 5;
    this.COMMAND_STOP_SPINDLE = 6;
    this.COMMAND_ORIENTATE_SPINDLE = 7;
    this.COMMAND_LOAD_TOOL = 8;
    this.COMMAND_COOLANT_ON = 9;
    this.COMMAND_COOLANT_OFF = 10;
    this.COMMAND_ACTIVATE_SPEED_FEED_SYNCHRONIZATION = 11;
    this.COMMAND_DEACTIVATE_SPEED_FEED_SYNCHRONIZATION = 12;
    this.COMMAND_LOCK_MULTI_AXIS = 13;
    this.COMMAND_UNLOCK_MULTI_AXIS = 14;
    this.COMMAND_EXACT_STOP = 15;
    this.COMMAND_START_CHIP_TRANSPORT = 16;
    this.COMMAND_STOP_CHIP_TRANSPORT = 17;
    this.COMMAND_OPEN_DOOR = 18;
    this.COMMAND_CLOSE_DOOR = 19;
    this.COMMAND_BREAK_CONTROL = 20;
    this.COMMAND_TOOL_MEASURE = 21;
    this.COMMAND_CALIBRATE = 22;
    this.COMMAND_VERIFY = 23;
    this.COMMAND_CLEAN = 24;
    this.COMMAND_ALARM = 25;
    this.COMMAND_ALERT = 26;
    this.COMMAND_CHANGE_PALLET = 27;
    this.COMMAND_POWER_ON = 28;
    this.COMMAND_POWER_OFF = 29;
    this.COMMAND_MAIN_CHUCK_OPEN = 30;
    this.COMMAND_MAIN_CHUCK_CLOSE = 31;
    this.COMMAND_SECONDARY_CHUCK_OPEN = 32;
    this.COMMAND_SECONDARY_CHUCK_CLOSE = 33;
    this.COMMAND_SECONDARY_SPINDLE_SYNCHRONIZATION_ACTIVATE = 34;
    this.COMMAND_SECONDARY_SPINDLE_SYNCHRONIZATION_DEACTIVATE = 35;
    this.COMMAND_SYNC_CHANNELS = 36;
    this.COMMAND_PROBE_ON = 37;
    this.COMMAND_PROBE_OFF = 38;
    this.MOVEMENT_RAPID = 0;
    this.MOVEMENT_LEAD_IN = 1;
    this.MOVEMENT_CUTTING = 2;
    this.MOVEMENT_LEAD_OUT = 3;
    this.MOVEMENT_LINK_TRANSITION = 4;
    this.MOVEMENT_LINK_DIRECT = 5;
    this.MOVEMENT_RAMP_HELIX = 6;
    this.MOVEMENT_RAMP_PROFILE = 7;
    this.MOVEMENT_RAMP_ZIG_ZAG = 8;
    this.MOVEMENT_RAMP = 9;
    this.MOVEMENT_PLUNGE = 10;
    this.MOVEMENT_PREDRILL = 11;
    this.MOVEMENT_EXTENDED = 12;
    this.MOVEMENT_REDUCED = 13;
    this.MOVEMENT_FINISH_CUTTING = 14;
    this.MOVEMENT_HIGH_FEED = 15;
    this.HIGH_FEED_NO_MAPPING = 0;
    this.HIGH_FEED_MAP_MULTI = 1;
    this.HIGH_FEED_MAP_XY_Z = 2;
    this.HIGH_FEED_MAP_ANY = 3;
    this.tool = null;
    this.spindleAxis = null;
    this.feedrate = 0;
    this.spindleSpeed = 0;
    this.machineConfiguration = null;
    this.cycleType = null;
    this.cycle = null;
    this.cycleExpanded = false;
  }

  //properties

  getVendor() {
    return this.vendor;
  }

  getVendor() {
    return this.vendorUrl;
  }

  getVersion() {
    return this.version;
  }

  openUrl(url) {
    if (typeof url === "string") {
      //incomplete
    }
  }

  printDocument(path) {
    if (typeof path === "string") {
      //unimplemented
    }
  }

  printDocumentTo() {
    //incomplete
  }

  printDocumentTo() {
    //incomplete
  }

  invokeOnRapid(x, y, z) {
    if (
      typeof x === "number" &&
      typeof y === "number" &&
      typeof z === "number"
    ) {
      onRapid(x, y, z);
      return ture;
    }
  }

  invokeOnRapid5D(x, y, z, dx, dy, dz) {
    if (
      typeof x === "number" &&
      typeof y === "number" &&
      typeof z === "number" &&
      typeof dx === "number" &&
      typeof dy === "number" &&
      typeof dz === "number"
    ) {
      onRapid5d(x, y, z, dx, dy, dz);
      return true;
    }
  }

  invokeOnLinear(x, y, z, feedrate) {
    if (
      typeof x === "number" &&
      typeof y === "number" &&
      typeof z === "number" &&
      typeof feedrate === "number"
    ) {
      onLinear(x, y, z, feedrate);
      return true;
    }
  }

  invokeOnLinear5D(x, y, z, dx, dy, dz, feedrate) {
    if (
      typeof x === "number" &&
      typeof y === "number" &&
      typeof z === "number" &&
      typeof dx === "number" &&
      typeof dy === "number" &&
      typeof dz === "number" &&
      typeof feedrate === "number"
    ) {
      onLinear5D(x, y, z, dx, dy, dz, feedrate);
      return true;
    }
  }

  invokeOnCircular(clockwise, cx, cy, cz, x, y, z, nx, ny, nz, feedrate) {
    if (
      typeof clockwise === "boolean" &&
      typeof cx === "number" &&
      typeof cy === "number" &&
      typeof cz === "number" &&
      typeof x === "number" &&
      typeof y === "number" &&
      typeof z === "number" &&
      typeof nx === "number" &&
      typeof ny === "number" &&
      typeof nz === "number" &&
      typeof feedrate === "boolean"
    ) {
      //onCircular();
      //return Boolean ;
      //incomplete
    }
  }

  activatePolarMode(tolerance, currentAngle, polarDirection) {
    if (
      typeof tolerance === "number" &&
      typeof currentAngle === "number" &&
      polarDirection instanceof Vector
    ) {
      const tightTolerance = tolerance / 2;
      //incomplete
    }
  }

  deactivatePolarMode() {}

  error(message) {
    console.log(message);
  }

  warning(message) {
    console.log(message);
  }

  warningOnce() {
    //incomplete
  }

  log(message) {
    if (typeof message === "string") {
      console.log(message);
    }
  }

  getSystemUnit() {
    return this.unit;
  }

  getPlatform() {
    return "WIN32";
  }

  isTextSupported(text) {
    if (typeof text === "string") {
      // incomplete
      return true;
    }
  }

  getWordSeparator() {
    return this.separator;
  }

  setWordSeparator(message) {
    this.separator = message;
  }

  writeWords(...args) {
    let wordString;
    if (args[0] == "/") {
      wordString = args
        .slice(1)
        .map((obj) => Object.values(obj).join(""))
        .join(" ");
    } else {
      wordString = args.map((obj) => Object.values(obj).join("")).join(" ");
    }

    fs.appendFile(filePath, wordString + "\n", (err) => {
      if (err) throw err;
    });
    //console.log(wordString);
  }

  writeWords2(...args) {
    let wordString = args.map((obj) => Object.values(obj).join("")).join(" ");
    fs.appendFile(filePath, wordString + "\n", (err) => {
      if (err) throw err;
    });
    //console.log(wordString);
  }

  formatWords(message) {
    if (typeof message === "string") {
      let formatOutput = this.writeWords(message);
      return formatOutput.replace(/\n$/, "");
    }
  }

  subst(template, ...args) {
    let result = template;

    if (args.length > 16) {
      throw new Error("arguments must less the 16");
    }

    args.forEach((arg, index) => {
      const placeholder = "%" + (index + 1);
      result = result.replace(placeholder, arg);
    });

    return result;
  }
  getLangId() {
    return this.langId;
  }

  isSupportedText(message) {
    if (typeof message === "string") {
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();

      const encoded = encoder.encode(message);
      const decoded = decoder.decode(encoded);

      return message === decoded;
    }
  }

  localize(message) {
    if (typeof message === "string") {
      if (this.isSupportedText(message)) {
        return "Localized: " + message;
      } else {
        return message;
      }
    }
  }

  localize2(section, message) {
    if (typeof message === "string" && typeof section === "string") {
      if (this.isSupportedText(message)) {
        return `Localized (${section}): ${message}`;
      } else {
        return message;
      }
    }
  }

  loadLocale(langId) {
    if (typeof langId === "string") {
      //incomplete
    }
  }

  execute(path, argument, hide, workingFolder) {
    if (
      typeof path === "string" &&
      typeof argument === "string" &&
      typeof hide === "boolean" &&
      typeof workingFolder === "boolean"
    ) {
      //incomplete
    }
  }

  setEOl(eol) {
    if (typeof eol === "string") {
      if (
        eolStyle === "CR" ||
        eolStyle === "LF" ||
        eolStyle === "CRLF" ||
        eolStyle === "LFCR"
      ) {
        eol = getEOLCharacter(eolStyle);
      }
    }
  }

  isRedirecting() {
    return process.stdout.isTTY === false; //ND
  }

  closeRedirection() {}

  getWorkpiece() {
    return new BoundingBox(new Vector(0, 0, 0), new Vector(100, 50, 20)); //ND
  }

  getFixture() {
    return new BoundingBox(new Vector(0, 0, 0), new Vector(100, 50, 20)); //ND
  }

  getMachineConfigrationByName(name) {
    if (typeof name === "string") {
      return this.machineConfiguration === name ? name : "";
    }
  }

  alert(title, description) {
    if (typeof title === "string" && typeof description === "string") {
      console.log(`${title}: ${description}`);
    }
  }

  promptkey(title, description) {
    if (typeof title === "string" && typeof description === "string") {
      // return new Promise((resolve) => {
      //   rl.input.on("keypress", (character, key) => {
      //     if (key.ctrl && key.name === "c") {
      //       rl.close();
      //     } else if (key.name === "escape" || key.name === "return") {
      //       rl.close();
      //       resolve("");
      //     } else if (character) {
      //       rl.close();
      //       resolve(character.toLowerCase());
      //     }
      //   });
      // });
    }
  }

  getAsInt(text) {
    if (typeof text === "string") {
      let value = Number(text);
      if (value) return value;
      return "";
    }
    return "";
  }

  getAsFloat(text) {
    if (typeof text === "string") {
      let value = parseFloat(text);
      if (typeof value === "float") return value;
      return "";
    }
  }

  isSafeText(text, permitted) {
    if (!(typeof text === "string" && typeof permitted === "string")) {
      throw new Error("isSafeText requires a string");
    }
    const regex = new RegExp(`^[${permitted}]+$`);
    return regex.test(text);
  }

  filterText(text, keep) {
    if (typeof text === "string" && typeof keep === "string") {
      var filteredText = "";
      for (var i = 0; i < text.length; i++) {
        if (keep.includes(text[i])) {
          filteredText += text[i];
        }
      }
      return filteredText;
    }
  }

  translateText(text, src, dest) {
    if (
      !(
        typeof src === "string" &&
        typeof dest === "string" &&
        typeof text !== "string"
      )
    ) {
      throw new Error("translateText requires a string");
    }
    const mapping = {};
    for (let i = 0; i < src.length; i++) {
      mapping[src[i]] = dest[i];
    }

    const regex = new RegExp(`[${src}]`, "g");
    return text.replace(regex, (match) => mapping[match]);
  }

  loadText(url, encoding) {
    if (!(typeof encoding === "string" && typeof url === "string")) {
      throw new Error("loadText requires a string");
    }
    //NC
  }

  getOutputUnit() {
    return this.unit;
  }

  setOutputUnit(unit) {
    if (!(typeof unit === "integer")) {
      throw new Error("setOutputUnit requires a integer");
    }
    this.unit = unit;
  }

  getDogLeg() {
    return this.dog_leg;
  }

  setDogLeg(dogLeg) {
    if (!(typeof dogLeg !== "boolean")) {
      this.dog_leg = dogLeg;
    }
  }

  getHighFeedrate() {
    return this.highFeedrate;
  }

  setHighFeedrate(value) {
    if (!(typeof value !== "number")) {
      this.highFeedrate = value;
    }
  }

  getGlobalPosition(p) {
    if (!(p instanceof Vector)) {
      throw new Error("getGlobalPosition accepts a Vector");
    }
    //Incomplete
    return new Vector(
      p.x + priorOutput.X,
      p.y + priorOutput.Y,
      p.z + priorOutput.Z
    );
  }

  getWCSPosition(p) {
    if (!(p instanceof Vector)) {
      throw new Error("getWCSPosition accepts a Vector");
    }
    return getGlobalPosition(p);
  }

  getSectionPosition(p) {
    if (!(p instanceof Vector)) {
      throw new Error("getSectionPosition accepts a Vector");
    }
    //Incomplete
    return new Vector(
      p.x + priorOutput.X,
      p.y + priorOutput.Y,
      p.z + priorOutput.Z
    );
  }

  getCurrentGlobalPosition() {
    return new Vector(priorOutput.X, priorOutput.Y, priorOutput.Z);
  }

  getCurrentPosition() {
    return new Vector(priorOutput.X, priorOutput.Y, priorOutput.Z);
  }

  setCurrentPosition(currentPosition) {
    if (!(currentPosition instanceof Vector)) {
      throw new Error("getSectionPosition accepts a Vector");
    }

    priorOutput.X = currentPosition.x;
    priorOutput.Y = currentPosition.y;
    priorOutput.Z = currentPosition.z;
  }

  setCurrentPositionX(X) {
    if (!(typeof X === "number")) {
      throw new Error("getSectionPosition accepts a Vector");
    }
    priorOutput.X = X;
  }

  setCurrentPositionX(Y) {
    if (!(typeof Y === "number")) {
      throw new Error("getSectionPosition accepts a Vector");
    }
    priorOutput.Y = Y;
  }

  setCurrentPositionX(Z) {
    if (!(typeof Z === "number")) {
      throw new Error("getSectionPosition accepts a Vector");
    }
    priorOutput.Z = Z;
  }

  getCurrentDirection() {}
}

function getEOLCharacter(eolStyle) {
  switch (eolStyle) {
    case "CR":
      return "\r";
    case "LF":
      return "\n";
    case "CRLF":
      return "\r\n";
    case "LFCR":
      return "\n\r";
    default:
      return "";
  }
}
