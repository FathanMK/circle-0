import { Button, Flex, Grid, Text, useDisclosure } from "@chakra-ui/react";
import { Heart, Home, Search, UserCircle2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import NavLink from "./_components/NavLink";
import { LogInButton, LogOutButton } from "./_components/LogButton";
import { RootState } from "@/store";
import CreatePost from "./_components/CreatePost";

export default function Navbar() {
  // USE VARIABLE BELOW TO GET ACTIVE LINK
  const location = useLocation();
  const currentUrl = location.pathname;

  const { user } = useSelector((state: RootState) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Grid
        as="nav"
        gridArea="1/1/6/2"
        py={4}
        borderRight="1px solid hsl(0 100% 100% / 15%)"
      >
        <Flex direction="column" gap={4} px={2}>
          <Text as="h1" fontSize="4xl" px={4} color="accent" fontWeight={600}>
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
            onClick={onOpen}
          >
            Create Post
          </Button>
          {user ? <LogOutButton /> : <LogInButton />}
        </Flex>
      </Grid>
      <CreatePost isOpen={isOpen} onClose={onClose} />
    </>
  );
}
