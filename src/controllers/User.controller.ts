import { Request, Response } from "express";
import UserService from "../services/User.service";

class UserController {
  // REGISTER
  register(req: Request, res: Response) {
    UserService.register(req, res);
  }
  // LOGIN
  login(req: Request, res: Response) {
    UserService.login(req, res);
  }
  findById(req: Request, res: Response) {
    UserService.findById(req, res);
  }
}

export default new UserController();
