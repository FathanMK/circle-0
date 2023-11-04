import { Request, Response } from "express";
import { FollowingRepository, UserRepository } from "../repositories";
import { RequestWithUserId } from "../interface/RequestWithUserId";

class FollowingServices {
  async create(req: RequestWithUserId, res: Response): Promise<Response> {
    try {
      let empty: any;
      const userId = req.userId;
      const { followingId } = req.body;

      const following = await UserRepository.findOneBy({
        id: followingId,
      });

      const follower = await UserRepository.findOneBy({
        id: userId,
      });

      const newFollow = FollowingRepository.create({
        followers: follower,
        following: following,
        ...empty,
      });

      return await FollowingRepository.save(newFollow)
        .then(() =>
          res.status(200).json({ message: "Sucessfully following someone!" })
        )
        .catch((error) =>
          res.status(500).json({
            message: "Something wrong while following someone!",
            error,
          })
        );
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error on the server!", error });
    }
  }

  async getFollowingByUserId(req: RequestWithUserId, res: Response) {
    try {
      const userId = req.userId;
      const followings = await UserRepository.find({
        where: { id: userId },
        select: {
          following: { id: true, following: true },
          followers: { id: true, followers: true },
        },
        relations: {
          followers: { followers: true },
          following: {
            following: true,
          },
        },
      });

      return res.status(200).json({ message: "pew", followings });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error on the server!", error });
    }
  }

  async deleteFollow(req: RequestWithUserId, res: Response) {
    try {
      const { followingId } = req.body;
      const userId = req.userId;
      const followingData = await UserRepository.findOne({
        where: { id: userId },
        select: {
          following: { id: true, following: { id: true } },
        },
        relations: {
          following: {
            following: true,
          },
        },
      });

      const followings = followingData?.following;
      const following = followings?.find(
        (item: any) => item.following.id === followingId
      );

      return await FollowingRepository.delete(following?.id as string).then(
        () => res.status(200).json({ message: "Successfully deleted follow" })
      );
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error on the server!", error });
    }
  }
}

export default new FollowingServices();
