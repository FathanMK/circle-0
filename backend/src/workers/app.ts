import AppDataSource from "../config/data-source";
import amqp from "amqplib";
import "dotenv/config";
import ThreadWorker from "./Thread.worker";
import ReplyWorker from "./Reply.worker";

class WorkerHub {
  constructor() {
    AppDataSource.initialize()
      .then(async () => {
        const connection = await amqp.connect(
          process.env.RABBIT_PORT as string
        );

        const createThreadResponse = await ThreadWorker.create(
          "Create-Thread",
          connection
        );
        console.log(createThreadResponse);

        const updateThreadResponse = await ThreadWorker.update(
          "Update-Thread",
          connection
        );
        console.log(updateThreadResponse);

        const deleteThreaadResponse = await ThreadWorker.delete(
          "Delete-Thread",
          connection
        );
        console.log(deleteThreaadResponse);

        const updateReplyResponse = await ReplyWorker.update(
          "Update-Reply",
          connection
        );
        console.log(updateReplyResponse);
      })
      .catch((error) => console.log(error));
  }
}

export default new WorkerHub();
