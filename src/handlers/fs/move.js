import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { unlink } from "node:fs/promises";
import printCurrentDirectory from "../../helpers/currentDir.js";
import handleOperationFailure from "../../helpers/operationFailure.js";
import { resolve, basename } from "node:path";

async function moveFile(pathToFile, pathToNewDirectory) {
  try {
    const filePath = basename(pathToFile);
    const currentPath = resolve(process.cwd());
    const sourcePath = resolve(currentPath, pathToFile);
    const destinationPath = resolve(currentPath, pathToNewDirectory, filePath);

    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(destinationPath);

    await pipeline(readStream, writeStream);
    await unlink(sourcePath);

    console.log(`Moved file: ${pathToFile} -> ${pathToNewDirectory}`);
    printCurrentDirectory();
  } catch (error) {
    handleOperationFailure();
  }
}

export { moveFile };
