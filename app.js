// Express
const express = require("express");

// ENV
require("dotenv").config();

// App
const app = express();

// Routes
const webhookRoute = require("./routes/webhook");
const assistantRoute = require("./routes/assistant");

app.use('/webhooks', webhookRoute);
app.use('/assistant', assistantRoute);

app.get("/", (req, res) => {
  res.send('Hello Nomad!');
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`NomadGPT listening on port ${process.env.PORT || 3000}`);
});
