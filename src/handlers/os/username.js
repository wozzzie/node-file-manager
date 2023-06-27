import os from "node:os";
import printCurrentDirectory from "../../helpers/currentDir.js";
import handleOperationFailure from "../../helpers/operationFailure.js";

const getSystemUsername = () => {
  try {
    console.log(`System user name: ${os.userInfo().username}`);
    printCurrentDirectory();
  } catch (error) {
    handleOperationFailure();
  }
};

export { getSystemUsername };
