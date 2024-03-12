// Express
const express = require('express');

// Route
const webhookRoute = express.Router()

webhookRoute.post('/post', (req, res) => {
  return res.status(200).json({ message: 'ok' });
});

module.exports = webhookRoute;
