"use client";

import BlogArticle from "@/components/blog-article";

// Mock
const article = {
  title: 'My First Blog Post',
  date: '2025-01-18',
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
