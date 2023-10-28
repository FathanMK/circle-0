import { Request, Response } from "express";
import {
  LikeRepository,
  ThreadRepository,
  UserRepository,
} from "../repositories";

class LikeServices {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      let empty: any;
      const { userId, threadId } = req.body;
      const user = await UserRepository.findOneBy({
        id: userId,
      });
      const thread = await ThreadRepository.findOneBy({
        id: threadId,
      });

      const like = LikeRepository.create({ ...empty, user, thread });

      return await LikeRepository.save(like)
        .then(() =>
          res
            .status(200)
            .json({ status: "Success", message: "Successfully saved like!" })
        )
        .catch((error) =>
          res.status(500).json({
            status: "Failed",
            message: "Something error while creating like!",
            error,
          })
        );
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error on the server!", error });
    }
  }

  async findByThreadId(req: Request, res: Response) {
    try {
      const { threadId } = req.params;

      const likes = await LikeRepository.find({
        where: { thread: { id: threadId } },
        relations: { user: true },
        select: {
          user: {
            id: true,
          },
        },
      });

      return res.status(200).json({
        status: "Success",
        likes,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error on the server!", error });
    }
  }

  async deleteLike(req: Request, res: Response) {
    try {
      const data = req.body;
      const user = await UserRepository.findOne({
        where: { id: data.userId },
        select: { likes: { id: true, thread: { id: true } } },
        relations: { likes: { thread: true } },
      });

      const likeId = user?.likes.filter(
        (like) => like.thread.id === data.threadId
      )[0].id;

      await LikeRepository.delete(likeId as string)
        .then(() =>
          res.status(200).json({
            status: "Success",
            message: `Like with ID: ${likeId} is successfully deleted!`,
          })
        )
        .catch((error) =>
          res.status(500).json({
            status: "Failed",
            message: "Something wrong while deleting like!",
            error,
          })
        );
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error on the server!", error });
    }
  }
}

export default new LikeServices();
