interface Thread {
  id?: string;
  content?: string;
  image?: string;
  created_at?: string;
  user?: User;
  likes?: Like[];
  totalLikes?: number;
  replies?: Reply[];
  totalReplies?: number;
}
