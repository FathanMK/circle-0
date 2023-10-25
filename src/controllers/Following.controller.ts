import { Request, Response } from "express";
import FollowingService from "../services/Following.service";

class FollowingController {
  create(req: Request, res: Response) {
    FollowingService.create(req, res);
  }
}

export default new FollowingController();
