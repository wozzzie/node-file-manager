import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import printCurrentDirectory from "../../helpers/currentDir.js";
import handleOperationFailure from "../../helpers/operationFailure.js";
import { resolve, basename } from "node:path";

async function copyFile(pathToFile, pathToNewDirectory) {
  try {
    const filePath = basename(pathToFile);
    const sourcePath = resolve(process.cwd(), pathToFile);
    const destinationPath = resolve(
      process.cwd(),
      pathToNewDirectory,
      filePath
    );

    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(destinationPath);

    await pipeline(readStream, writeStream);

    console.log(`Copied file: ${pathToFile} -> ${pathToNewDirectory}`);
    printCurrentDirectory();
  } catch (error) {
    handleOperationFailure();
  }
}

export { copyFile };
