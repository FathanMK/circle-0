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
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { FormEvent, useState } from "react";
import useToast from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import axiosFetch from "@/config/axiosFetch";

interface RegisterFormValues {
  full_name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm<RegisterFormValues>();
  const toast = useToast();
  const mutation = useMutation({
    mutationFn: (newUser: User) => {
      return axiosFetch.post("/register", newUser);
    },
    onSuccess: (data) => {
      toast("Success", data.data.message, "success");
      reset();
    },
    onError: (error) => toast("Error", error.message, "error"),
  });

  const onSubmit = (data: RegisterFormValues) => {
    mutation.mutate(data);
  };

  const handleConfirmPassword = () => {
    setShowPassword((prevState) => (prevState = !showPassword));
  };

  return (
    <Flex h="100vh" align="center" justify="center" bg="newBg">
      <Flex direction="column" gap={4} maxW="400px" w="400px">
        <Text color="accent" fontWeight={700} fontSize="4xl">
          circle
        </Text>
        <Text color="white" fontWeight={700} fontSize="4xl">
          create circle account
        </Text>
        <Box as="form" color="white" onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap={4}>
            <FormControl isInvalid={Boolean(errors.full_name)}>
              <Input
                id="full_name"
                placeholder="Full Name"
                {...register("full_name", {
                  required: "Full Name is required!",
                })}
              />
              <FormErrorMessage>
                {errors.full_name && errors.full_name.message?.toString()}
              </FormErrorMessage>
            </FormControl>
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
                    onClick={handleConfirmPassword}
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
            <FormControl isInvalid={Boolean(errors.confirmPassword)}>
              <InputGroup>
                <Input
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  type={showPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Confirm Password is required!",
                    validate: (val: string) => {
                      if (watch("password") != val) {
                        return "Password didn't match";
                      }
                    },
                  })}
                />
                <InputRightElement>
                  <Button
                    size="sm"
                    px={2}
                    bg="transparent"
                    _hover={{ bg: "transparent" }}
                    onClick={handleConfirmPassword}
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
                {errors.confirmPassword &&
                  errors.confirmPassword.message?.toString()}
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
              {mutation.isPending ? <Spinner /> : "Register"}
            </Button>
            <Text align="center" fontSize="lg">
              Already have an account?{" "}
              <Text as={NavLink} to="/login" color="accent" fontWeight={600}>
                Login
              </Text>
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}
