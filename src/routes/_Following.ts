import express from "express";
import FollowingController from "../controllers/Following.controller";

const followingRoutes = express.Router();

// CREATE
followingRoutes.post("/following", FollowingController.create);

export default followingRoutes;
