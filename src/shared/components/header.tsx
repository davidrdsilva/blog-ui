'use client';

import { Avatar, Button, Burger, Container, Drawer, Group, Stack, Tooltip, Text, Divider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ColorThemeSwitch } from '@shared/components/color-theme-switch';
import classes from '@styles/header/header.module.css';
import { usePathname, useRouter } from 'next/navigation';
import { IconUser, IconBook } from '@tabler/icons-react';

const links = [
    { link: '/', label: 'Homepage' },
    { link: '/management/create-post', label: 'New post' },
    { link: '/post/test', label: 'Post' },
];

export function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const [opened, { toggle }] = useDisclosure(false);

    const items = links.map((link) => (
        <a key={link.label} href={link.link} className={classes.link} data-active={pathname === link.link || undefined}>
            {link.label}
        </a>
    ));

    return (
        <header className={classes.header}>
            <Container size="md" className={classes.inner}>
                <IconBook size={24} stroke={1.5} color="var(--mantine-color-pink-6)" />
                <Group gap={5} visibleFrom="xs">
                    {items}
                </Group>

                <Group gap="md" visibleFrom="xs">
                    <ColorThemeSwitch />
                    <Tooltip label="Login">
                        <Avatar
                            className={classes.userAvatar}
                            onClick={() => router.push('/login')}
                            radius="xl"
                            size="sm"
                        >
                            <IconUser size={18} stroke={1.5} />
                        </Avatar>
                    </Tooltip>
                </Group>

                <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />

                <Drawer
                    opened={opened}
                    onClose={toggle}
                    title="Navigation"
                    padding="xl"
                    size="xs"
                    position="right"
                    zIndex={10001}
                    overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
                    className={classes.drawer}
                >
                    <Stack gap="md" className={classes.drawerContent}>
                        <Stack gap="xs" mt="md">
                            {items}
                        </Stack>

                        <Divider my="sm" />

                        <Group justify="space-between" align="center">
                            <Text size="sm">Theme</Text>
                            <ColorThemeSwitch />
                        </Group>

                        <Button
                            fullWidth
                            leftSection={<IconUser size={18} />}
                            variant="gradient"
                            gradient={{ from: 'pink', to: 'purple' }}
                            onClick={() => {
                                router.push('/login');
                                toggle();
                            }}
                            className={classes.loginButton}
                        >
                            Sign in to your account
                        </Button>
                    </Stack>
                </Drawer>
            </Container>
        </header>
    );
}
