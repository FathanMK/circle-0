import { Request, Response } from "express";
import getCloudinaryImageName from "../utils/getCloudinaryImageName";
import ThreadSchema from "../validator/Thread.validate";
import { ThreadRepository, UserRepository } from "../repositories";
import cloudinary from "../config/cloudinary";
import type { RequestWithUserId } from "../interface/RequestWithUserId";

class ThreadServices {
  async create(req: RequestWithUserId, res: Response): Promise<Response> {
    try {
      // GET INFORMATION
      const data = req.body;
      const userId = req.userId;
      const file = req.file;
      let imageSrc;

      // JOI VALIDATION
      const { error } = ThreadSchema.validate(data);

      if (error)
        return res
          .status(422)
          .json({ status: "Failed", message: "Input is invalid!" });

      // Image
      if (file) {
        const b64 = Buffer.from(file?.buffer).toString("base64");
        const dataURI = `data:${file.mimetype};base64,${b64}`;
        await cloudinary.uploader
          .upload(dataURI, {
            folder: `_Circle/_Threads/`,
            resource_type: "auto",
          })
          .then((res) => (imageSrc = res.url))
          .catch((error) => {
            return res.status(500).json({ message: error });
          });
      }

      // GET USER WHO THREAD BELONGS TO
      const user = await UserRepository.findOneBy({
        id: userId,
      });

      const newThread: any = {
        content: data.content,
        image: imageSrc,
      };

      // CREATE THREAD
      const thread = ThreadRepository.create({
        ...newThread,
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

  async findAll(req: Request, res: Response): Promise<Response> {
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

  async findWithId(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const thread = await ThreadRepository.findOne({
        where: { id },
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
        relations: { replies: true, likes: true, user: true },
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

  async findAllWithLimit(req: Request, res: Response): Promise<Response> {
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
          user: true,
          likes: {
            user: true,
          },
          replies: {
            user: true,
          },
        },
        order: {
          created_at: "DESC",
        },
      });

      return res.status(200).json({ status: "Success", threads });
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
}

export default new ThreadServices();
