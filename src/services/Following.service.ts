import { Request, Response } from "express";
import { FollowingRepository, UserRepository } from "../repositories";

class FollowingServices {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const following = await UserRepository.findOneBy({
        id: "7e4d2c4e-99be-44f8-8d64-1389cb797456",
      });
      const followers = await UserRepository.findOneBy({
        id: "7e4d2c4e-99be-44f8-8d64-1389cb797456",
      });

      const followingColumn = FollowingRepository.create({
        ...data,
        following,
        followers,
      });

      return await FollowingRepository.save(followingColumn)
        .then(() =>
          res
            .status(200)
            .json({
              status: "Success",
              message: "Successfully saved following!",
            })
        )
        .catch((error) =>
          res.status(500).json({
            status: "Failed",
            message: "Something error while creating following!",
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

export default new FollowingServices();
