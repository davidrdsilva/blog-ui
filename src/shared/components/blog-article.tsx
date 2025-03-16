import { Avatar, Badge, Container, Divider, Group, Image, Text, Title } from '@mantine/core';
import { Post } from '@shared/types/post.type';
import { Anton } from 'next/font/google';

import TiptapRenderer from '@shared/components/content-renderer';
import classes from '@styles/article/styles.module.css';
import getRandomMantineColor from '@utils/get-random-color-by-id';

const titleFont = Anton({
    weight: '400',
    subsets: ['latin'],
});

export default function BlogArticle({ title, description, image, createdAt, body, author, tags }: Post) {
    const publishingDate = 'Published on ' + new Date(createdAt).toDateString();

    return (
        <>
            <div style={{ position: 'relative', overflow: 'hidden' }}>
                <Image src={image} alt={title} className={classes.image} />
                <div className={classes.header}>
                    <Title className={`${classes.title} ${titleFont.className}`} c={'gray'}>
                        {title}
                    </Title>
                    <Divider my="lg" />
                    <Text className={classes.description} c={'dimmed'}>
                        {description}
                    </Text>
                </div>
            </div>

            <Container size="md" my="xl">
                <Group gap="xs" align="center" justify="start">
                    <Avatar component="a" href={author.id} target="_blank" src={author.image} alt={author.firstName} />
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
                        <Badge key={tag} color={getRandomMantineColor(tag)} variant="light">
                            {tag}
                        </Badge>
                    ))}
                    <Divider my="lg" />
                </Group>
            </Container>
        </>
    );
}
