import { type ReactNode } from "react";
import { AppShell, Burger, Flex, Image, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./App.module.css";
import { useBreedActions, useSortBy, useSortOrder } from "./stores/breeds";
import {
  IconSortAscending,
  IconSortDescending,
  IconSectionSign,
} from "@tabler/icons-react";
import clsx from "clsx";
import { useNavigate } from "react-router";

const SORT_BY_OPTIONS: { label: string; value: "name" | "fci" | "airDate" }[] =
  [
    { label: "Name", value: "name" },
    { label: "FCI", value: "fci" },
    { label: "Datum", value: "airDate" },
  ];

const HEADER_HEIGHT = 60;

const App = ({ children }: { children: ReactNode }) => {
  const { Header, Main } = AppShell;
  const { Target, Dropdown, Label, Item, Divider } = Menu;
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();
  const sortBy = useSortBy();
  const sortOrder = useSortOrder();
  const { setSort } = useBreedActions();

  return (
    <AppShell header={{ height: HEADER_HEIGHT }} padding="md">
      <Header>
        <Flex
          justify="space-between"
          align="center"
          className={classes.headerFlex}
        >
          <div className={classes.logoWrapper} onClick={() => navigate("/")}>
            <Image
              src="logo.png"
              alt="Logo"
              style={{ maxHeight: HEADER_HEIGHT }}
              fit="contain"
            />
          </div>

          <Menu shadow="md" width={200}>
            <Target>
              <div className={classes.burgerWrapper}>
                <Burger opened={opened} onClick={toggle} />
              </div>
            </Target>
            <Dropdown>
              <Label>Sortieren nach</Label>
              {SORT_BY_OPTIONS.map(({ value, label }) => (
                <Item
                  key={value}
                  onClick={() => {
                    setSort({ sortBy: value, sortOrder });
                    toggle();
                  }}
                  leftSection={
                    sortBy === value && sortOrder === "asc" ? (
                      <IconSortAscending />
                    ) : (
                      <IconSortDescending />
                    )
                  }
                  className={clsx([classes.sortByItem], {
                    [classes.active]: value === sortBy,
                  })}
                >
                  {label}
                </Item>
              ))}
              <Divider />
              <Label>Seiten</Label>
              <Item
                leftSection={<IconSectionSign />}
                onClick={() => {
                  navigate("/impressum");
                }}
              >
                Impressum
              </Item>
            </Dropdown>
          </Menu>
        </Flex>
      </Header>

      <Main>{children}</Main>
    </AppShell>
  );
};

export default App;
