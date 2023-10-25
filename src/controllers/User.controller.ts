import { Request, Response } from "express";
import UserService from "../services/User.service";

class UserController {
  create(req: Request, res: Response) {
    UserService.create(req, res);
  }
}

export default new UserController();
