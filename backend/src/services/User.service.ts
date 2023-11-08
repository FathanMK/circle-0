import "dotenv/config";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories";
import cloudinary from "../config/cloudinary";
import getCloudinaryImageName from "../utils/getCloudinaryImageName";

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
        username: full_name.toLowerCase().replace(/\s/g, "_"),
        full_name,
        email,
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

      const user = await UserRepository.findOne({
        where: { id: userId },
        select: {
          following: { id: true, created_at: true, following: true },
          followers: { id: true, created_at: true, followers: true },
        },
        relations: {
          followers: { followers: true },
          following: {
            following: true,
          },
        },
        order: {
          following: {
            created_at: "DESC",
          },
          followers: {
            created_at: "DESC",
          },
        },
      });

      if (!user)
        return res
          .status(404)
          .json({ status: "Failed", message: "User didn't exist" });

      return res.status(200).json({ user });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error on the server!", error });
    }
  }

  async findSuggested(req: RequestWithUserId, res: Response) {
    try {
      const userId = req.userId;
      const users = await UserRepository.createQueryBuilder()
        .select([
          "User.id",
          "User.full_name",
          "User.username",
          "User.photo_profile",
        ])
        .where("User.id != :userId", { userId })
        .orderBy("RANDOM()")
        .take(5)
        .getMany();

      return res
        .status(200)
        .json({ message: "Users successfully returned!", users });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error on the server!", error });
    }
  }

  async findUserByKeyword(req: RequestWithUserId, res: Response) {
    try {
      const { keyword } = req.query;
      if (!keyword)
        return res.status(200).json({ message: "Initialisation", users: [] });

      const users = await UserRepository.createQueryBuilder()
        .where("User.username LIKE :keyword", { keyword: `%${keyword}%` })
        .orWhere("User.full_name LIKE :keyword", { keyword: `%${keyword}%` })
        .getMany();
      return res
        .status(200)
        .json({ message: "Successfully returned user", users });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error on the server!", error });
    }
  }

  async updateProfile(req: RequestWithUserId, res: Response) {
    try {
      const userId = req.userId;
      const { full_name, username, photo_profile, banner_profile, bio } =
        req.body;
      const files = req.files;
      const user = await UserRepository.findOneBy({ id: userId });
      let photoProfileSrc, bannerProfileSrc;

      if (files) {
        //@ts-ignore
        if (files.photo_profile) {
          //@ts-ignore
          photoProfileSrc = files.photo_profile[0];
        }
        //@ts-ignore
        if (files.banner_profile) {
          //@ts-ignore
          bannerProfileSrc = files.banner_profile[0];
        }
      }

      if (typeof photo_profile === "string") {
        photoProfileSrc = photo_profile;
        if (photo_profile === "null") {
          if (typeof user?.photo_profile === "string") {
            const img = getCloudinaryImageName(user?.photo_profile as string);
            if (img !== "vfygy9mtsax2i7zehkyl") {
              await cloudinary.uploader.destroy(
                `_Circle/_Users/_PhotoProfiles/${img}`
              );
            }
          }
          photoProfileSrc = null;
        }
      }

      if (typeof banner_profile === "string") {
        bannerProfileSrc = banner_profile;
        if (banner_profile === "null") {
          if (typeof user?.banner_profile === "string") {
            const img = getCloudinaryImageName(user?.banner_profile as string);
            if (img !== "j19x3xnfap1pt6wbwrfc") {
              await cloudinary.uploader.destroy(
                `_Circle/_Users/_BannerProfiles/${img}`
              );
            }
          }
          bannerProfileSrc = null;
        }
      }

      // CHANGE PROFILE PHOTO
      if (
        !Object.is(photoProfileSrc, null) &&
        typeof photoProfileSrc !== "string"
      ) {
        if (Object.is(user?.photo_profile, null)) {
          const b64 = Buffer.from(photoProfileSrc?.buffer).toString("base64");
          const dataURI = `data:${photoProfileSrc?.mimetype};base64,${b64}`;
          await cloudinary.uploader
            .upload(dataURI, {
              folder: `_Circle/_Users/_PhotoProfiles/`,
              resource_type: "auto",
            })
            .then((res) => (photoProfileSrc = res.url));
        }

        if (typeof user?.photo_profile === "string") {
          const img = getCloudinaryImageName(user?.photo_profile as string);

          if (img !== "vfygy9mtsax2i7zehkyl") {
            await cloudinary.uploader.destroy(
              `_Circle/_Users/_PhotoProfiles/${img}`
            );
          }
          const b64 = Buffer.from(photoProfileSrc?.buffer).toString("base64");
          const dataURI = `data:${photoProfileSrc?.mimetype};base64,${b64}`;
          await cloudinary.uploader
            .upload(dataURI, {
              folder: `_Circle/_Users/_PhotoProfiles/`,
              resource_type: "auto",
            })
            .then((res) => (photoProfileSrc = res.url));
        }
      }

      if (
        !Object.is(bannerProfileSrc, null) &&
        typeof bannerProfileSrc !== "string"
      ) {
        if (Object.is(user?.banner_profile, null)) {
          const b64 = Buffer.from(bannerProfileSrc?.buffer).toString("base64");
          const dataURI = `data:${bannerProfileSrc?.mimetype};base64,${b64}`;
          await cloudinary.uploader
            .upload(dataURI, {
              folder: `_Circle/_Users/_BannerProfiles/`,
              resource_type: "auto",
            })
            .then((res) => (bannerProfileSrc = res.url));
        }
        if (typeof user?.banner_profile === "string") {
          const img = getCloudinaryImageName(user?.banner_profile as string);
          if (img !== "j19x3xnfap1pt6wbwrfc") {
            await cloudinary.uploader.destroy(
              `_Circle/_Users/_BannerProfiles/${img}`
            );
          }
          const b64 = Buffer.from(bannerProfileSrc?.buffer).toString("base64");
          const dataURI = `data:${bannerProfileSrc?.mimetype};base64,${b64}`;
          await cloudinary.uploader
            .upload(dataURI, {
              folder: `_Circle/_Users/_BannerProfiles/`,
              resource_type: "auto",
            })
            .then((res) => (bannerProfileSrc = res.url));
        }
      }

      const newUser = {
        id: userId,
        full_name,
        username,
        bio,
        photo_profile: photoProfileSrc,
        banner_profile: bannerProfileSrc,
      };

      //  @ts-ignore
      const editedUser = UserRepository.create(newUser);

      return await UserRepository.save(editedUser)
        .then(() => res.status(200).json({ message: "Success update user!" }))
        .catch((error) =>
          res
            .status(500)
            .json({ message: "Something error on the server!", error })
        );
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error on the server!", error });
    }
  }

  async updateEmail(req: RequestWithUserId, res: Response) {
    try {
      const userId = req.userId;
      const { email } = req.body;

      const newUser = {
        id: userId,
        email,
      };

      const editedUser = UserRepository.create(newUser);

      return await UserRepository.save(editedUser).then(() =>
        res.status(200).json({ message: "Successfully edit profile!" })
      );
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error on the server!", error });
    }
  }

  async updatePassword(req: RequestWithUserId, res: Response) {
    try {
      const userId = req.userId;
      const { newPassword, oldPassword } = req.body;

      const user = await UserRepository.findOne({
        where: { id: userId },
        select: { password: true },
      });

      const isValidatePassword = await bcrypt.compare(
        oldPassword,
        user?.password!
      );

      if (!isValidatePassword)
        return res
          .status(401)
          .json({ status: "Failed", message: "Invalid credentials" });

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const newUser = UserRepository.create({
        id: userId,
        password: hashedPassword,
      });

      return await UserRepository.save(newUser).then(() =>
        res.status(200).json({ message: "Successfully edit profile!" })
      );
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error on the server!", error });
    }
  }
}
export default new UserServices();
