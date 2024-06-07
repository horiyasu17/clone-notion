import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserModel } from "../models/userModel";

type DecodedTokenType = JwtPayload & {
  id: string;
};

// Decoded token
const tokenDecode = (req: Request): JwtPayload | string | null => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ")[1];

    try {
      return jwt.verify(bearer, process.env.TOKEN_SECRET_KEY);
    } catch {
      return null;
    }
  } else {
    return null;
  }
};

// Verify JWT token
const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const decodedToken = tokenDecode(req);

  if (decodedToken) {
    const user = await UserModel.findById(
      (decodedToken as DecodedTokenType).id,
    );
    if (!user) return res.status(401).json("権限がありません");

    res.locals.user = user;
    next();
  } else {
    return res.status(401).json("権限がありません");
  }
};

export default verifyToken;
