import express from "express";
import UserController from "../controllers/User.controller";

const userRoutes = express.Router();

// CREATE
userRoutes.post("/register", UserController.create);

export default userRoutes;
