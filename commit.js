const child_process = require("child_process");

const commitHash = child_process
  .execSync("git show -s --format=%H")
  .toString()
  .trim();

module.exports = {
  commitHash,
};
