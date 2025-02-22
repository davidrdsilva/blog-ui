import { Switch, useMantineColorScheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

export function ColorThemeSwitch() {
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  return (
    <Switch
      size="md"
      color="dark.4"
      defaultChecked={colorScheme === "dark"}
      onLabel={
        <IconSun size={16} stroke={2.5} color="var(--mantine-color-yellow-4)" />
      }
      offLabel={
        <IconMoonStars
          size={16}
          stroke={2.5}
          color="var(--mantine-color-blue-6)"
        />
      }
      onChange={(event) =>
        event.target.checked === true
          ? setColorScheme("dark")
          : setColorScheme("light")
      }
    />
  );
}
