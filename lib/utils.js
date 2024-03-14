// Lib
const { infoVector, upsertVector } = require('./upstash');
const { createSummary, createEmbedding } = require('./openai');
const { getPosts } = require('./circle');

// Initialize Function
// I need a better idea.
async function initialize() {

  try {

    // Info Vector Database
    const info = await infoVector({});
    console.log('initialize: vector records count ', info.vectorCount);

    // IF not have record
    if (info.vectorCount === 0) {

      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      // Get All Posts
      const posts = await getPosts();

      // Loop
      // Process posts in batches of 50
      for (let i = 0; i < posts.length; i += 50) {
        //
        const batch = posts.slice(i, i + 50);
        //
        const promises = batch.map(async (post) => {

          try {
            //
            const summary = await createSummary({ content: post.body.body });
            //
            const embedding = await createEmbedding({ content: summary });
            //
            await upsertVector({
              id: post.id,
              vector: embedding,
              metadata: {
                created_at: post.created_at,
                post_name: post.name,
                post_url: post.url,
                post_summary: summary,
                space_name: post.space_name
              }
            });
            //
            console.log(`Processed post ${post.id}`);
          } catch (error) {
            console.error(`Error processing post ${post.id}:`, error);
          }
        });

        // Request
        await Promise.all(promises);
        console.log(`Completed batch ${i / 50 + 1}`);

        await sleep(30000); // 30 second delay
        console.log('Waiting 30 second...');
      };

    };

    // Return
    return true;

  } catch (error) {
    console.error("Initialize error: ", error);
    throw Error('Initialize error.');
  };

}

module.exports = {
  initialize
};
