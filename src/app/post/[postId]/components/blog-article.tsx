import { Container, Divider, Image, Text, Title } from "@mantine/core";
import { Anton, Lora } from "next/font/google";

import classes from "../modules/blog-article.module.css";

const articleFont = Lora({
  weight: "400",
  subsets: ["latin"],
});

const titleFont = Anton({
  weight: "400",
  subsets: ["latin"],
});

export default function BlogArticle({
  title,
  date,
  content,
}: {
  title: string;
  date: string;
  content: string;
}) {
  return (
    <>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <Image
          src=""
          alt="Article image"
          className={classes.image}
        />
        <Title className={`${classes.title} ${titleFont.className}`}>
          {title}
        </Title>
      </div>

      <Container size="md" my="xl">
        <Text c="dimmed" size="sm" mt="sm">
          {date}
        </Text>
        <Divider my="lg" />
        <Text
          style={{
            lineHeight: "1.5",
          }}
          size="xl"
          className={articleFont.className}
        >
          {content}
        </Text>
      </Container>
    </>
  );
}
