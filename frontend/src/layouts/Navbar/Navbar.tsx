import { Box, Button, Flex, Grid, Text, useDisclosure } from "@chakra-ui/react";
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
          <Text as="h1" fontSize="4xl" px={4} color="accent" fontWeight={700}>
            circle
          </Text>
          <Flex direction="column" align="flex-start" gap={4}>
            <Box
              as={NavLink}
              className={currentUrl === "/" ? "active-link" : ""}
              to="/"
              w="full"
            >
              <Home />
              <Text>Home</Text>
            </Box>
            <Box
              as={NavLink}
              className={currentUrl.includes("search") ? "active-link" : ""}
              to="/search"
              w="full"
            >
              <Search />
              <Text>Search</Text>
            </Box>
            <Box
              as={NavLink}
              className={currentUrl.includes("follows") ? "active-link" : ""}
              to={`/follows/${user?.id}`}
              w="full"
            >
              <Heart />
              <Text>Follows</Text>
            </Box>
            <Box
              as={NavLink}
              className={
                currentUrl.includes("profile") ||
                currentUrl.includes("editProfile")
                  ? "active-link"
                  : ""
              }
              to={`/profile/${user?.id}`}
              w="full"
            >
              <UserCircle2 />
              <Text>Profile</Text>
            </Box>
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
