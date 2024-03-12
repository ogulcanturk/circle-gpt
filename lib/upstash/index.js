// Packages
const { Index } = require("@upstash/vector");

// Upstash
const index = new Index({
  url: process.env.UPSTASH_URL || '',
  token: process.env.UPSTASH_TOKEN || '',
});

async function upsertVector({ id, vector, metadata }) {
  return;
};

async function queryVector({ id, vector, metadata }) {
  return;
};

export default {
  upsertVector,
  queryVector
};
