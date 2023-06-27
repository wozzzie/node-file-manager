import handleOperationFailure from "../helpers/operationFailure.js";
import { stat } from "fs/promises";
import { dirname } from "path";

export async function upHandler(currentDir) {
  try {
    const STATS = await stat(dirname(currentDir));

    if (STATS.isDirectory()) {
      return dirname(currentDir);
    }
  } catch (error) {
    handleOperationFailure();
  }
}
