import {
  Header,
  Text,
  MediaQuery,
  Burger,
} from "@mantine/core";
import type { MantineTheme } from "@mantine/core";

type CommonHeaderProps = {
  theme: MantineTheme;
  opened: boolean;
  onClick: () => void
}

const CommonHeader = ({
  theme,
  opened,
  onClick,
}: CommonHeaderProps) => {
  return (
    <Header
      height={60}
      p="xs"
      sx={(theme) => ({
        backgroundColor: theme.colors.blue[9],
        color: "white",
      })}
    >
      <div
        style={{ display: "flex", alignItems: "center", height: "100%" }}
      >
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={onClick}
            size="sm"
            color={theme.colors.gray[3]}
            mr="xl"
          />
        </MediaQuery>
        <Text ml={10} size="md">
          SpaceX API
        </Text>
      </div>
    </Header>
  )
}

export default CommonHeader;
