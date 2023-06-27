import { resolve, dirname } from "path";
import { stat } from "fs/promises";
import handleOperationFailure from "../helpers/operationFailure.js";

let savedDirectory = "";

export async function cdHandler(currentDir, args) {
  try {
    const TARGET_PATH = args[1];

    if (TARGET_PATH === "-") {
      if (!savedDirectory) {
        console.log("No saved directory available.");
        return currentDir;
      }
      return savedDirectory;
    }

    let A_PATH = TARGET_PATH;
    const isAbsolutePath = /^[a-zA-Z]:$/.test(TARGET_PATH);

    if (TARGET_PATH === "..") {
      A_PATH = dirname(currentDir);
    } else if (isAbsolutePath) {
      A_PATH = resolve(TARGET_PATH, "\\");
    } else {
      A_PATH = resolve(currentDir, TARGET_PATH);
    }

    const STATS = await stat(A_PATH);

    if (STATS.isDirectory()) {
      savedDirectory = currentDir;
      return A_PATH;
    }
  } catch (error) {
    handleOperationFailure();
  }
}
