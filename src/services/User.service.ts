import { Request, Response } from "express";
import { UserRepository } from "../repositories";
import bcrypt from "bcrypt";

class UserServices {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      // GET INFORMATION
      const { full_name, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const data = {
        username: full_name.toLowerCase().replace(" ", "_"),
        full_name,
        email,
        bio: "Little bit empty here",
        password: hashedPassword,
      };

      // // CREATE USER
      // const user = this.UserRepository.create(data);

      // // SAVE THEN RETURN
      // return await this.UserRepository.save(user)
      //   .then(() =>
      //     res.status(201).json({
      //       status: "Success",
      //       message: "User is successfully registered!",
      //     })
      //   )
      //   .catch(() =>
      //     res.status(418).json({
      //       status: "Failed",
      //       message: "Something wrong while creating User!",
      //     })
      //   );
      return res.status(200).json({ message: "pew" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something error on the server!", error });
    }
  }
}
export default new UserServices();
