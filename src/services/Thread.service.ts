import { Request, Response } from "express";
import ThreadSchema from "../validator/Thread.validate";
import { ThreadRepository, UserRepository } from "../repositories";

class ThreadServices {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      // GET INFORMATION
      const data = req.body;

      // JOI VALIDATION
      const { error, value } = ThreadSchema.validate(data);

      if (error)
        return res
          .status(422)
          .json({ status: "Failed", message: "Input is invalid!" });

      // GET USER WHO THREAD BELONGS TO, eg: 0 --- TODO: PROBABLY USING JWT TOKEN FOR ID
      const user = await UserRepository.findOneBy({
        id: "7e4d2c4e-99be-44f8-8d64-1389cb797456",
      });

      // CREATE THREAD
      const thread = ThreadRepository.create({
        ...value,
        user,
      });

      // SAVE THEN RETURN
      return await ThreadRepository.save(thread)
        .then(() =>
          res.status(201).json({
            status: "Success",
            message: "Thread is successfully created!",
          })
        )
        .catch(() =>
          res.status(418).json({
            status: "Failed",
            message: "Something wrong while creating Thread!",
          })
        );
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error on the server!", error });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      // GET ALL THREADS
      const threads = await ThreadRepository.find({
        select: {
          id: true,
          content: true,
          image: true,
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

      // BIT OF VALIDATION
      if (threads.length === 0)
        return res.status(401).json({
          status: "Failed",
          message: "Threads didn't found, create atleast one thread!",
          threads,
        });

      return res.status(200).json({ status: "Success", threads });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error on the server!", error });
    }
  }

  async findWithId(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const thread = await ThreadRepository.findOne({
        where: { id },
        relations: { replies: true, user: true },
      });

      if (!thread)
        return res
          .status(404)
          .json({ status: "Failed", message: "Thread didn't exist!" });

      return res.status(200).json({
        status: "Success",
        message: "Thread is successfully returned!",
        data: thread,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error on the server!", error });
    }
  }

  async findAllWithLimit(req: Request, res: Response) {
    try {
      const { limit } = req.query;

      if (!limit)
        return res
          .status(400)
          .json({ status: "Failed", message: "Didn't provide limit query!" });

      const threads = await ThreadRepository.find({
        take: Number(limit),
        select: {
          id: true,
          content: true,
          image: true,
          posted_at: true,
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

      return res.status(200).json({ status: "Success", threads });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error on the server!", error });
    }
  }
}

export default new ThreadServices();
