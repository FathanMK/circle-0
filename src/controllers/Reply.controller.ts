import { Request, Response } from "express";
import ReplyServices from "../services/Reply.service";
import ReplyQueue from "../queues/Reply.queue";

class ReplyController {
  create(req: Request, res: Response) {
    ReplyServices.create(req, res);
  }
  findWithId(req: Request, res: Response) {
    ReplyServices.findWithId(req, res);
  }
  findAll(req: Request, res: Response) {
    ReplyServices.findAll(req, res);
  }
  findByThreadId(req: Request, res: Response) {
    ReplyServices.findByThreadId(req, res);
  }
  delete(req: Request, res: Response) {
    ReplyServices.delete(req, res);
  }
  update(req: Request, res: Response) {
    ReplyQueue.update(req, res);
  }
}

export default new ReplyController();
