// Express
const express = require('express');

// Lib
const { createEmbedding } = require('./../lib/openai');
const { queryVector, ratelimit } = require('./../lib/upstash');

// Route
const assistantRoute = express.Router()

assistantRoute.get('/search', async (req, res) => {

  // Headers
  const { text } = req.query;
  const apiKey = req.headers['x-api-key'] || '';
  const ipAddress = (req.headers['x-forwarded-for'] || '').split(',')[0] || '';

  // API Key Checks
  if (apiKey !== process.env.API_KEY) return res.status(403).json({ message: 'API key incorrect.' });

  // RateLimit
  const success = await ratelimit.limit(ipAddress);
  if (!success) return res.status(403).json({ message: 'Calm down.' });

  // Params
  if (!text) return res.status(400).json({ message: "Text not found." });

  try {

    // Create embedding
    const embedding = await createEmbedding({ content: text });
    if (!embedding) return res.status(400).json({ message: "Embedding not found." });

    // Find Vector
    const vector = await queryVector({ vector: embedding });
    if (!vector) return res.status(400).json({ message: "Vector not found." });

    // Return
    return res.status(200).json({ message: "Query success.", data: vector });

  } catch(error) {
    // Error
    console.log(error);
    return res.status(500).json({ message: 'Server err.' });
  };

});

module.exports = assistantRoute;
