export type PostData = {
  id: number;
  userId: number;
  content: string;
  date: string;
  imageUrl?: string;
  likes: number;
  usersLike: number[];
};

export type UserData = {
  id: number;
  name: string;
  avatar?: string;
};
