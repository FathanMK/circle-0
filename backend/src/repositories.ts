import AppDataSource from "./config/data-source";

import { Reply } from "./entities/Replies.entities";
import { Thread } from "./entities/Thread.entities";
import { User } from "./entities/User.entities";
import { Like } from "./entities/Likes.entities";
import { Following } from "./entities/Following.entities";

const UserRepository = AppDataSource.getRepository(User);
const ThreadRepository = AppDataSource.getRepository(Thread);
const ReplyRepository = AppDataSource.getRepository(Reply);
const LikeRepository = AppDataSource.getRepository(Like);
const FollowingRepository = AppDataSource.getRepository(Following);

export {
  UserRepository,
  ThreadRepository,
  ReplyRepository,
  LikeRepository,
  FollowingRepository,
};
