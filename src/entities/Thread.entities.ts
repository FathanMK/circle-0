import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User.entities";
import { Reply } from "./Replies.entities";
import { Like } from "./Likes.entities";

@Entity({ name: "Threads" })
export class Thread {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  posted_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.threads)
  user: User;

  @OneToMany(() => Reply, (reply) => reply.thread)
  replies: Reply[];

  @OneToMany(() => Like, (like) => like.thread)
  likes: Like[];
}
