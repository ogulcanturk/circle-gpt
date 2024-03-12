// Lib
const { infoVector } = require("./upstash");

async function initialize() {

  try {

    const info = await infoVector({});

    if (info.vectorCount === 0) {
      console.log("Initialize started.");
    }

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
