// Express
const express = require('express');

// Route
const assistantRoute = express.Router()

assistantRoute.post('/search', (req, res) => {
  return res.status(200).json({ message: 'ok' });
});

module.exports = assistantRoute;
