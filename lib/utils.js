// Lib
const { getPosts } = require("./circle");
const { createEmbedding, createSummary } = require("./openai");
const { infoVector, upsertVector } = require("./upstash");

async function initialize() {

  try {

    const info = await infoVector({});

    if (info.vectorCount === 0) {

      // Log
      console.log("Initialize started.");

      // Get All Posts
      const posts = await getPosts({});

      // Log
      console.log("Post count: ", posts.length);

      // Posts
      for(const post of posts) {

        // Log
        console.log("Embedding post: ", post.id);

        // Create Summary
        const summary = await createSummary({
          content: post.body.body
        });
        if (!summary) { console.log("Summary not found."); continue; };

        // Create embedding
        const embedding = await createEmbedding({
          content: summary
        });
        if (!embedding) { console.log("Embedding not found."); continue; };

        // Upsert Vector
        const vector = await upsertVector({
          id: post.id,
          vector: embedding,
          metadata: {
            id: post.id,
            created_at: post.created_at,
            post_name: post.name,
            post_summary: summary,
            post_url: post.url,
            space_name: post.space_name,
            user_name: post.user_name
          }
        });
        if (!vector) { console.log("Vector not found."); continue; };

        // Log
        console.log("Embedding post: ", post.id);
      };

      // Log
      console.log('Initialize finished.')
    };

    return true;
  } catch(error) {
    // Error
    console.log(error);
    throw Error('Initialize error.');
  }
};

module.exports = {
  initialize
};
