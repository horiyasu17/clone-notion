import { Request, Response } from 'express';
import { AES, enc } from 'crypto-js';
import { UserModel, UserDoc } from '../models/userModel';
import jwt from 'jsonwebtoken';

const UserController = () => {
  // Register user
  const register = async (req: Request<UserDoc>, res: Response) => {
    const password = req.body.password;

    try {
      // Encrypt Password
      req.body.password = AES.encrypt(password, process.env.SECRET_KEY).toString();

      // Register user
      const user = await UserModel.create(req.body);
      // Create JWT
      const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: '24h',
      });

      return res.status(200).json({ user, token });
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  // Login
  const login = async (req: Request<UserDoc>, res: Response) => {
    const { email, password } = req.body;
    let isError = false;

    try {
      // check user
      const user = await UserModel.findOne({ email });
      if (!user) isError = true;

      // Verify password
      if (user) {
        const decryptedPassword = AES.decrypt(user?.password, process.env.SECRET_KEY).toString(
          enc.Utf8,
        );
        if (decryptedPassword !== password) isError = true;
      }

      // Response error
      if (isError)
        return res.status(401).json({
          errors: [
            { path: 'email', msg: 'Emailかパスワードが無効です' },
            { path: 'password', msg: 'Emailかパスワードが無効です' },
          ],
        });

      // Create JWT
      const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: '24h',
      });

      return res.status(200).json({ user, token });
    } catch (error) {
      console.log('error');
      return res.status(500).json(error);
    }
  };

  // Verify token
  const verifyToken = async (_: Request, res: Response) => {
    return res.status(200).json({ user: res.locals.user });
  };

  return { register, login, verifyToken };
};

export default UserController;
