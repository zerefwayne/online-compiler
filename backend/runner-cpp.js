const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const exepath = path.join(outputPath, jobId);

  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filepath} -o ${exepath} && cd ${outputPath} && ./${jobId}`,
      (error, stdout, stderr) => {
        error && delete error["cmd"] && reject({ error, stderr });
        stderr && reject(stderr);
        resolve(stdout);
      }
    );
  });
};

module.exports = {
  executeCpp,
};
