import { EventEmitter } from "stream";
import getCloudinaryImageName from "../utils/getCloudinaryImageName";
import {
  ReplyRepository,
  ThreadRepository,
  UserRepository,
} from "../repositories";
import cloudinary from "../config/cloudinary";

class ReplyWorker {
  private emitter = new EventEmitter();

  // async create(queueName: string, connection: any) {
  //   try {
  //     const channel = await connection.createChannel();
  //     await channel.assertQueue(queueName);
  //     await channel.consume(queueName, async (message: any) => {
  //       try {
  //         const payload = JSON.parse(message.content.toString());
  //         let imageSrc;

  //         if (payload.image) {
  //           const b64 = Buffer.from(payload.image?.buffer).toString("base64");
  //           const dataURI = `data:${payload.image.mimetype};base64,${b64}`;
  //           await cloudinary.uploader
  //             .upload(dataURI, {
  //               folder: `_Circle/_Threads/`,
  //               resource_type: "auto",
  //             })
  //             .then((res) => (imageSrc = res.url));
  //         }

  //         const user = await UserRepository.findOneBy({
  //           id: payload.userId,
  //         });

  //         const newThread: any = {
  //           content: payload.content,
  //           image: imageSrc,
  //         };

  //         // CREATE THREAD
  //         const thread = ThreadRepository.create({
  //           ...newThread,
  //           user,
  //         });

  //         await ThreadRepository.save(thread);

  //         this.emitter.emit("message");
  //         console.log("(Worker) : Creating Thread!");

  //         channel.ack(message);
  //       } catch (error) {
  //         console.log("(Worker) : Creating Thread Failed!");
  //       }
  //     });
  //   } catch (error) {
  //     console.log("(WORKER): Error while consume queue from thread!");
  //   }
  // }
  async update(queueName: string, connection: any) {
    try {
      const channel = await connection.createChannel();
      await channel.assertQueue(queueName);
      await channel.consume(queueName, async (message: any) => {
        try {
          if (message !== null) {
            const payload = JSON.parse(message.content.toString());
            let imageSrc;

            if (typeof payload.image === "string") {
              if (payload.image.includes("cloudinary")) {
                imageSrc = payload.image;
              }
              if (payload.image === "null") {
                if (payload.reply?.image !== null) {
                  const img = getCloudinaryImageName(
                    payload.reply?.image as string
                  );

                  await cloudinary.uploader.destroy(`_Circle/_Replies/${img}`);
                  imageSrc = null;
                } else {
                  imageSrc = null;
                }
              }
            }

            if (payload.image.fieldname) {
              if (payload.reply?.image === null) {
                const b64 = Buffer.from(payload.image?.buffer).toString(
                  "base64"
                );
                const dataURI = `data:${payload.image?.mimetype};base64,${b64}`;
                await cloudinary.uploader
                  .upload(dataURI, {
                    folder: `_Circle/_Replies/`,
                    resource_type: "auto",
                  })
                  .then((res) => (imageSrc = res.url));
              } else {
                const img = getCloudinaryImageName(
                  payload.reply?.image as string
                );

                await cloudinary.uploader.destroy(`_Circle/_Replies/${img}`);

                const b64 = Buffer.from(payload.image?.buffer).toString(
                  "base64"
                );
                const dataURI = `data:${payload.image?.mimetype};base64,${b64}`;
                await cloudinary.uploader
                  .upload(dataURI, {
                    folder: `_Circle/_Replies/`,
                    resource_type: "auto",
                  })
                  .then((res) => (imageSrc = res.url));
              }
            }

            const user = await UserRepository.findOneBy({
              id: payload.userId,
            });

            const editedTime = new Date().toISOString();

            const editedReply: any = {
              content: payload.content,
              image: imageSrc,
              id: payload.replyId,
              user,
              created_at: new Date(editedTime),
            };

            // CREATE THREAD
            const newReply = ReplyRepository.create(editedReply);

            await ReplyRepository.save(newReply);

            this.emitter.emit("message");
            console.log("(Worker) : Editing Reply!");

            channel.ack(message);
          }
        } catch (error) {
          console.log("(Worker) : Editing Reply Failed!");
        }
      });
    } catch (error) {
      console.log("(WORKER): Error while consume queue from reply!");
    }
  }

  // async delete(queueName: string, connection: any) {
  //   try {
  //     const channel = await connection.createChannel();
  //     await channel.assertQueue(queueName);
  //     await channel.consume(queueName, async (message: any) => {
  //       try {
  //         if (message !== null) {
  //           const payload = JSON.parse(message.content.toString());

  //           if (payload.thread.image) {
  //             const img = getCloudinaryImageName(payload.thread.image);
  //             await cloudinary.uploader.destroy(`_Circle/_Threads/${img}`);
  //           }
  //           await ThreadRepository.delete(payload.threadId);

  //           this.emitter.emit("message");
  //           console.log("(Worker) : Deleting Thread!");

  //           channel.ack(message);
  //         }
  //       } catch (error) {
  //         console.log("(Worker) : Deleting Thread Failed!");
  //       }
  //     });
  //   } catch (error) {
  //     console.log("(WORKER): Error while consume queue from thread!");
  //   }
  // }
}

export default new ReplyWorker();
