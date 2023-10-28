import { Request, Response } from "express";
import {
  ReplyRepository,
  ThreadRepository,
  UserRepository,
} from "../repositories";

class ReplyServices {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;

      const user = await UserRepository.findOneBy({
        id: data.userId,
      });
      const thread = await ThreadRepository.findOneBy({
        id: data.threadId,
      });

      const reply = ReplyRepository.create({ ...data, user, thread });

      return await ReplyRepository.save(reply)
        .then(() =>
          res
            .status(200)
            .json({ status: "Success", message: "Reply is created!" })
        )
        .catch((error) =>
          res.status(500).json({ status: "Failed", message: error })
        );
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
}

export default new ReplyServices();
