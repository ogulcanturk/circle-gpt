// Express
const express = require('express');

// Route
const webhookRoute = express.Router()

webhookRoute.post('/post', (req, res) => {

  // Body
  const body = req.body;

  try {

    // Find Post
    // Get Post Details
    // Create Summary
    // Create Embedding
    // Upsert Vector
    // Return

  } catch(error) {
    // Error
    console.log(error);
    return res.status(500).json({ message: 'Server err.' });
  }
});

module.exports = webhookRoute;
