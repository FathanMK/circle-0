import axiosFetch from "@/config/axiosFetch";
import useToast from "@/hooks/useToast";
import {
  Box,
  Input,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
  Flex,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { EyeOff, EyeIcon } from "lucide-react";

interface IEditPasswordValues {
  old_password: string;
  new_password: string;
  new_passwordConfirm: string;
}

interface IEditPasswordProps {
  accessToken: string;
}

export default function EditPasswordForm({ accessToken }: IEditPasswordProps) {
  const { userId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<IEditPasswordValues>();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const mutation = useMutation({
    mutationFn: (newPassword: any) =>
      axiosFetch.put(`/updatePasswordUser`, newPassword, {
        headers: {
          "x-access-token": accessToken,
        },
      }),
    onMutate: () => {
      toast("Please Wait", "Updating Profile!", "info", 5000);
      setLoading(true);
    },
    onSuccess: () => {
      setTimeout(() => {
        toast("Success", "Profile is successfully updated", "success");
        queryClient.invalidateQueries({ queryKey: ["user"] });
        navigate(`/profile/${userId}`);
        setLoading(false);
      }, 5000);
    },
    onError: (error) => {
      //@ts-ignore
      toast("Error", error.response.data.message, "error");
      setLoading(false);
    },
  });
  const onSubmit = (data: any) => {
    mutation.mutate({
      newPassword: data.new_password,
      oldPassword: data.old_password,
    });
  };
  const handleShowPassword = () => {
    //@ts-ignore
    setShowPassword((prevState) => (prevState = !showPassword));
  };
  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Box as={Flex} direction="column" gap={5}>
        <FormControl isInvalid={Boolean(errors.old_password)}>
          <FormLabel>
            <Text>
              Old Password{" "}
              <Text as="span" color="red">
                *
              </Text>
            </Text>
          </FormLabel>
          <InputGroup>
            <Input
              id="old-password"
              type={showPassword ? "text" : "password"}
              placeholder="Old Password"
              {...register("old_password", {
                required: "Old Password is required!",
                minLength: {
                  value: 8,
                  message: "Old Password is minimum 8 characters!",
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
            {errors.old_password && errors.old_password.message?.toString()}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.new_password)}>
          <FormLabel>
            <Text>
              New Password{" "}
              <Text as="span" color="red">
                *
              </Text>
            </Text>
          </FormLabel>
          <InputGroup>
            <Input
              id="new-password"
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              {...register("new_password", {
                required: "New Password is required!",
                minLength: {
                  value: 8,
                  message: "New Password is minimum 8 characters!",
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
            {errors.new_password && errors.new_password.message?.toString()}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.new_passwordConfirm)}>
          <FormLabel>
            <Text>
              New Password Confirm{" "}
              <Text as="span" color="red">
                *
              </Text>
            </Text>
          </FormLabel>
          <InputGroup>
            <Input
              id="new-passwordConfirm"
              type={showPassword ? "text" : "password"}
              placeholder="New Password Confirm"
              {...register("new_passwordConfirm", {
                required: "New Password Confirm is required!",
                minLength: {
                  value: 8,
                  message: "New Password is minimum 8 characters!",
                },
                validate: (val: string) => {
                  if (watch("new_password") != val) {
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
            {errors.new_passwordConfirm &&
              errors.new_passwordConfirm.message?.toString()}
          </FormErrorMessage>
        </FormControl>
        <Button
          isDisabled={loading}
          bg="accent"
          color="white"
          mt={5}
          _active={{ bg: "none" }}
          _hover={{ bg: "purple" }}
          type="submit"
        >
          Edit
        </Button>
      </Box>
    </Box>
  );
}
