import amqp from "amqplib";
import "dotenv/config";
class MessageQueue {
  async MessageSend(queueName: string, payload: any) {
    try {
      const connection = await amqp.connect(process.env.RABBIT_PORT as string);
      const channel = await connection.createChannel()

      await channel.assertQueue(queueName);
      channel.sendToQueue(queueName, Buffer.from(JSON.stringify(payload)));

      await channel.close();
      await connection.close();
      return null;
    } catch (error) {
      return error;
    }
  }
}

export default new MessageQueue();
