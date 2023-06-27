import { createHash } from "node:crypto";
import { resolve } from "node:path";
import { readFile } from "node:fs/promises";
import handleOperationFailure from "../../helpers/operationFailure.js";
import printCurrentDirectory from "../../helpers/currentDir.js";

const calculateHash = async (filePath) => {
  try {
    const currentPath = resolve(process.cwd());
    const path = resolve(currentPath, String(filePath));

    const fileData = await readFile(path, { encoding: "utf-8" });
    const hash = createHash("sha256").update(fileData);
    const hexHash = hash.digest("hex");
    console.log(`SHA256 Hash: ${hexHash}`);
    printCurrentDirectory();
  } catch (error) {
    handleOperationFailure();
  }
};

export { calculateHash };
