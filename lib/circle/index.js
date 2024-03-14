// Get Post Function
async function getPost({ post_id }) {

  try {

    const response = await fetch(`https://app.circle.so/api/v1/posts/${post_id}?community_id=${process.env.CIRCLE_COMMUNITY_ID}`, {
      method: "GET",
      headers: {
        "Authorization": `Token ${process.env.CIRCLE_TOKEN}`
      }
    });

    const responseJSON = await response.json();

    // Response not found
    if (!responseJSON) throw Error('Circle error. Please check logs.');

    // Return
    return responseJSON;

  } catch(error) {
    // Error
    console.log(error);
    throw Error('Circle error. Please check logs.');
  };

};

// Get Posts Function
async function getPosts({}) {

  try {

    // Params
    let page = 1;
    const posts = [];

    // Loop
    while (true) {

      // Fetch
      const response = await fetch(`https://app.circle.so/api/v1/posts?per_page=80&community_id=${process.env.CIRCLE_COMMUNITY_ID}&page=${page}`, {
        headers: {
          Authorization: `Token ${process.env.CIRCLE_TOKEN}`
        }
      });

      // JSON
      const data = await response.json();

      //
      if (data.length === 0) break;

      // Log
      console.log(`Crawled post count: ${data.length}`);

      // Push
      posts.push(...data);

      // Inc
      page++;
    };

    return posts;

  } catch(error) {
    // Error
    console.log(error);
    throw Error('Circle error. Please check logs.');
  };

};

module.exports = {
  getPost,
  getPosts
};
