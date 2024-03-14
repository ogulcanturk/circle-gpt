// Express
const express = require('express');

// Route
const webhookRoute = express.Router()

// Lib
const { getPost } = require("./../lib/circle");
const { createSummary, createEmbedding } = require('../lib/openai');
const { upsertVector } = require('../lib/upstash');

webhookRoute.post('/post', async (req, res) => {

  // Body
  const { data: { post_id } } = req.body;

  try {

    // Find Post
    const post = await getPost({ post_id });
    if (!post) return res.status(400).json({ message: 'post_id not found.' });

    // Create Summary
    const summary = await createSummary({ content: post.body.body });
    if (!summary) return res.status(400).json({ message: 'Summary not found.' });

    // Create Embedding
    const embedding = await createEmbedding({ content: summary });
    if (!embedding) return res.status(400).json({ message: 'Embedding not found.' });

    // Upsert Vector
    const response = await upsertVector({
      id: post.id,
      vector: embedding,
      metadata: {
        created_at: post.created_at,
        post_name: post.name,
        post_url: post.url,
        space_name: post.space_name
      }
    });
    if (!response) return res.status(400).json({ message: 'Vector not added.' });

    // Return
    return res.status(200).json({ message: 'ok.' });

  } catch(error) {
    // Error
    console.log(error);
    return res.status(500).json({ message: 'Server err.' });
  }
});

module.exports = webhookRoute;
