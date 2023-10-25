import express from "express";
import ThreadController from "../controllers/Thread.controller";

const threadRoutes = express.Router();

// CREATE
threadRoutes.post("/thread", ThreadController.create);

// FIND BY ID
threadRoutes.get("/thread/:id", ThreadController.findWithId);

// FIND ALL
threadRoutes.get("/threads", ThreadController.findAllWithLimit);

export default threadRoutes;
