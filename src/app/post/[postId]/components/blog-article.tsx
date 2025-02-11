import { Post } from "@/shared/types/post.type";
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

import TiptapRenderer from "@/shared/components/content-renderer";
import classes from "../modules/blog-article.module.css";

const titleFont = Anton({
  weight: "400",
  subsets: ["latin"],
});

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

  const getRandomColor = (tag: string) => {
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

    // Use a simple hash function to consistently map a tag to a color
    const hashCode = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32-bit integer
      }
      return Math.abs(hash);
    };

    const colorIndex = hashCode(tag) % colors.length;
    return colors[colorIndex];
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
        {body && <TiptapRenderer content={JSON.parse(body)} />}

        <Divider my="lg" />
        <Group>
          {tags.map((tag) => (
            <Badge key={tag} color={getRandomColor(tag)} variant="light">
              {tag}
            </Badge>
          ))}
          <Divider my="lg" />
        </Group>
      </Container>
    </>
  );
}
