import { AppShell, Burger, Flex, Image } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./App.module.css";

function App({ children }: { children: React.ReactNode }) {
  const { Header, Main } = AppShell;
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <Header>
        <Flex
          justify="space-between"
          align="center"
          className={classes.headerFlex}
        >
          <div className={classes.logoWrapper}>
            <Image src="logo.png" alt="Logo" className={classes.logo} />
          </div>

          <div className={classes.burgerWrapper}>
            <Burger opened={opened} onClick={toggle} />
          </div>
        </Flex>
      </Header>

      <Main>{children}</Main>
    </AppShell>
  );
}

export default App;
