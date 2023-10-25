import express from "express";
import ReplyController from "../controllers/Reply.controller";

const replyRoutes = express.Router();

// CREATE
replyRoutes.post("/reply", ReplyController.create);

// FIND REPLIES BY THREAD ID
replyRoutes.get("/reply/:threadId", ReplyController.findByThreadId);

// FIND ALL
replyRoutes.get("/replies", ReplyController.findAll);

export default replyRoutes;
