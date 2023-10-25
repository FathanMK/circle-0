interface Reply {
  id?: string;
  content?: string;
  image?: string;
  user?: User;
  thread?: Thread;
  created_at?: Date;
  updated_at?: Date;
}
