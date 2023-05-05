import express from "express";
import * as dotenv from "dotenv";
import router from "./routes";
import { connectToMongoDb } from "./infra/mongodb/config";

dotenv.config();

const app = express();

app.use(express.json());

app.use(router);

connectToMongoDb()
  .then(() => {
    console.info("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err.message, "❌ Failed to connect to MongoDB");
  });

app.listen(process.env.APP_PORT, () => {
  console.info(`✅ App is runnig on port ${process.env.APP_PORT}`);
});
