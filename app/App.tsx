import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./App.module.css";

function App({ children }: { children: React.ReactNode }) {
  const { Header, Main } = AppShell;
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div className={classes.logoWrapper}>
          <img className={classes.logo} src="logo.png" alt="Logo" />
        </div>
      </Header>

      <Main>{children}</Main>
    </AppShell>
  );
}

export default App;
