import { Switch, useMantineColorScheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export function ColorThemeSwitch() {
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const [mounted, setMounted] = useState(false);

  // Ensure that the Switch component is only rendered after the client has mounted and 
  // the correct colorScheme value is available. This prevents any hydration mismatch issues.
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Optionally, return a placeholder or null during SSR
    return null;
  }

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
