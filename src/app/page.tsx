'use client';

import { Container, Group, Text } from '@mantine/core';
import { ArticleCard } from '@shared/components/article-card';
import { Anton } from 'next/font/google';

import { Post } from '@shared/types/post.type';
import classes from '@styles/homepage/homepage.module.css';
import { useState } from 'react';
import { postsMock } from '../../mocks/data';

const titleFont = Anton({
    weight: '400',
    subsets: ['latin'],
});

export default function Home() {
    const [posts] = useState<Post[]>(postsMock);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     async function fetchBlogPosts() {
    //         setLoading(true);
    //         try {
    //             const response = await fetch('/api/posts');

    //             if (!response.ok) {
    //                 throw new Error(`Error fetching blog posts: ${response.status}`);
    //             }

    //             const data = await response.json();
    //             setPosts(data.posts);
    //         } catch (err) {
    //             console.error('Failed to fetch blog posts:', err);
    //             // setError('Failed to load blog posts. Please try again later.');
    //         } finally {
    //             setLoading(false);
    //         }
    //     }

    //     fetchBlogPosts();
    // }, []);

    return (
        <div className={classes.container}>
            <title>Blog UI</title>

            <div className={`${classes.backgroundCircle} ${classes.backgroundCircleTopRight}`}></div>
            <div className={`${classes.backgroundCircle} ${classes.backgroundCircleBottomLeft}`}></div>

            <div className={classes.header}>
                <Container size={700} className={classes.inner}>
                    <h1 className={`${classes.title} ${titleFont.className}`}>
                        <Text
                            component="span"
                            variant="gradient"
                            gradient={{ from: 'pink', to: 'purple', deg: 90 }}
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
                    {/* {loading && <Loader color="grape" h={100} />} */}
                    {posts.length && posts.map((post) => <ArticleCard key={post.id} post={post} />)}
                </Group>
            </Container>

            <footer>
                <Container size="lg" ta="center" my="xl">
                    <Text c="dimmed">© {new Date().getFullYear()} Blog UI. All rights reserved</Text>
                </Container>
            </footer>
        </div>
    );
}
