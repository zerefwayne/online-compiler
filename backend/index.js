const express = require('express')

const app = express()

// routes
app.get('/', (req, res) => {
  res.json({"hello": "world"})
})

// start listening for connections
app.listen(3000, () => {
  console.log("Listening on port 3000!")
})
