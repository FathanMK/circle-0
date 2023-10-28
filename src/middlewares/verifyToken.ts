import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

interface RequestWithUserId extends Request {
  userId?: string;
}

export default function verifyToken(
  req: RequestWithUserId,
  res: Response,
  next: NextFunction
) {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(
    token as string,
    process.env.JWT_SECRET as string,
    (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      //@ts-ignore
      req.userId = decoded?.id;
      next();
    }
  );
}
