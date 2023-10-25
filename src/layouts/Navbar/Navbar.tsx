import { Button, Flex, Grid, Text } from "@chakra-ui/react";
import { Heart, Home, Search, UserCircle2 } from "lucide-react";
import { useLocation } from "react-router-dom";

import NavLink from "./components/NavLink";
import LogOutButton from "./components/LogOutButton";

export default function Navbar() {
  const location = useLocation();
  const currentUrl = location.pathname;
  return (
    <Grid
      as="nav"
      gridArea="1/1/6/2"
      py={4}
      borderRight="1px solid hsl(0 100% 100% / 15%)"
    >
      <Flex direction="column" gap={4} px={2}>
        <Text fontSize="5xl" px={4} color="accent" fontWeight={600}>
          circle
        </Text>
        <Flex direction="column" align="flex-start" gap={4}>
          <NavLink className={currentUrl === "/" ? "active-link" : ""} to="/">
            <Home />
            <Text>Home</Text>
          </NavLink>
          <NavLink
            className={currentUrl.includes("search") ? "active-link" : ""}
            to="/search"
          >
            <Search />
            <Text>Search</Text>
          </NavLink>
          <NavLink
            className={currentUrl.includes("follows") ? "active-link" : ""}
            to="/follows"
          >
            <Heart />
            <Text>Follows</Text>
          </NavLink>
          <NavLink
            className={currentUrl.includes("follows") ? "active-link" : ""}
            to="/profile"
          >
            <UserCircle2 />
            <Text>Profile</Text>
          </NavLink>
        </Flex>
        <Button
          bg="accent"
          mx={2}
          color="white"
          borderRadius="full"
          _hover={{ bg: "purple" }}
        >
          Create Post
        </Button>
        <LogOutButton />
      </Flex>
    </Grid>
  );
}
