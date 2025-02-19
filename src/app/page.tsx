"use client";

import { ArticleCard } from "@shared/components/article-card";
import { Container, Group, Text } from "@mantine/core";

import classes from "@shared/modules/homepage.module.css";
import { useEffect, useState } from "react";
import { postsMock } from "../../mocks/mock-data";
import { Post } from "@shared/types/post.type";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  const getPosts = () => {
    const data = postsMock;
    setPosts(data);
  }

  useEffect(() => {
    getPosts();
  }, [])

  return (
    <>
      <title>Blog UI</title>

      <div className={classes.wrapper}>
        <Container size={700} className={classes.inner}>
          <h1 className={classes.title}>
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: "blue", to: "cyan" }}
              inherit
            >
              Blog
            </Text>
          </h1>

          <Text className={classes.description} c="dimmed">
            Welcome to my blog! Here I write about things that interest me.
          </Text>
        </Container>
      </div>

      <Container size="lg" mb="xl">
        <Group justify="center" gap="xs">
          {posts.length && posts.map(post => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </Group>
      </Container>
    </>
  );
}
