import os from "os";
import handleOperationFailure from "./helpers/operationFailure.js";
import handleInvalidInput from "./helpers/invalidInput.js";
import readline from "readline";
import { readFile } from "./handlers/fs/read.js";
import { createFile } from "./handlers/fs/create.js";
import { renameFile } from "./handlers/fs/rename.js";
import { copyFile } from "./handlers/fs/copy.js";
import { moveFile } from "./handlers/fs/move.js";
import { deleteFile } from "./handlers/fs/delete.js";
import { getEOL } from "./handlers/os/eol.js";
import { getCPUsInfo } from "./handlers/os/cpuInfo.js";
import { getHomeDirectory } from "./handlers/os/dirname.js";
import { getSystemUsername } from "./handlers/os/username.js";
import { getCPUArchitecture } from "./handlers/os/architecture.js";
import { calculateHash } from "./handlers/hash/hash.js";
import { compressFile } from "./handlers/compress/compress.js";
import { decompressFile } from "./handlers/compress/decompress.js";
import { cdHandler } from "./handlers/cd.js";
import { upHandler } from "./handlers/up.js";
import { lsHandler } from "./handlers/ls.js";

const username = process.argv[2].split("=")[1];
const homedir = os.homedir();
let CURRENT_DIR = homedir;

async function handleUserInput(input) {
  const args = input.trim().split(" ");

  switch (args[0]) {
    case "up":
      const newDir = await upHandler(CURRENT_DIR);
      if (newDir) {
        CURRENT_DIR = newDir;
        console.log(`You are currently in ${CURRENT_DIR}`);
      }
      break;
    case "cd":
      try {
        const newDir = await cdHandler(CURRENT_DIR, args);
        if (newDir) {
          CURRENT_DIR = newDir;
          console.log(`You are currently in ${CURRENT_DIR}`);
        }
      } catch (error) {
        handleOperationFailure();
      }
      break;
    case "ls":
      try {
        await lsHandler(CURRENT_DIR);
        console.log(`You are currently in ${CURRENT_DIR}`);
      } catch (err) {
        console.log(err);
        handleOperationFailure();
      }
      break;
    case "cat":
      if (args) {
        readFile(args[1]);
        console.log(`You are currently in ${CURRENT_DIR}`);
      } else {
        handleInvalidInput();
      }
      break;
    case "add":
      if (args[1]) {
        createFile(args[1], CURRENT_DIR);
        console.log(`You are currently in ${CURRENT_DIR}`);
      } else {
        handleInvalidInput();
      }
      break;
    case "rn":
      if (args[1] && args[2]) {
        renameFile(args[1], args[2]);
      } else {
        handleInvalidInput();
      }
      break;
    case "cp":
      if (args[1] && args[2]) {
        copyFile(args[1], args[2]);
      } else {
        handleInvalidInput();
      }
      break;
    case "mv":
      if (args[1] && args[2]) {
        moveFile(args[1], args[2]);
      } else {
        handleInvalidInput();
      }
      break;
    case "rm":
      if (args[1]) {
        deleteFile(args[1]);
      } else {
        handleInvalidInput();
      }
      break;
    case "os":
      if (args[1]) {
        switch (args[1]) {
          case "--EOL":
            getEOL();
            break;
          case "--cpus":
            getCPUsInfo();
            break;
          case "--homedir":
            getHomeDirectory();
            break;
          case "--username":
            getSystemUsername();
            break;
          case "--architecture":
            getCPUArchitecture();
            break;
          default:
            handleInvalidInput();
            break;
        }
      } else {
        handleInvalidInput();
      }
      break;
    case "hash":
      if (args[1]) {
        calculateHash(args[1]);
      } else {
        handleInvalidInput();
      }
      break;
    case "compress":
      if (args[1] && args[2]) {
        compressFile(args[1], args[2]);
      } else {
        handleInvalidInput();
      }
      break;
    case "decompress":
      if (args[1] && args[2]) {
        decompressFile(args[1], args[2]);
      } else {
        handleInvalidInput();
      }
      break;
    case ".exit":
      console.log(`Thank you for using File Manager, ${username}, goodbye!`);
      process.exit();
    default:
      handleInvalidInput();
      break;
  }
}

console.log(`Welcome to the File Manager, ${username}!`);
console.info("You are currently in", CURRENT_DIR);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
  handleUserInput(input);
});

rl.on("SIGINT", () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit();
});
