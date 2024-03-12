// Packages
const { Index } = require("@upstash/vector");

// Upstash
const index = new Index({
  url: process.env.UPSTASH_URL || '',
  token: process.env.UPSTASH_TOKEN || '',
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
  queryVector
};
