import { Request, Response } from "express";
import ThreadService from "../services/Thread.service";

class ThreadControllers {
  create(req: Request, res: Response) {
    ThreadService.create(req, res);
  }
  findAll(req: Request, res: Response) {
    ThreadService.findAll(req, res);
  }
  findAllWithLimit(req: Request, res: Response) {
    ThreadService.findAllWithLimit(req, res);
  }
  findWithId(req: Request, res: Response) {
    ThreadService.findWithId(req, res);
  }
  delete(req: Request, res: Response) {
    ThreadService.delete(req, res);
  }
}

export default new ThreadControllers();
