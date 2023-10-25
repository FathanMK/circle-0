import { Button, Text, Flex } from "@chakra-ui/react";
import { LogOut } from "lucide-react";

export default function LogOutButton() {
  return (
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
  );
}
