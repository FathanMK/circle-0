import express from "express";

const notificationRoutes = express.Router();

notificationRoutes.get(
  "/notifications",
  (req: express.Request, res: express.Response) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    res.write("Event: Message\n");
    function sendNotification(data: any) {
      res.write("Data:" + data + "\n\n");
    }

    notificationRoutes.get("/new-thread", (req, res) => {
      const data = JSON.stringify({ data: "Thread Created!" });
      sendNotification(data);

      res.sendStatus(200);
    });
  }
);

export default notificationRoutes;
