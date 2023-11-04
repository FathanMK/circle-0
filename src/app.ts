import express from "express";
import cors from "cors";
import amqp from "amqplib";

import AppDataSource from "./config/data-source";
import { ReplyRoutes, ThreadRoutes, UserRoutes } from "./routes";
import likeRoutes from "./routes/_Like";
import followingRoutes from "./routes/_Following";
import ThreadWorker from "./workers/Thread.worker";

import "dotenv/config";
import notificationRoutes from "./routes/_Notifications";

AppDataSource.initialize()
  .then(() => {
    const app = express();
    const PORT = 5000;

    app.use(express.json());
    app.use(cors());

    app.use("/api/v1", followingRoutes);
    app.use("/api/v1", ThreadRoutes);
    app.use("/api/v1", UserRoutes);
    app.use("/api/v1", ReplyRoutes);
    app.use("/api/v1", likeRoutes);
    app.use("/api/v1", notificationRoutes);

    app.listen(PORT, () => console.log("Server Running on PORT: " + PORT));
  })
  .catch((error) => console.log(error));
