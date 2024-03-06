export type Post = {
  id: number;
  userId: number;
  content: string;
  date: string;
  imageUrl?: string;
  likes: number;
  usersLike: number[];
};
