import { Author } from "./author.type";

export type Post = {
  id: string;
  createdAt: string;
  image: string;
  author: Author;
  title: string;
  description: string;
  body?: string;
  tags: string[];
};
