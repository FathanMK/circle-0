import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User.entities";
import { Thread } from "./Thread.entities";

@Entity({ name: "Replies" })
export class Reply {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.replies)
  user: User;

  @ManyToOne(() => Thread, (thread) => thread.replies)
  thread: Thread;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  image: string;

  @Column()
  content: string;
}
