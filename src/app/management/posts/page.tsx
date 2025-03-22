'use client';

import {
    Badge,
    Button,
    Card,
    Divider,
    Group,
    Image,
    Modal,
    Paper,
    Progress,
    SimpleGrid,
    Stack,
    Tabs,
    Text,
    Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Post } from '@shared/types/post.type';
import classes from '@styles/management/post-management.module.css';
import {
    IconCalendar,
    IconDeviceDesktop,
    IconDeviceMobile,
    IconDeviceTablet,
    IconEdit,
    IconEye,
    IconFilePlus,
    IconFileText,
    IconInfoCircle,
    IconRefresh,
    IconTrash,
} from '@tabler/icons-react';
import { useState } from 'react';
import { postsMock } from '../../../../mocks/data';

export default function PostManagement() {
    const [posts] = useState<Post[]>(postsMock);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [opened, { open, close }] = useDisclosure(false);

    const publishedPosts = posts.filter((post) => !post.isDraft);
    const draftPosts = posts.filter((post) => post.isDraft);

    const handleInfoClick = (post: Post) => {
        setSelectedPost(post);
        open();
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'Never';

        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
            if (diffHours === 0) {
                const diffMinutes = Math.floor(diffTime / (1000 * 60));
                return diffMinutes <= 1 ? 'just now' : `${diffMinutes} minutes ago`;
            }
            return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
        } else if (diffDays < 7) {
            return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
        } else if (diffDays < 30) {
            const diffWeeks = Math.floor(diffDays / 7);
            return `${diffWeeks} ${diffWeeks === 1 ? 'week' : 'weeks'} ago`;
        } else if (diffDays < 365) {
            const diffMonths = Math.floor(diffDays / 30);
            return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} ago`;
        } else {
            const diffYears = Math.floor(diffDays / 365);
            return `${diffYears} ${diffYears === 1 ? 'year' : 'years'} ago`;
        }
    };

    const renderPostCard = (post: Post) => (
        <Card key={post.id} shadow="sm" padding={0} radius="md" className={classes.postCard}>
            {post.isDraft && (
                <Badge color="yellow" className={classes.draftBadge}>
                    Draft
                </Badge>
            )}
            <Image src={post.image} height={200} alt={post.title} className={classes.postImage} />
            <div className={classes.postContent}>
                <Title order={3} className={classes.postTitle}>
                    {post.title}
                </Title>
                <Text className={classes.postDescription} lineClamp={2}>
                    {post.description}
                </Text>
                <Group gap="xs" mb="md">
                    {post.tags.map((tag) => (
                        <Badge key={tag} color="pink" variant="light">
                            {tag}
                        </Badge>
                    ))}
                </Group>
                <Divider my="sm" />
                <Group justify="space-between" className={classes.postMeta}>
                    <Text className={classes.postDate}>
                        <IconCalendar size={14} style={{ marginRight: 5 }} />
                        {formatDate(post.createdAt)}
                    </Text>
                    <Group className={classes.postActions}>
                        {!post.isDraft && (
                            <Button
                                variant="light"
                                color="blue"
                                size="xs"
                                className={classes.actionButton}
                                leftSection={<IconInfoCircle size={16} />}
                                onClick={() => handleInfoClick(post)}
                            >
                                Stats
                            </Button>
                        )}
                        <Button
                            variant="light"
                            color="violet"
                            size="xs"
                            className={classes.actionButton}
                            leftSection={<IconEdit size={16} />}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="light"
                            color="red"
                            size="xs"
                            className={classes.actionButton}
                            leftSection={<IconTrash size={16} />}
                        >
                            Delete
                        </Button>
                    </Group>
                </Group>
            </div>
        </Card>
    );

    const renderEmptyState = (type: 'published' | 'draft') => (
        <div className={classes.emptyState}>
            <IconFileText size={48} style={{ marginBottom: 15, opacity: 0.5 }} />
            <Title order={3} className={classes.emptyStateTitle}>
                No {type === 'published' ? 'published posts' : 'drafts'} yet
            </Title>
            <Text className={classes.emptyStateDescription}>
                {type === 'published' ? 'Your published posts will appear here' : 'Your draft posts will appear here'}
            </Text>
            <Button
                leftSection={<IconFilePlus size={16} />}
                variant="gradient"
                gradient={{ from: 'pink', to: 'purple' }}
                component="a"
                href="/management/create-post"
            >
                Create a new post
            </Button>
        </div>
    );

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <Title className={classes.title} order={1}>
                    Manage Your Posts
                </Title>
                <Text c="dimmed">Create, edit, and track the performance of your blog posts</Text>
            </div>

            <Group justify="space-between" mb="md">
                <div />
                <Button
                    leftSection={<IconFilePlus size={16} />}
                    variant="gradient"
                    gradient={{ from: 'pink', to: 'purple' }}
                    component="a"
                    href="/management/create-post"
                >
                    Create New Post
                </Button>
            </Group>

            <div className={classes.tabsWrapper}>
                <Tabs defaultValue="published">
                    <Tabs.List>
                        <Tabs.Tab value="published" leftSection={<IconEye size={16} />}>
                            Published ({publishedPosts.length})
                        </Tabs.Tab>
                        <Tabs.Tab value="drafts" leftSection={<IconFileText size={16} />}>
                            Drafts ({draftPosts.length})
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="published" pt="md">
                        {publishedPosts.length > 0 ? (
                            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
                                {publishedPosts.map(renderPostCard)}
                            </SimpleGrid>
                        ) : (
                            renderEmptyState('published')
                        )}
                    </Tabs.Panel>

                    <Tabs.Panel value="drafts" pt="md">
                        {draftPosts.length > 0 ? (
                            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>{draftPosts.map(renderPostCard)}</SimpleGrid>
                        ) : (
                            renderEmptyState('draft')
                        )}
                    </Tabs.Panel>
                </Tabs>
            </div>

            {/* Statistics Modal */}
            <Modal
                opened={opened}
                onClose={close}
                title="Post Statistics"
                size="lg"
                centered
                zIndex={1000}
                withCloseButton
                lockScroll={false}
                styles={{
                    body: { position: 'relative' },
                    content: { position: 'relative' },
                    overlay: { position: 'fixed', zIndex: 999 },
                }}
            >
                {selectedPost && selectedPost.statistics && (
                    <Stack>
                        <div className={classes.modalTitle}>
                            <Text size="xl" fw={700}>
                                {selectedPost.title}
                            </Text>
                        </div>

                        <Group align="flex-end" mb="md">
                            <div>
                                <Text size="sm" c="dimmed">
                                    Total Views
                                </Text>
                                <Text size="xl" fw={700}>
                                    {selectedPost.statistics.views.toLocaleString()}
                                </Text>
                            </div>
                            <div>
                                <Text size="sm" c="dimmed">
                                    Total Likes
                                </Text>
                                <Text size="xl" fw={700}>
                                    {selectedPost.statistics.likes.toLocaleString()}
                                </Text>
                            </div>
                        </Group>

                        <Text fw={500} mb="xs">
                            Platform Distribution
                        </Text>
                        <div className={classes.platformStats}>
                            <Paper p="md" radius="md" className={classes.platformItem}>
                                <IconDeviceDesktop
                                    size={24}
                                    color="var(--mantine-color-blue-6)"
                                    className={classes.platformIcon}
                                />
                                <Text className={classes.platformValue}>
                                    {selectedPost.statistics.platforms.desktop.toLocaleString()}
                                </Text>
                                <Text className={classes.platformLabel}>Desktop</Text>
                            </Paper>

                            <Paper p="md" radius="md" className={classes.platformItem}>
                                <IconDeviceMobile
                                    size={24}
                                    color="var(--mantine-color-pink-6)"
                                    className={classes.platformIcon}
                                />
                                <Text className={classes.platformValue}>
                                    {selectedPost.statistics.platforms.mobile.toLocaleString()}
                                </Text>
                                <Text className={classes.platformLabel}>Mobile</Text>
                            </Paper>

                            <Paper p="md" radius="md" className={classes.platformItem}>
                                <IconDeviceTablet
                                    size={24}
                                    color="var(--mantine-color-violet-6)"
                                    className={classes.platformIcon}
                                />
                                <Text className={classes.platformValue}>
                                    {selectedPost.statistics.platforms.tablet.toLocaleString()}
                                </Text>
                                <Text className={classes.platformLabel}>Tablet</Text>
                            </Paper>
                        </div>

                        <Progress.Root size="xl" mt="md">
                            <Progress.Section
                                value={
                                    (selectedPost.statistics.platforms.desktop / selectedPost.statistics.views) * 100
                                }
                                color="blue"
                            />
                            <Progress.Section
                                value={(selectedPost.statistics.platforms.mobile / selectedPost.statistics.views) * 100}
                                color="pink"
                            />
                            <Progress.Section
                                value={(selectedPost.statistics.platforms.tablet / selectedPost.statistics.views) * 100}
                                color="violet"
                            />
                        </Progress.Root>

                        <Text size="xs" c="dimmed" ta="center" mt={5}>
                            Desktop:{' '}
                            {Math.round(
                                (selectedPost.statistics.platforms.desktop / selectedPost.statistics.views) * 100,
                            )}
                            % | Mobile:{' '}
                            {Math.round(
                                (selectedPost.statistics.platforms.mobile / selectedPost.statistics.views) * 100,
                            )}
                            % | Tablet:{' '}
                            {Math.round(
                                (selectedPost.statistics.platforms.tablet / selectedPost.statistics.views) * 100,
                            )}
                            %
                        </Text>

                        <Divider my="md" />

                        <Group grow>
                            <div className={classes.statItem}>
                                <Text size="sm" c="dimmed" className={classes.statLabel}>
                                    <IconCalendar size={14} style={{ marginRight: 5 }} />
                                    Last Viewed
                                </Text>
                                <Text className={classes.statValue}>
                                    {formatDate(selectedPost.statistics.lastViewed)}
                                </Text>
                            </div>

                            <div className={classes.statItem}>
                                <Text size="sm" c="dimmed" className={classes.statLabel}>
                                    <IconRefresh size={14} style={{ marginRight: 5 }} />
                                    Last Updated
                                </Text>
                                <Text className={classes.statValue}>
                                    {formatDate(selectedPost.statistics.lastUpdated)}
                                </Text>
                            </div>
                        </Group>

                        <Button fullWidth variant="light" color="gray" onClick={close} mt="md">
                            Close
                        </Button>
                    </Stack>
                )}
            </Modal>
        </div>
    );
}
