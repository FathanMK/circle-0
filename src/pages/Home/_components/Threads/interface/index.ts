import { ReactNode } from "react";
import { To } from "react-router-dom";

export interface IThreadContainerProps {
  to: To;
  children?: ReactNode;
  photo_profile: string;
}

export interface IThreadHeaderProps {
  full_name: string;
  username: string;
  created_at: string;
  threadId: string;
}
