import { Request, Response } from "express";
import FollowingService from "../services/Following.service";

class FollowingController {
  create(req: Request, res: Response) {
    FollowingService.create(req, res);
  }
  getFollowingByUserId(req: Request, res: Response) {
    FollowingService.getFollowingByUserId(req, res);
  }
  deleteFollow(req: Request, res: Response) {
    FollowingService.deleteFollow(req, res);
  }
}

export default new FollowingController();
