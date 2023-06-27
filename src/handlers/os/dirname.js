import os from "node:os";
import printCurrentDirectory from "../../helpers/currentDir.js";
import handleOperationFailure from "../../helpers/operationFailure.js";

const getHomeDirectory = () => {
  try {
    console.log(`Home directory: ${os.homedir()}`);
    printCurrentDirectory();
  } catch (error) {
    handleOperationFailure();
  }
};

export { getHomeDirectory };
