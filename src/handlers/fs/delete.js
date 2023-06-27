import { unlink } from "node:fs/promises";
import { resolve } from "node:path";
import handleOperationFailure from "../../helpers/operationFailure.js";

const deleteFile = async (filePath) => {
  try {
    const currentPath = resolve(process.cwd());
    const path = resolve(currentPath, String(filePath));
    await unlink(path);
    console.log(`Deleted file: ${filePath}`);
  } catch (error) {
    handleOperationFailure();
  }
};

export { deleteFile };
