import { Request, Response } from "express";
import ReplyServices from "../services/Reply.service";

class ReplyController {
  create(req: Request, res: Response) {
    ReplyServices.create(req, res);
  }
  findAll(req: Request, res: Response) {
    ReplyServices.findAll(req, res);
  }
  findByThreadId(req: Request, res: Response) {
    ReplyServices.findByThreadId(req, res);
  }
}

export default new ReplyController();
