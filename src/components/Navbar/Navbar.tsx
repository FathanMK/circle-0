import { Button, Flex, Grid, Text } from "@chakra-ui/react";
import { Heart, Home, LogOut, Search, UserCircle2 } from "lucide-react";

export default function Navbar() {
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
          <Button
            className="active-link"
            as={Flex}
            gap={4}
            align="center"
            colorScheme="transparent"
            cursor="pointer"
            color="whiteAlpha.600"
            _hover={{ color: "white" }}
          >
            <Home />
            <Text>Home</Text>
          </Button>
          <Button
            as={Flex}
            gap={4}
            align="center"
            colorScheme="transparent"
            cursor="pointer"
            color="whiteAlpha.600"
            _hover={{ color: "white" }}
          >
            <Search />
            <Text>Search</Text>
          </Button>
          <Button
            as={Flex}
            gap={4}
            align="center"
            colorScheme="transparent"
            cursor="pointer"
            color="whiteAlpha.600"
            _hover={{ color: "white" }}
          >
            <Heart />
            <Text>Follows</Text>
          </Button>
          <Button
            as={Flex}
            gap={4}
            align="center"
            colorScheme="transparent"
            cursor="pointer"
            color="whiteAlpha.600"
            _hover={{ color: "white" }}
          >
            <UserCircle2 />
            <Text>Profile</Text>
          </Button>
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
        <Button
          as={Flex}
          gap={4}
          mt="auto"
          px={4}
          align="center"
          colorScheme="transparent"
          style={{ justifyContent: "flex-start" }}
          cursor="pointer"
          color="whiteAlpha.600"
          _hover={{ color: "white" }}
        >
          <LogOut />
          <Text>Log Out</Text>
        </Button>
      </Flex>
    </Grid>
  );
}
