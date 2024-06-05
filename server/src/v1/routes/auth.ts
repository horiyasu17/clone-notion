import express from "express";
import { body } from "express-validator";
import { UserModel } from "../models/userModel";
import validateError from "../handlers/validation";
import userController from "../controllers/user";

const router = express.Router();
const userCtrl = userController();

router.post(
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
    return UserModel.findOne({ email: value }).then((email) => {
      if (email) {
        return Promise.reject("このEmailはすでに使われています");
      }
    });
  }),
  validateError,
  userCtrl.register,
);

router.post(
  "/login",
  body("email").isEmail().withMessage("無効なEmailです"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("パスワードは8文字以上である必要です"),
  validateError,
  userCtrl.login,
);

export default router;
