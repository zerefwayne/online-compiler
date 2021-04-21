const express = require("express");

const { generateFile } = require("./file-generator");
const { executeCpp } = require("./runner-cpp");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

app.post("/run", async (req, res) => {
  const { language = "cpp", code } = req.body;
  if (code === undefined) {
    return res.status(400).json({ success: false, error: "empty code" });
  }
  try {
    const filepath = await generateFile(code, language);
    const output = await executeCpp(filepath);
    return res.status(200).send(output);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

// start listening for connections
app.listen(3000, () => {
  console.log("Listening on port 3000!");
});
