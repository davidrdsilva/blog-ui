import {
  Avatar,
  Container,
  Divider,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";
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

type Author = {
  id: string;
  firstName: string;
  lastName: string;
  image: string;
};

type Post = {
  id: string;
  createdAt: string;
  image: string;
  author: Author;
  title: string;
  body: string;
  tags: string[];
};

export default function BlogArticle({
  title,
  image,
  createdAt,
  body,
  author,
}: Post) {
  const publishingDate = "Published on " + new Date(createdAt).toDateString();

  return (
    <>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <Image src={image} alt={title} className={classes.image} />
        <Title className={`${classes.title} ${titleFont.className}`}>
          {title}
        </Title>
      </div>

      <Container size="md" my="xl">
        <Group gap="xs" align="center" justify="start">
          <Avatar
            component="a"
            href={author.id}
            target="_blank"
            src={author.image}
            alt={author.firstName}
          />
          <div>
            <Text size="md">
              {author.firstName} {author.lastName}
            </Text>
            <Text c="dimmed" size="sm">
              {publishingDate}
            </Text>
          </div>
        </Group>

        <Divider my="lg" />
        <div
          style={{
            lineHeight: "1.5",
            fontSize: "1.125rem",
          }}
          className={articleFont.className}
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </Container>
    </>
  );
}
