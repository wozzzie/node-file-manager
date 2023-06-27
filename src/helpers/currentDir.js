const printCurrentDirectory = () => {
  const cwd = process.cwd();
  console.log(`You are currently in ${cwd}`);
};

export default printCurrentDirectory;
