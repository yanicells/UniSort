export type PostComment = {
  id: string;
  content: string;
  tags: string[];
  reactions: {
    like: number;
    love: number;
    haha: number;
    wow: number;
    sad: number;
    angry: number;
  };
  createdAt: Date | string;
  imageUrl?: string | null;
};
