import handleOperationFailure from "../helpers/operationFailure.js";
import { readdir } from "fs/promises";

export const lsHandler = async (currentDir) => {
  try {
    const files = await readdir(currentDir, { withFileTypes: true });
    const sortedFiles = files
      .map((item) => ({
        Name: item.name,
        Type: item.isFile() ? "file" : "directory",
      }))
      .sort((a, b) => {
        if (a.Type === b.Type) {
          return a.Name.localeCompare(b.Name);
        }
        return a.Type === "directory" ? -1 : 1;
      });

    console.table(sortedFiles);
  } catch (error) {
    handleOperationFailure();
  }
};
