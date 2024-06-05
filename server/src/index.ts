import * as dotenv from "dotenv";
import express from "express";
import { Express } from "express";
import mongoose from "mongoose";
import router from "./v1/routes/auth";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5050;
const dbUrl = process.env.MONGODB_URL;

app.use(express.json());

app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`),
);

// connect DB
try {
  mongoose.connect(dbUrl);
  mongoose.Promise = global.Promise;
  console.log("DB Connected");
} catch (error) {
  console.log(error);
}

// create new user API
app.use("/api/v1", router);
