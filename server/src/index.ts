import * as dotenv from "dotenv";
import express from "express";
import { Express } from "express";
import mongoose from "mongoose";
import authRouter from "./v1/routes";
import cors from "cors";

dotenv.config();

const app: Express = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
// create new user API
app.use("/api/v1", authRouter);

const port = process.env.PORT || 5050;
const dbUrl = process.env.MONGODB_URL;

// connect DB
try {
  mongoose.connect(dbUrl);
  mongoose.Promise = global.Promise;
  console.log("DB Connected");
} catch (error) {
  console.log(error);
}

app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`),
);
