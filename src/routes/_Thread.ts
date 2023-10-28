import express from "express";
import ThreadController from "../controllers/Thread.controller";
import upload from "../config/upload-multer";
import verifyToken from "../middlewares/verifyToken";

const threadRoutes = express.Router();

// CREATE
threadRoutes.post("/thread", upload.single("image"), ThreadController.create);

// FIND BY ID
threadRoutes.get("/thread/:id", ThreadController.findWithId);

// FIND ALL
threadRoutes.get("/threads", ThreadController.findAllWithLimit);

threadRoutes.delete("/thread/:id", ThreadController.delete);

export default threadRoutes;
