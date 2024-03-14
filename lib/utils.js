// Lib
const { infoVector } = require('./upstash');

async function initialize() {
  try {
    const info = await infoVector({});
    console.log(info);
    return true;
  } catch (error) {
    console.error("Initialize error: ", error);
    throw error;
  }
}

module.exports = {
  initialize
};
