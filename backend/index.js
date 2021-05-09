const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost/compilerdb",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    err && console.error(err);
    console.log("Successfully connected to MongoDB: compilerdb");
  }
);

const { generateFile } = require("./generateFile");
const { executeCpp } = require("./executeCpp");
const { executePy } = require("./executePy");
const Job = require("./models/Job");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/run", async (req, res) => {
  const { language = "cpp", code } = req.body;

  console.log(language, "Length:", code.length);

  if (code === undefined) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }
  try {
    // need to generate a c++ file with content from the request
    const filepath = await generateFile(language, code);

    // write into DB
    const job = await new Job({ language, filepath }).save();

    const jobId = job["_id"];
    res.status(201).json({ jobId });

    // we need to run the file and send the response
    let output;
    if (language === "cpp") {
      output = await executeCpp(filepath);
    } else if (language === "py") {
      output = await executePy(filepath);
    }
    console.log(output);
    // return res.json({ filepath, output });
  } catch (err) {
    console.error(err);
    // res.status(500).json({ err });
  }
});

app.listen(5000, () => {
  console.log(`Listening on port 5000!`);
});
