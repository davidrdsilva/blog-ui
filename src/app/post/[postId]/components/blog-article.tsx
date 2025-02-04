import {
  Avatar,
  Badge,
  Container,
  DefaultMantineColor,
  Divider,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";
import { Anton } from "next/font/google";

import classes from "../modules/blog-article.module.css";
import TiptapRenderer from "@/shared/components/content-renderer";

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
  description: string;
  body: string;
  tags: string[];
};

export default function BlogArticle({
  title,
  description,
  image,
  createdAt,
  body,
  author,
  tags,
}: Post) {
  const publishingDate = "Published on " + new Date(createdAt).toDateString();

  const getRandomColor = () => {
    const colors: DefaultMantineColor[] = [
      "red",
      "blue",
      "green",
      "orange",
      "pink",
      "cyan",
      "lime",
      "grape",
      "violet",
      "yellow",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <Image src={image} alt={title} className={classes.image} />
        <div className={classes.header}>
          <Title
            className={`${classes.title} ${titleFont.className}`}
            c={"gray"}
          >
            {title}
          </Title>
          <Divider my="lg" />
          <Text className={classes.description} c={"dimmed"}>
            {description}
          </Text>
        </div>
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

        {/* Display the current JSON content of the editor */}
        <TiptapRenderer content={JSON.parse(body)} />

        <Divider my="lg" />
        <Group>
          {tags.map((tag) => (
            <Badge key={tag} color={getRandomColor()} variant="light">
              {tag}
            </Badge>
          ))}
          <Divider my="lg" />
        </Group>
      </Container>
    </>
  );
}
