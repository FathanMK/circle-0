import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User.entities";

@Entity({ name: "Following" })
export class Following {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.following, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  following: User;

  @ManyToOne(() => User, (user) => user.followers, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  followers: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
