// Packages
const OpenAI = require("openai");

// OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
});

async function createSummary({ content }) {

  try {

    const completion = await openai.chat.completions.create({
      messages: [{
        "role": "system",
        "content": `
          Just return a maximum 8000 word summary of the text.
          Do not provide a summary in the AI's own words.
          Summarize the content.
          Don't skip important details.
          The response language must be the same as the content language.
        `
      }, {
        "role": "user",
        "content": content
    }],
      model: "gpt-3.5-turbo"
    });

    // Response not found
    if (completion?.choices[0]?.message?.content) throw Error('OpenAI error. Please check logs.');

    // Return
    return completion?.choices[0]?.message?.content;

  } catch(error) {
    // Error
    console.log(error);
    throw Error('OpenAI error. Please check logs.');
  };

};

async function createEmbedding({ content }) {

  try {

    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: content
    });

    // Response not found
    if (embedding?.data[0]?.embedding) throw Error('OpenAI error. Please check logs.');

    // Return
    return embedding?.data[0]?.embedding;

  } catch(error) {
    // Error
    console.log(error);
    throw Error('OpenAI error. Please check logs.');
  };

};

export default {
  createSummary,
  createEmbedding
};
