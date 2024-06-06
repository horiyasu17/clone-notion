import express from "express";
import router from "../../v1/routes/auth";

const authRouter = express.Router();
authRouter.use("/auth", router);

export default authRouter;
