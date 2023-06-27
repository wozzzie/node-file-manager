import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream";
import { createBrotliCompress } from "zlib";
import handleOperationFailure from "../../helpers/operationFailure.js";
import printCurrentDirectory from "../../helpers/currentDir.js";
import { resolve, basename, join } from "node:path";

const compressFile = (pathToFile, pathToDestination) => {
  try {
    const currentPath = resolve(process.cwd());
    const fileName = basename(pathToFile);
    const sourcePath = resolve(currentPath, String(pathToFile));
    const destinationPath = resolve(currentPath, pathToDestination, `${fileName}.br`);

    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(destinationPath);
    const brotliCompress = createBrotliCompress();

    pipeline(readStream, brotliCompress, writeStream, (err) => {
      if (err) {
        console.log(err);
        handleOperationFailure();
      } else {
        console.log(`Compressed file: ${pathToFile} -> ${destinationPath}`);
        printCurrentDirectory();
      }
    });
  } catch (error) {
    handleOperationFailure();
  }
};

export { compressFile };
