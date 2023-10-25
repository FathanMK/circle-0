import { Request, Response } from "express";
import LikeService from "../services/Like.service";

class LikeController {
  create(req: Request, res: Response) {
    LikeService.create(req, res);
  }
  findByThreadId(req: Request, res: Response) {
    LikeService.findByThreadId(req, res);
  }
}

export default new LikeController();
