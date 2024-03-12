// Packages
const OpenAI = require("openai");

// OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
});

async function createSummary({ content }) {
  return;
};

async function createEmbedding({ content }) {
  return;
};

export default {
  createSummary,
  createEmbedding
};
