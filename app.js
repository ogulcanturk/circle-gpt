// Express
const express = require("express");

// ENV
require('dotenv').config();

// App
const app = express();

app.get("/", (req, res) => {
  res.send('Hello World!')
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`NomadGPT listening on port ${process.env.PORT || 3000}`);
});
