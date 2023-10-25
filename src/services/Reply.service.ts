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
        id: "7e4d2c4e-99be-44f8-8d64-1389cb797456",
      });
      const thread = await ThreadRepository.findOneBy({
        id: "788b76aa-07b7-49ee-a92a-ae5df634b7aa",
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
        relations: {
          thread: true,
          user: true,
        },
      });

      return res.status(200).json({
        status: "Success",
        message: "Likes by thread is successfully returned!",
        replies: replies,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error on the server!", error });
    }
  }
}

export default new ReplyServices();
