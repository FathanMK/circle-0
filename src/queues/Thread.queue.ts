import { Response } from "express";
import { ThreadRepository } from "../repositories";
import ThreadSchema from "../validator/Thread.validate";
import type { RequestWithUserId } from "../interface/RequestWithUserId";
import MessageQueue from "../config/rabbitmq";

class ThreadQueue {
  async create(req: RequestWithUserId, res: Response) {
    try {
      const { content } = req.body;
      const userId = req.userId;
      const file = req.file;

      // JOI VALIDATION
      const { error } = ThreadSchema.validate({ content });

      if (error)
        return res
          .status(422)
          .json({ status: "Failed", message: "Input is invalid!" });

      const payload = {
        content,
        image: file!,
        userId: userId!,
      };

      const errorQueue = await MessageQueue.MessageSend(
        "Create-Thread",
        payload
      );

      if (errorQueue)
        return res
          .status(500)
          .json({ message: "Something error while sending message queue!" });

      return res.status(201).json({
        message: "Creating Thread is queued!",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error in Thread Queue method!" });
    }
  }

  async update(req: RequestWithUserId, res: Response) {
    try {
      const { id: threadId } = req.params;
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

      const payload = {
        content,
        image: imageSrc,
        userId,
        threadId,
        thread,
      };

      const errorQueue = await MessageQueue.MessageSend(
        "Update-Thread",
        payload
      );

      if (errorQueue)
        return res
          .status(500)
          .json({ message: "Something error while sending message queue!" });

      return res.status(201).json({
        message: "Editing Thread is queued!",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error in Thread Queue method!" });
    }
  }

  async delete(req: RequestWithUserId, res: Response) {
    try {
      const { threadId } = req.params;

      const thread = await ThreadRepository.findOne({
        where: { id: threadId },
        relations: { replies: true, likes: true },
      });

      if (!thread) {
        return res
          .status(404)
          .json({ status: "Failed", message: "Thread didn't exist!" });
      }

      const errorQueue = await MessageQueue.MessageSend("Delete-Thread", {
        threadId,
        thread,
      });

      if (errorQueue)
        return res
          .status(500)
          .json({ message: "Something error while sending message queue!" });

      return res.status(201).json({
        message: "Editing Thread is queued!",
      });
    } catch (error) {}
  }
}

export default new ThreadQueue();
