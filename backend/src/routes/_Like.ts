import express from "express";
import LikeController from "../controllers/Like.controller";
import verifyToken from "../middlewares/verifyToken";

const likeRoutes = express.Router();

// CREATE
likeRoutes.post("/like", verifyToken, LikeController.create);

// FIND LIKES BY THREAD ID
likeRoutes.get("/like/:threadId", LikeController.findByThreadId);

likeRoutes.post("/delete-like", verifyToken, LikeController.deleteLike);

export default likeRoutes;
