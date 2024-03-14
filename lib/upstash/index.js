// Packages
const { Index } = require("@upstash/vector");
const { Ratelimit } = require("@upstash/ratelimit");
const { Redis } = require("@upstash/redis");

// Upstash Index
const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL || '',
  token: process.env.UPSTASH_VECTOR_REST_TOKEN || ''
});

// Upstash RateLimit
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

// Upsert Function
async function infoVector({}) {

  try {

    // Upsert
    const response = await index.info();

    // Response not found
    if (!response) throw Error('Upstash error. Please check logs.')

    // Return
    return response;

  } catch(error) {
    // Error
    console.log(error);
    throw Error('Upstash error. Please check logs.');
  };

};

// Upsert Function
async function upsertVector({ id, vector, metadata }) {

  try {

    // Upsert
    const response = await index.upsert({
      id: id,
      vector: vector,
      metadata: metadata
    });

    // Response not found
    if (!response) throw Error('Upstash error. Please check logs.')

    // Return
    return response;

  } catch(error) {
    // Error
    console.log(error);
    throw Error('Upstash error. Please check logs.');
  };

};

// Query Function
async function queryVector({ vector }) {

  try {

    // Upsert
    const response = await index.query({
      vector: vector,
      topK: 10,
      includeVectors: false,
      includeMetadata: true
    });

    // Response not found
    if (!response) throw Error('Upstash error. Please check logs.')

    // Return
    return response;

  } catch(error) {
    // Error
    console.log(error);
    throw Error('Upstash error. Please check logs.');
  };

};

module.exports = {
  infoVector,
  upsertVector,
  queryVector,
  ratelimit
};
