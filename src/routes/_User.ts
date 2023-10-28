import express from "express";
import UserController from "../controllers/User.controller";
import verifyToken from "../middlewares/verifyToken";

const userRoutes = express.Router();

// CREATE OR REGISTER
userRoutes.post("/register", UserController.register);

// FIND OR LOGIN
userRoutes.post("/login", UserController.login);

// GET USER WITH VERIFY TOKEN MIDDLEWARE
userRoutes.get("/user", verifyToken, UserController.findById);

export default userRoutes;
