import { type ReactNode } from "react";
import { AppShell, Burger, Flex, Image } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./App.module.css";

const HEADER_HEIGHT = 60;

const App = ({ children }: { children: ReactNode }) => {
  const { Header, Main } = AppShell;
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell header={{ height: HEADER_HEIGHT }} padding="md">
      <Header>
        <Flex
          justify="space-between"
          align="center"
          className={classes.headerFlex}
        >
          <div className={classes.logoWrapper}>
            <Image
              src="logo.png"
              alt="Logo"
              style={{ maxHeight: HEADER_HEIGHT }}
              fit="contain"
            />
          </div>

          <div className={classes.burgerWrapper}>
            <Burger opened={opened} onClick={toggle} />
          </div>
        </Flex>
      </Header>

      <Main>{children}</Main>
    </AppShell>
  );
};

export default App;
