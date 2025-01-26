import {
  Container,
  Title,
  Text,
  Divider,
  Group,
  Button,
  useMantineColorScheme,
} from "@mantine/core";
import { Lora } from "next/font/google";
import { Anton } from "next/font/google";

const articleFont = Lora({
  weight: "400",
  subsets: ["latin"],
});

const titleFont = Anton({
  weight: "400",
  subsets: ["latin"],
});

export default function BlogArticle({
  title,
  date,
  content,
}: {
  title: string;
  date: string;
  content: string;
}) {
  const { setColorScheme, clearColorScheme } = useMantineColorScheme();

  return (
    <Container size="md" my="xl">
      <Title
        style={{
          fontSize: "12rem",
          textAlign: "center",
        }}
        order={1}
        className={titleFont.className}
      >
        {title}
      </Title>
      <Text c="dimmed" size="sm" mt="sm">
        {new Date(date).toLocaleDateString()}
      </Text>
      <Divider my="lg" />
      <Text
        style={{
          lineHeight: "1.5",
        }}
        size="xl"
        className={articleFont.className}
      >
        {content}
      </Text>
      <Group>
        <Button onClick={() => setColorScheme("light")}>Light</Button>
        <Button onClick={() => setColorScheme("dark")}>Dark</Button>
        <Button onClick={() => setColorScheme("auto")}>Auto</Button>
        <Button onClick={clearColorScheme}>Clear</Button>
      </Group>
    </Container>
  );
}
