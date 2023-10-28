import express from "express";
import LikeController from "../controllers/Like.controller";

const likeRoutes = express.Router();

// CREATE
likeRoutes.post("/like", LikeController.create);

// FIND LIKES BY THREAD ID
likeRoutes.get("/like/:threadId", LikeController.findByThreadId);

likeRoutes.post("/liketest", LikeController.deleteLike);

export default likeRoutes;
