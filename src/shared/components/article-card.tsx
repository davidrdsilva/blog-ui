import { ActionIcon, Anchor, Avatar, Badge, Card, Group, Image, Text, useMantineTheme } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';

import classes from '@styles/article-card/article-card.module.css';
import { Post } from '@shared/types/post.type';
import { Anton } from 'next/font/google';

const titleFont = Anton({
    weight: '400',
    subsets: ['latin'],
});

export function ArticleCard({ post }: { post: Post }) {
    const theme = useMantineTheme();

    return (
        <Card withBorder padding="lg" radius="md" className={classes.card}>
            <Card.Section mb="sm">
                <Image src={post.image} alt={post.title} height={250} />
            </Card.Section>

            <Group className={classes.tagsGroup}>
                {post.tags.length && (
                    <Badge key={post.tags[0]} w="fit-content" variant="light" className={classes.tag}>
                        {post.tags[0]}
                    </Badge>
                )}
            </Group>

            <Anchor href={`/post/${post.id}`} className={classes.link}>
                <Text
                    className={`${classes.title} ${titleFont.className}`}
                    mt="xs"
                    variant="gradient"
                    gradient={{ from: 'pink', to: 'purple', deg: 90 }}
                >
                    {post.title}
                </Text>
            </Anchor>

            <Card.Section className={classes.description}>
                <Text fz="xs" c="dimmed">
                    {post.description}
                </Text>
            </Card.Section>

            <div className={classes.author}>
                <Group>
                    <Avatar src={post.author.image} radius="sm" />
                    <div>
                        <Text fw={500}>
                            {post.author.firstName} {post.author.lastName}
                        </Text>
                        <Text fz="xs" c="dimmed">
                            posted 34 minutes ago
                        </Text>
                    </div>
                </Group>
            </div>

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
