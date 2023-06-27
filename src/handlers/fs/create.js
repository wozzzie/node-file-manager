import { open } from "node:fs/promises";
import { resolve } from "node:path";
import handleOperationFailure from "../../helpers/operationFailure.js";

const createFile = async (fileName, currentDir) => {
  const filePath = resolve(currentDir, fileName.toString());
  let newFile;
  try {
    newFile = await open(filePath, "w");
    console.log(`Created file: ${fileName}`);
  } catch (error) {
    handleOperationFailure();
  }
};

export { createFile };
