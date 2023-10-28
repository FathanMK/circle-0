import "dotenv/config";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories";

interface RequestWithUserId extends Request {
  userId?: string;
}

class UserServices {
  // REGISTER
  async register(req: Request, res: Response): Promise<Response> {
    try {
      // GET INFORMATION
      const { full_name, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const data = {
        username: full_name.toLowerCase().replace(" ", "_"),
        full_name,
        email,
        photo_profile:
          "https://res.cloudinary.com/dts5hyzdq/image/upload/v1698223958/vfygy9mtsax2i7zehkyl.jpg",
        bio: "Little bit empty here",
        password: hashedPassword,
      };

      // CREATE USER
      const user = UserRepository.create(data);

      // SAVE THEN RETURN
      await UserRepository.save(user).catch(() =>
        res.status(418).json({
          status: "Failed",
          message: "Something wrong while creating User!",
        })
      );

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET as string,
        {
          algorithm: "HS256",
          allowInsecureKeySizes: true,
          expiresIn: "24h",
        }
      );

      return res.status(201).json({
        status: "Success",
        message: "User is successfully registered!",
        accessToken: token,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error on the server!", error });
    }
  }

  // LOGIN
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const user = await UserRepository.findOne({
        where: { email },
        select: ["id", "password"],
      });

      if (!user)
        return res
          .status(404)
          .json({ status: "Failed", message: "User didn't exist!", user: [] });

      const isValidatePassword = await bcrypt.compare(
        password,
        user?.password as string
      );

      if (!isValidatePassword)
        return res
          .status(401)
          .json({ status: "Failed", message: "Invalid credentials" });

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET as string,
        {
          algorithm: "HS256",
          allowInsecureKeySizes: true,
          expiresIn: "24h",
        }
      );

      return res.status(200).json({
        status: "Success",
        message: "User is successfully login!",
        accessToken: token,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error on the server!", error });
    }
  }

  async findById(req: RequestWithUserId, res: Response) {
    try {
      const userId = req.userId;

      const user = await UserRepository.findOne({ where: { id: userId } });
      if (!user)
        return res
          .status(404)
          .json({ status: "Failed", message: "User didn't exist" });
      return res.status(200).json({ message: "pew", user });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error on the server!", error });
    }
  }
}
export default new UserServices();
