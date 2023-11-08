import { Request, Response } from "express";
import getCloudinaryImageName from "../utils/getCloudinaryImageName";
import { ThreadRepository, UserRepository } from "../repositories";
import cloudinary from "../config/cloudinary";
import { RequestWithUserId } from "../interface/RequestWithUserId";

class ThreadServices {
  async findWithId(req: Request, res: Response): Promise<Response> {
    try {
      const { threadId } = req.params;

      const thread = await ThreadRepository.findOne({
        where: { id: threadId },
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
          likes: {
            id: true,
            user: {
              id: true,
            },
          },
          replies: {
            id: true,
            user: {
              id: true,
            },
          },
        },
        relations: {
          likes: {
            user: true,
          },
          replies: {
            user: true,
          },
          user: true,
        },
      });

      if (!thread)
        return res
          .status(404)
          .json({ status: "Failed", message: "Thread didn't exist!" });

      return res.status(200).json({
        status: "Success",
        thread,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error on the server!", error });
    }
  }

  async findAllWithLimit(
    req: RequestWithUserId,
    res: Response
  ): Promise<Response> {
    try {
      const { limit } = req.query;
      const userId = req.userId;
      if (!limit)
        return res
          .status(400)
          .json({ status: "Failed", message: "Didn't provide limit query!" });

      const user = await UserRepository.findOne({
        where: { id: userId },
        select: {
          following: { id: true, following: { id: true } },
        },
        relations: {
          following: { following: true },
        },
      });

      // @ts-ignore
      const followingUsersId = user?.following.map((item) => item.following.id);

      // @ts-ignore
      const usersId = [...followingUsersId, userId];

      const threads = await ThreadRepository.createQueryBuilder()
        .take(Number(limit))
        .leftJoinAndSelect("Thread.user", "User")
        .leftJoinAndSelect("Thread.likes", "Like")
        .leftJoinAndSelect("Thread.replies", "Reply")
        .leftJoinAndSelect("Reply.user", "ReplyUser")
        .leftJoinAndSelect("Like.user", "LikeUser")
        .where("User.id IN (:...usersId)", {
          usersId,
        })
        .orderBy("Thread.created_at", "DESC")
        .getMany();

      return res.status(200).json({ status: "Success", threads });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error on the server!", error });
    }
  }

  async update(req: RequestWithUserId, res: Response): Promise<Response> {
    try {
      const { threadId } = req.params;
      const { content } = req.body;
      const file = req.file;
      const userId = req.userId;
      let imageSrc;

      const thread = await ThreadRepository.findOne({
        where: { id: threadId },
        select: {
          content: true,
          image: true,
        },
      });

      if (!thread) {
        return res
          .status(404)
          .json({ status: "Failed", message: "Thread didn't exist!" });
      }

      if (file) {
        const img = getCloudinaryImageName(thread.image);

        await cloudinary.uploader
          .destroy(`_Circle/_Threads/${img}`)
          .catch((error) => res.status(500).json({ message: error }));

        const b64 = Buffer.from(file?.buffer).toString("base64");
        const dataURI = `data:${file.mimetype};base64,${b64}`;
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

      const newThread: any = {
        content,
        image: imageSrc,
      };

      // CREATE THREAD
      const editedThread = ThreadRepository.create({
        ...newThread,
        id: threadId,
        user,
      });

      return await ThreadRepository.save(editedThread)
        .then(() => res.status(200).json({ message: "Successfully edited" }))
        .catch((error) =>
          res
            .status(500)
            .json({ message: "Something error while editing", error })
        );
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error on the server!", error });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const thread = await ThreadRepository.findOne({
        where: { id },
        relations: { replies: true, likes: true },
      });

      if (!thread) {
        return res
          .status(404)
          .json({ status: "Failed", message: "Thread didn't exist!" });
      }

      if (thread.image) {
        const img = getCloudinaryImageName(thread.image);

        await cloudinary.uploader
          .destroy(`_Circle/_Threads/${img}`)
          .catch((error) => res.status(500).json({ message: error }));
      }

      return await ThreadRepository.delete(id)
        .then(() =>
          res.status(200).json({
            status: "Success",
            message: `Thread with id ${id} is successfully deleted!`,
          })
        )
        .catch((error) => res.status(500).json({ message: error }));
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error on the server!", error });
    }
  }

  async findThreadsByUserId(req: RequestWithUserId, res: Response) {
    try {
      const userId = req.userId;
      const threads = await ThreadRepository.createQueryBuilder()
        .leftJoinAndSelect("Thread.user", "User")
        .leftJoinAndSelect("Thread.likes", "Like")
        .leftJoinAndSelect("Thread.replies", "Reply")
        .leftJoinAndSelect("Reply.user", "ReplyUser")
        .leftJoinAndSelect("Like.user", "LikeUser")
        .where("User.id = :userId", { userId })
        .orderBy("Thread.created_at", "DESC")
        .getMany();

      return res.status(200).json({ message: "Successfully", threads });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error on the server!", error });
    }
  }
}

export default new ThreadServices();
