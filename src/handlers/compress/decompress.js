import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream";
import { createBrotliDecompress } from "zlib";
import handleOperationFailure from "../../helpers/operationFailure.js";
import printCurrentDirectory from "../../helpers/currentDir.js";
import { resolve, basename } from "node:path";

const decompressFile = (pathToFile, pathToDestination) => {
  try {
    const currentPath = resolve(process.cwd());
    const fileName = basename(pathToFile);
    const sourcePath = resolve(currentPath, String(pathToFile));
    const destinationPath = resolve(
      currentPath,
      String(pathToDestination),
      fileName.replace(".br", "")
    );

    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(destinationPath);
    const brotliDecompress = createBrotliDecompress();

    pipeline(readStream, brotliDecompress, writeStream, (err) => {
      if (err) {
        console.log(err);
        handleOperationFailure();
      } else {
        console.log(`Decompressed file: ${pathToFile} -> ${pathToDestination}`);
        printCurrentDirectory();
      }
    });
  } catch (error) {
    handleOperationFailure();
  }
};

export { decompressFile };
