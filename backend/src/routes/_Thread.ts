import express from "express";
import ThreadController from "../controllers/Thread.controller";
import upload from "../config/upload-multer";
import verifyToken from "../middlewares/verifyToken";

const threadRoutes = express.Router();

// CREATE
threadRoutes.post(
  "/thread",
  [upload.single("image"), verifyToken],
  ThreadController.create
);

// FIND BY ID
threadRoutes.get("/thread/:threadId", ThreadController.findWithId);

// FIND ALL WITH LIMIT 25
threadRoutes.get("/threads", verifyToken, ThreadController.findAllWithLimit);

// FIND ALL THREAD CREATED BY ID
threadRoutes.get("/threadsById", verifyToken, ThreadController.findByThreadsByUserId);

// UPDATE BY ID
threadRoutes.put(
  "/thread/:id",
  [upload.single("image"), verifyToken],
  ThreadController.update
);

// DELETE THREAD BY ID
threadRoutes.delete("/thread/:threadId", verifyToken, ThreadController.delete);

export default threadRoutes;
