import { Request, Response } from "express";
import ThreadService from "../services/Thread.service";
import ThreadQueue from "../queues/Thread.queue";

class ThreadControllers {
  create(req: Request, res: Response) {
    ThreadQueue.create(req, res);
  }
  findAllWithLimit(req: Request, res: Response) {
    ThreadService.findAllWithLimit(req, res);
  }
  findWithId(req: Request, res: Response) {
    ThreadService.findWithId(req, res);
  }
  findByThreadsByUserId(req: Request, res: Response) {
    ThreadService.findThreadsByUserId(req, res);
  }
  delete(req: Request, res: Response) {
    ThreadQueue.delete(req, res);
  }
  update(req: Request, res: Response) {
    ThreadQueue.update(req, res);
  }
}

export default new ThreadControllers();
