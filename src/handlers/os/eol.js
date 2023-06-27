import os from "node:os";
import printCurrentDirectory from "../../helpers/currentDir.js";
import handleOperationFailure from "../../helpers/operationFailure.js";

const getEOL = () => {
  try {
    console.log(`End-Of-Line (EOL): ${JSON.stringify(os.EOL)}`);
    printCurrentDirectory();
  } catch (error) {
    handleOperationFailure();
  }
};

export { getEOL };
