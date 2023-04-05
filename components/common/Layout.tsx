import React, { useState, ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import {
  AppShell,
  Navbar,
  Title,
  useMantineTheme,
} from "@mantine/core";
import CommonHeader from "./CommonHeader/CommonHeader";

export default function Layout({ children }: { children: ReactNode}) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <div>
      <Head>
        <title>SpaceX API</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AppShell
        padding="md"
        navbarOffsetBreakpoint="sm"
        fixed
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200 }}
          >
            <Link href="/" passHref>
              <Title order={5} ml={10}>
                Home
              </Title>
            </Link>
          </Navbar>
        }
        header={
          <CommonHeader
            theme={theme}
            opened={opened}
            onClick={() => setOpened((o) => !o)}
          />
        }
        styles={(theme) => ({
          main: {
            backgroundColor: theme.colors.gray[0],
          },
        })}
      >
        {children}
      </AppShell>
    </div>
  );
}
