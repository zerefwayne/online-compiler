const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

app.post("/run", (req, res) => {
  const { language = "cpp", code } = req.body;
  if (code === undefined) {
    return res.status(400).json({ success: false, error: "empty code" });
  }
  return res.json({ language, code });
});

// start listening for connections
app.listen(3000, () => {
  console.log("Listening on port 3000!");
});
