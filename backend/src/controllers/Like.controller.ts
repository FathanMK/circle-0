import { Request, Response } from "express";
import LikeService from "../services/Like.service";

class LikeController {
  create(req: Request, res: Response) {
    LikeService.create(req, res);
  }
  findByThreadId(req: Request, res: Response) {
    LikeService.findByThreadId(req, res);
  }
  deleteLike(req: Request, res: Response) {
    LikeService.deleteLike(req, res);
  }
}

export default new LikeController();
