export interface PostType {
  id: string;
  title: string;
  content: string;
  user: {
    id: string;
    username: string;
  };
}
