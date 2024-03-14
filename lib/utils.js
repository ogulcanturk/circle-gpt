// Lib
const { getPosts } = require("./circle");
const { createEmbedding, createSummary } = require("./openai");
const { infoVector, upsertVector } = require("./upstash");

// Aynı anda çalıştırılacak maksimum işlem sayısı
const chunkSize = 50;

async function processPost(post) {
  try {
    // Log
    console.log("Embedding post: ", post.id);
    const summary = await createSummary({ content: post.body.body });
    //
    if (!summary) {
      console.log("Summary not found for post: ", post.id);
      return;
    }
    //
    const embedding = await createEmbedding({ content: summary });
    if (!embedding) {
      console.log("Embedding not found for post: ", post.id);
      return;
    }
    //
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
    if (!vector) {
      console.log("Vector not saved for post: ", post.id);
    }
  } catch (error) {
    console.error("Error processing post: ", post.id, error);
  }
}

async function processPostsInChunks(posts) {
  for (let i = 0; i < posts.length; i += chunkSize) {
    const chunk = posts.slice(i, i + chunkSize);
    await Promise.all(chunk.map(processPost));
  }
}

async function initialize() {
  try {
    const info = await infoVector({});
    if (info.vectorCount === 0) {
      console.log("Initialize started.");
      const posts = await getPosts({});
      console.log("Post count: ", posts.length);
      await processPostsInChunks(posts);
      console.log('Initialize finished.');
    }
    return true;
  } catch (error) {
    console.error("Initialize error: ", error);
    throw error;
  }
}

module.exports = {
  initialize
};
