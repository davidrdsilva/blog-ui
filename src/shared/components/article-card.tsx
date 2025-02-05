import {
  ActionIcon,
  Anchor,
  Avatar,
  Badge,
  Card,
  Group,
  Image,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import { postMock } from "../../../mocks/mock-data";

import classes from "../modules/article-card.module.css";

export function ArticleCardFooter() {
  const theme = useMantineTheme();

  return (
    <Card withBorder padding="lg" radius="md" className={classes.card}>
      <Card.Section mb="sm">
        <Image src={postMock.image} alt={postMock.title} height={180} />
      </Card.Section>

      <Group className={classes.tagsGroup}>
        {postMock.tags.map((tag) => (
          <Badge
            key={tag}
            w="fit-content"
            variant="light"
            className={classes.tag}
          >
            {tag}
          </Badge>
        ))}
      </Group>

      <Anchor href={`/post/${postMock.id}`}>
        <Text
          className={classes.title}
          mt="xs"
          variant="gradient"
          gradient={{ from: "pink", to: "purple", deg: 90 }}
        >
          {postMock.title}
        </Text>
      </Anchor>
      
      <Card.Section className={classes.description}>
        <Text fz="xs" c="dimmed">
          {postMock.description}
        </Text>
      </Card.Section>

      <Group mt="md">
        <Avatar src={postMock.author.image} radius="sm" />
        <div>
          <Text fw={500}>
            {postMock.author.firstName} {postMock.author.lastName}
          </Text>
          <Text fz="xs" c="dimmed">
            posted 34 minutes ago
          </Text>
        </div>
      </Group>

      <Card.Section className={classes.footer}>
        <Group justify="space-between">
          <Text fz="xs" c="dimmed">
            733 people liked this
          </Text>
          <ActionIcon variant="subtle" color="gray">
            <IconHeart size={20} color={theme.colors.red[6]} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Card.Section>
    </Card>
  );
}
