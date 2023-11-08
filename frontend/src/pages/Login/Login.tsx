import {
  Flex,
  Text,
  Box,
  Input,
  FormControl,
  FormErrorMessage,
  Button,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { EyeIcon, EyeOff } from "lucide-react";
import { NavLink } from "react-router-dom";
import useLogin from "./hooks/useLogin";

export default function Register() {
  const {
    // REACT HOOK FORM
    handleSubmit,
    register,
    errors,
    onSubmit,
    // STATE HANDLE SHOW PASSWORD
    handleShowPassword,
    showPassword,
    // MUTATION TANSTACK
    mutation,
  } = useLogin();

  return (
    <Flex h="100vh" align="center" justify="center" bg="newBg">
      <Flex direction="column" gap={4} maxW="400px" w="400px">
        <Text color="accent" fontWeight={700} fontSize="4xl">
          circle
        </Text>
        <Text color="white" fontWeight={700} fontSize="4xl">
          login circle account
        </Text>
        <Box as="form" color="white" onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap={4}>
            <FormControl isInvalid={Boolean(errors.email)}>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required!",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address!",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message?.toString()}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.password)}>
              <InputGroup>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required!",
                    minLength: {
                      value: 8,
                      message: "Password is minimum 8 characters!",
                    },
                  })}
                />
                <InputRightElement>
                  <Button
                    size="sm"
                    px={2}
                    bg="transparent"
                    _hover={{ bg: "transparent" }}
                    onClick={handleShowPassword}
                  >
                    {showPassword ? (
                      <EyeIcon size="20" color="white" />
                    ) : (
                      <EyeOff size="20" color="white" />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors.password && errors.password.message?.toString()}
              </FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              bg="accent"
              fontWeight={600}
              color="white"
              borderRadius="full"
              _hover={{ bg: "purple" }}
            >
              {mutation.isPending ? <Spinner /> : "Login"}
            </Button>
            <Text align="center" fontSize="lg">
              Didn't have an account?{" "}
              <Text as={NavLink} to="/register" color="accent" fontWeight={600}>
                Register
              </Text>
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}
