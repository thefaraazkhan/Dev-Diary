const dotenv = require("dotenv");
dotenv.config();
const { MongoClient } = require("mongodb");

const URL = process.env.URL;
const PORT = process.env.PORT;

const client = new MongoClient(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function start() {
  await client.connect();
  // module.exports = client.db();
  module.exports = client;
  const app = require("./app");
  app.listen(PORT);
  console.log(`Listening on port ${PORT}`);
}

start();
