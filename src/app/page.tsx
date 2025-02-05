"use client";

import { ArticleCardFooter } from "@/shared/components/article-card";
import { Container, Group, Text } from "@mantine/core";

import classes from "@/shared/modules/homepage.module.css";

export default function Home() {
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
          <ArticleCardFooter />
          <ArticleCardFooter />
          <ArticleCardFooter />
          <ArticleCardFooter />
        </Group>
      </Container>
    </>
  );
}
