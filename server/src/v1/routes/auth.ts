import express, { Request, Response } from "express";
import { body } from "express-validator";
import { UserModel } from "../models/userModel";
import validateError from "../handlers/validation";
import userController from "../controllers/user";
import verifyToken from "../handlers/token";

const router = express.Router();
const userCtrl = userController();

// Register user
router.post(
  "/register",
  body("email").isEmail().withMessage("無効なEmailです"),
  body("userName").isLength({ min: 8 }).withMessage("ユーザー名は8文字以上である必要です"),
  body("password").isLength({ min: 8 }).withMessage("パスワードは8文字以上である必要です"),
  body("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("確認用パスワードは8文字以上である必要です"),
  body("email").custom(async (value: string) => {
    return await UserModel.findOne({ email: value }).then((email) => {
      if (email) {
        return Promise.reject("このEmailはすでに使われています");
      }
    });
  }),
  validateError,
  userCtrl.register,
);

// Login user
router.post(
  "/login",
  body("email").isEmail().withMessage("無効なEmailです"),
  body("password").isLength({ min: 8 }).withMessage("パスワードは8文字以上である必要です"),
  validateError,
  userCtrl.login,
);

// Verify token
router.post("/verify-token", verifyToken, userCtrl.verifyToken);

export default router;
