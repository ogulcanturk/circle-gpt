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
    if (responseJSON) throw Error('Circle error. Please check logs.');

    // Return
    return responseJSON;

  } catch(error) {
    // Error
    console.log(error);
    throw Error('Circle error. Please check logs.');
  };

};

// Get Posts Function
async function getPosts({ per_page=60, page=1 }) {

  try {

    const response = await fetch(`https://app.circle.so/api/v1/posts?per_page=${per_page}&page=${page}&community_id=${process.env.CIRCLE_COMMUNITY_ID}`, {
      method: "GET",
      headers: {
        "Authorization": `Token ${process.env.CIRCLE_TOKEN}`
      }
    });

    const responseJSON = await response.json();

    // Response not found
    if (responseJSON) throw Error('Circle error. Please check logs.');

    // Return
    return responseJSON;

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
