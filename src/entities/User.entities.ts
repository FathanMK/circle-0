import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { Thread } from "./Thread.entities";
import { Reply } from "./Replies.entities";
import { Like } from "./Likes.entities";
import { Following } from "./Following.entities";

@Entity({ name: "Users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @Column()
  full_name: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  photo_profile: string;

  @Column()
  bio: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Thread, (thread) => thread.user)
  threads: Thread[];

  @OneToMany(() => Reply, (reply) => reply.user)
  replies: Reply[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => Following, (following) => following.followers)
  followers: Following[];

  @OneToMany(() => Following, (following) => following.following)
  following: Following[];
}
