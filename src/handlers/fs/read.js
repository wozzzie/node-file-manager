import { createReadStream } from "fs";
import handleOperationFailure from "../../helpers/operationFailure.js";
import { resolve } from "node:path";

const readFile = async (filePath) => {
  try {
    const currentPath = resolve(filePath.toString());
    const readStream = createReadStream(currentPath, "utf8");
    let content = "";

    for await (const chunk of readStream) {
      content += chunk;
    }

    return console.log(`${content}`);
  } catch (error) {
    handleOperationFailure();
  }
};

export { readFile };
