import { Request, Response } from "express";
import {
  ReplyRepository,
  ThreadRepository,
  UserRepository,
} from "../repositories";
import { RequestWithUserId } from "../interface/RequestWithUserId";
import cloudinary from "../config/cloudinary";
import getCloudinaryImageName from "../utils/getCloudinaryImageName";

class ReplyServices {
  async create(req: RequestWithUserId, res: Response): Promise<Response> {
    try {
      const userId = req.userId;
      const { threadId } = req.params;
      const data = req.body;
      const file = req.file;
      let imageSrc;

      if (file) {
        const b64 = Buffer.from(file?.buffer).toString("base64");
        const dataURI = `data:${file.mimetype};base64,${b64}`;
        await cloudinary.uploader
          .upload(dataURI, {
            folder: `_Circle/_Replies/`,
            resource_type: "auto",
          })
          .then((res) => (imageSrc = res.url))
          .catch((error) => {
            return res.status(500).json({ message: error });
          });
      }

      const user = await UserRepository.findOneBy({
        id: userId,
      });
      const thread = await ThreadRepository.findOneBy({
        id: threadId,
      });

      const newReply: any = {
        content: data.content,
        image: imageSrc,
      };

      const reply = ReplyRepository.create({ ...newReply, user, thread });

      return await ReplyRepository.save(reply)
        .then(() =>
          res
            .status(200)
            .json({ status: "Success", message: "Reply is created!" })
        )
        .catch((error) =>
          res.status(500).json({
            status: "Failed",
            message: "Something error while creating error!",
            error,
          })
        );
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error on the server!", error });
    }
  }
  async findWithId(req: Request, res: Response): Promise<Response> {
    try {
      const { replyId } = req.params;

      const reply = await ReplyRepository.findOne({
        where: { id: replyId },
        select: {
          id: true,
          content: true,
          image: true,
          created_at: true,
          user: {
            id: true,
            username: true,
            full_name: true,
            photo_profile: true,
          },
        },
        relations: {
          user: true,
        },
      });

      if (!reply)
        return res
          .status(404)
          .json({ status: "Failed", message: "Reply didn't exist!" });

      return res.status(200).json({
        status: "Success",
        reply,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error on the server!", error });
    }
  }
  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const replies = await ReplyRepository.find({
        relations: {
          user: true,
          thread: true,
        },
      });

      return res.status(200).json({ status: "Success", data: replies });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error on the server!", error });
    }
  }
  async findByThreadId(req: Request, res: Response): Promise<Response> {
    try {
      const { threadId } = req.params;

      const replies = await ReplyRepository.find({
        where: { thread: { id: threadId } },
        select: {
          thread: {
            id: true,
          },
          user: {
            id: true,
            full_name: true,
            username: true,
            created_at: true,
            photo_profile: true,
          },
        },
        relations: {
          thread: true,
          user: true,
        },
        order: {
          created_at: "DESC",
        },
      });

      return res.status(200).json({
        status: "Success",
        replies,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error on the server!", error });
    }
  }

  async update(req: RequestWithUserId, res: Response): Promise<Response> {
    try {
      const { replyId } = req.params;
      const { content, image } = req.body;
      const file = req.file;
      const userId = req.userId;
      let imageSrc;

      if (file) {
        imageSrc = file;
      }

      if (image !== undefined) {
        imageSrc = image;
      }

      const reply = await ReplyRepository.findOne({
        where: { id: replyId },
        select: {
          content: true,
          image: true,
        },
      });

      if (!reply) {
        return res
          .status(404)
          .json({ status: "Failed", message: "Reply didn't exist!" });
      }

      if (typeof imageSrc === "string") {
        imageSrc = image;
      }

      if (imageSrc === undefined) {
        const img = getCloudinaryImageName(reply?.image as string);
        await cloudinary.uploader.destroy(`_Circle/_Threads/${img}`);
        imageSrc = "";
      }

      if (typeof imageSrc === "object") {
        const img = getCloudinaryImageName(reply?.image as string);

        await cloudinary.uploader.destroy(`_Circle/_Replies/${img}`);

        const b64 = Buffer.from(image?.buffer).toString("base64");
        const dataURI = `data:${image.mimetype};base64,${b64}`;
        await cloudinary.uploader
          .upload(dataURI, {
            folder: `_Circle/_Threads/`,
            resource_type: "auto",
          })
          .then((res) => (imageSrc = res.url));
      }

      const user = await UserRepository.findOneBy({
        id: userId,
      });

      const newReply: any = {
        content,
        image: imageSrc,
      };

      const editedTime = new Date().toISOString();

      // // CREATE THREAD
      const editedReply = ReplyRepository.create({
        ...newReply,
        id: replyId,
        user,
        created_at: new Date(editedTime),
      });

      // return await ReplyRepository.save(editedReply)
      //   .then(() => res.status(200).json({ message: "Successfully edited" }))
      //   .catch((error) =>
      //     res
      //       .status(500)
      //       .json({ message: "Something error while editing", error })
      //   );
      return res.status(200).json({ message: "pew" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error on the server!", error });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { replyId } = req.params;

      const reply = await ReplyRepository.findOne({
        where: { id: replyId },
      });

      if (!reply) {
        return res
          .status(404)
          .json({ status: "Failed", message: "Reply didn't exist!" });
      }

      if (reply.image) {
        const img = getCloudinaryImageName(reply.image);

        await cloudinary.uploader
          .destroy(`_Circle/_Replies/${img}`)
          .catch((error) => res.status(500).json({ message: error }));
      }

      return await ReplyRepository.delete(replyId)
        .then(() =>
          res.status(200).json({
            status: "Success",
            message: `Reply with id ${replyId} is successfully deleted!`,
          })
        )
        .catch((error) => res.status(500).json({ message: error }));
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error on the server!", error });
    }
  }
}

export default new ReplyServices();
