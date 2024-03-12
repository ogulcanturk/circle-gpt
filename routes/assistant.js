// Express
const express = require('express');

// Lib
const { createEmbedding } = require('./../lib/openai');
const { queryVector } = require('./../lib/upstash');

// Route
const assistantRoute = express.Router()

assistantRoute.get('/search', async (req, res) => {

  // Headers
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.API_KEY) return res.status(403).json({ message: 'API key incorrect.' });

  // Params
  const { text } = req.query;
  if (!text) return res.status(400).json({ message: "Text not found." });

  try {

    // Create embedding
    const embedding = await createEmbedding({ content: text });
    if (!embedding) return res.status(400).json({ message: "Embedding not found." });

    // Find Vector
    const vector = await queryVector({ vector: embedding });
    if (!vector) return res.status(400).json({ message: "Vector not found." });

    // Return
    return res.status(200).json(vector);

  } catch(error) {
    // Error
    console.log(error);
    return res.status(500).json({ message: 'Server err.' });
  };

});

module.exports = assistantRoute;
