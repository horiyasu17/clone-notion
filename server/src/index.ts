import * as dotenv from "dotenv";
import express from "express";
import { Express, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { AES } from "crypto-js";
import { User } from "./v1/models/user";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";

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
app.post(
  "/register",
  body("email").isEmail().withMessage("無効なEmailです"),
  body("username")
    .isLength({ min: 8 })
    .withMessage("ユーザー名は8文字以上である必要です"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("パスワードは8文字以上である必要です"),
  body("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("確認用パスワードは8文字以上である必要です"),
  body("email").custom((value: string) => {
    return User.findOne({ email: value }).then((email) => {
      if (email) {
        return Promise.reject("このEmailはすでに使われています");
      }
    });
  }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
  async (req: Request, res: Response) => {
    const password = req.body.password;

    try {
      // Encrypt Password
      req.body.password = AES.encrypt(password, process.env.SECRET_KEY);
      // Register user
      const user = await User.create(req.body);
      // Create JWT
      const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "24h",
      });

      return res.status(200).json({ user, token });
    } catch (error) {
      return res.status(200).json(error);
    }
  },
);
