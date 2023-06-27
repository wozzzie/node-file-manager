import { resolve, dirname } from "node:path";
import { rename } from "node:fs/promises";
import handleOperationFailure from "../../helpers/operationFailure.js";

const renameFile = async (oldPath, newName) => {
  try {
    const resolvedOldPath = resolve(oldPath);
    const newPath = resolve(dirname(resolvedOldPath), newName);

    await rename(resolvedOldPath, newPath);
    console.log(`Renamed file: ${oldPath} -> ${newName}`);
  } catch (error) {
    handleOperationFailure();
  }
};

export { renameFile };
