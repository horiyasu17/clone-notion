import { Request, Response } from "express";
import { AES, enc } from "crypto-js";
import { UserModel, UserDoc } from "../models/userModel";
import jwt from "jsonwebtoken";

const userController = () => {
  // Register user
  const register = async (req: Request<UserDoc>, res: Response) => {
    const password = req.body.password;

    try {
      // Encrypt Password
      req.body.password = AES.encrypt(
        password,
        process.env.SECRET_KEY,
      ).toString();

      // Register user
      const user = await UserModel.create(req.body);
      // Create JWT
      const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "24h",
      });

      return res.status(200).json({ user, token });
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  // Login
  const login = async (req: Request<UserDoc>, res: Response) => {
    const { email, password } = req.body;

    try {
      // check user
      const user = await UserModel.findOne({ email });
      if (!user)
        return res.status(401).json({
          errors: { param: "email", message: "Emailが無効です" },
        });

      // Verify password
      const decryptedPassword = AES.decrypt(
        user.password,
        process.env.SECRET_KEY,
      ).toString(enc.Utf8);
      if (decryptedPassword !== password)
        return res.status(401).json({
          errors: { param: "password", message: "パスワードが無効です" },
        });

      // Create JWT
      const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "24h",
      });

      return res.status(200).json({ user, token });
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  return { register, login };
};

export default userController;
