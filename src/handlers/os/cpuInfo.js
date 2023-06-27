import os from "node:os";
import printCurrentDirectory from "../../helpers/currentDir.js";
import handleOperationFailure from "../../helpers/operationFailure.js";

const getCPUsInfo = () => {
  try {
    const cpus = os.cpus();
    console.log(`Number of CPUs: ${cpus.length}`);
    cpus.forEach((cpu, index) => {
      console.log(`CPU ${index + 1}: ${cpu.model} (${cpu.speed} GHz)`);
    });
    printCurrentDirectory();
  } catch (error) {
    handleOperationFailure();
  }
};

export { getCPUsInfo };
