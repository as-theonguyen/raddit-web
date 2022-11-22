export interface CommentType {
  id: string;
  content: string;
  user: {
    id: string;
    username: string;
  };
}
