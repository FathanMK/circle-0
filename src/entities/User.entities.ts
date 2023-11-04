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
  full_name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({
    default:
      "https://res.cloudinary.com/dts5hyzdq/image/upload/v1698223958/vfygy9mtsax2i7zehkyl.jpg",
    nullable: true,
  })
  photo_profile: string;

  @Column({
    default:
      "https://res.cloudinary.com/dts5hyzdq/image/upload/v1698804475/j19x3xnfap1pt6wbwrfc.avif",
    nullable: true,
  })
  banner_profile: string;

  @Column({ default: "little bit empty here" })
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

  @OneToMany(() => Following, (following) => following.following)
  followers: User[];

  @OneToMany(() => Following, (following) => following.followers)
  following: User[];
}
