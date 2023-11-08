import { Button, Text, Flex } from "@chakra-ui/react";
import { LogIn, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import useToast from "@/hooks/useToast";
import { logout } from "@/slices/user/userSlice";

function LogOutButton() {
  const dispatch = useDispatch();
  const toast = useToast();
  
  const handleClick = () => {
    dispatch(logout());
    toast("Success", "User is successfully logout", "success");
  };

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
      onClick={handleClick}
    >
      <LogOut />
      <Text>Log Out</Text>
    </Button>
  );
}
function LogInButton() {
  return (
    <Button
      as={NavLink}
      display="flex"
      gap={4}
      mt="auto"
      px={4}
      alignItems="center"
      colorScheme="transparent"
      style={{ justifyContent: "flex-start" }}
      cursor="pointer"
      color="whiteAlpha.600"
      _hover={{ color: "white" }}
      to="/login"
    >
      <LogIn />
      <Text>Login</Text>
    </Button>
  );
}

export { LogOutButton, LogInButton };
