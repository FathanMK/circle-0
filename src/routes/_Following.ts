import express from "express";
import FollowingController from "../controllers/Following.controller";
import verifyToken from "../middlewares/verifyToken";

const followingRoutes = express.Router();

// CREATE
followingRoutes.post("/following", verifyToken, FollowingController.create);

// GET FOLLOWINGS
followingRoutes.get(
  "/followings",
  verifyToken,
  FollowingController.getFollowingByUserId
);

// DELETE FOLLOWING
followingRoutes.post(
  "/deleteFollow",
  verifyToken,
  FollowingController.deleteFollow
);

export default followingRoutes;
