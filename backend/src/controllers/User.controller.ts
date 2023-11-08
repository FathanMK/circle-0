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
  findSuggested(req: Request, res: Response) {
    UserService.findSuggested(req, res);
  }
  findUserByKeyword(req: Request, res: Response) {
    UserService.findUserByKeyword(req, res);
  }
  updateProfile(req: Request, res: Response) {
    UserService.updateProfile(req, res);
  }
  updateEmail(req: Request, res: Response) {
    UserService.updateEmail(req, res);
  }
  updatePassword(req: Request, res: Response) {
    UserService.updatePassword(req, res);
  }
}

export default new UserController();
