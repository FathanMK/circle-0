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

  // FIND THE THREAD ID, LENGTH = HOW MANY LIKES, CHECK IF USER ALREADY LIKED BY ID !
  async findByThreadId(req: Request, res: Response) {
    try {
      const { threadId } = req.params;

      const threadLikes = await LikeRepository.find({
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
        message: "Likes by thread is successfully returned!",
        likes: threadLikes,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error on the server!", error });
    }
  }
}

export default new LikeServices();
