import { app } from "./app.js";
import config from "../src/config.js";
import { connectDB } from "./db/index.js";

async function start() {
  await app.listen(config.port);
  await connectDB(config.mongoUrl);
}

start();
