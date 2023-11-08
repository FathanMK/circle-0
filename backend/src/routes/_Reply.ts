import express from "express";
import ReplyController from "../controllers/Reply.controller";
import verifyToken from "../middlewares/verifyToken";
import upload from "../config/upload-multer";

const replyRoutes = express.Router();

// CREATE
replyRoutes.post(
  "/reply/:threadId",
  [upload.single("image"), verifyToken],
  ReplyController.create
);

// FIND REPLIES BY THREAD ID
replyRoutes.get("/replies/:threadId", ReplyController.findByThreadId);

// FIND ALL
replyRoutes.get("/replies", ReplyController.findAll);

replyRoutes.get("/reply/:replyId", ReplyController.findWithId);

// DELETE THREAD BY ID
replyRoutes.put(
  "/reply/:replyId",
  [upload.single("image"), verifyToken],
  ReplyController.update
);

// DELETE THREAD BY ID
replyRoutes.delete("/reply/:replyId", verifyToken, ReplyController.delete);

export default replyRoutes;
