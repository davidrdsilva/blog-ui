"use client";

import { Avatar, Burger, Container, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '@styles/header/header.module.css';
import { usePathname } from 'next/navigation';

const links = [
  { link: '/', label: 'Homepage' },
  { link: '/management/create-post', label: 'New post' },
  { link: '/post/test', label: 'Post' }
];

export function Header() {
  const pathname = usePathname()
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={pathname === link.link || undefined}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Avatar src={null} alt="no image here" color="pink" />
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
