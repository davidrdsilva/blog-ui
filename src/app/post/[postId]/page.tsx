"use client";

import BlogArticle from "@/app/post/[postId]/components/blog-article";
import { postMock } from "../../../../mocks/mock-data";

export default function BlogPage() {
  return (
    <BlogArticle
      id={postMock.id}
      title={postMock.title}
      image={postMock.image}
      createdAt={postMock.createdAt}
      body={postMock.body}
      author={postMock.author}
      tags={postMock.tags}
    />
  );
}
