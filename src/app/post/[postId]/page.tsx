"use client";

import BlogArticle from "@/app/post/[postId]/components/blog-article";

// Mock
const article = {
  title: 'My First Blog Post',
  date: "Published on " + new Date().toDateString(),
  content: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Vivamus lacinia odio vitae vestibulum vestibulum. 
    Cras venenatis euismod malesuada.
  `,
};

export default function BlogPage() {
  return (
    <BlogArticle
      title={article.title}
      date={article.date}
      content={article.content}
    />
  );
}
