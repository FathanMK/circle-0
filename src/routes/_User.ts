import express from "express";
import UserController from "../controllers/User.controller";
import verifyToken from "../middlewares/verifyToken";
import upload from "../config/upload-multer";

const userRoutes = express.Router();

// CREATE OR REGISTER
userRoutes.post("/register", UserController.register);

// FIND OR LOGIN
userRoutes.post("/login", UserController.login);

// GET USER WITH VERIFY TOKEN MIDDLEWARE
userRoutes.get("/user", verifyToken, UserController.findById);

// GET USER BY KEYWORDS
userRoutes.get("/searchUser", verifyToken, UserController.findUserByKeyword);

// UPDATE PROFILE USER
userRoutes.put(
  "/updateProfileUser",
  [
    verifyToken,
    upload.fields([{ name: "photo_profile" }, { name: "banner_profile" }]),
  ],
  UserController.updateProfile
);

// UPDATE EMAIL USER
userRoutes.put("/updateEmailUser", verifyToken, UserController.updateEmail);

// UPDATE USER PASSWORD
userRoutes.put(
  "/updatePasswordUser",
  verifyToken,
  UserController.updatePassword
);

// GET SUGGESTED USER
userRoutes.get("/suggestedUser", verifyToken, UserController.findSuggested);

export default userRoutes;
