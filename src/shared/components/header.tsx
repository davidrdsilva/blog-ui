'use client';

import { Avatar, Burger, Container, Group, Popover, Stack, Tooltip } from '@mantine/core';
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

                <Group gap="md">
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

                <Popover
                    width={300}
                    shadow="md"
                    withArrow
                    withOverlay
                    overlayProps={{ zIndex: 10000, blur: '8px' }}
                    zIndex={10001}
                >
                    <Popover.Target>
                        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
                    </Popover.Target>
                    <Popover.Dropdown>
                        <Stack hiddenFrom="xs">{items}</Stack>
                    </Popover.Dropdown>
                </Popover>
            </Container>
        </header>
    );
}
