import printCurrentDirectory from "../../helpers/currentDir.js";
import handleOperationFailure from "../../helpers/operationFailure.js";

const getCPUArchitecture = () => {
  try {
    console.log(`CPU architecture: ${process.arch}`);
    printCurrentDirectory();
  } catch (error) {
    handleOperationFailure();
  }
};

export { getCPUArchitecture };
