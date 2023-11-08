import axiosFetch from "@/config/axiosFetch";
import {
  Box,
  Input,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useToast from "@/hooks/useToast";

interface IEditEmailValues {
  old_email: string;
  new_email: string;
}

interface IEditEmailProps {
  email: string;
  accessToken: string;
}

export default function EditEmailForm({ email, accessToken }: IEditEmailProps) {
  const { userId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IEditEmailValues>({
    defaultValues: {
      old_email: email,
    },
  });
  const [loading, setLoading] = useState(false);
  const mutation = useMutation({
    mutationFn: (newEmail: any) =>
      axiosFetch.put("/updateEmailUser", newEmail, {
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
    mutation.mutate({ email: data.new_email });
  };
  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Box as={Flex} direction="column" gap={5}>
        <FormControl isInvalid={Boolean(errors.old_email)}>
          <FormLabel>
            <Text>
              Old Email{" "}
              <Text as="span" color="red">
                *
              </Text>
            </Text>
          </FormLabel>
          <Input
            id="old-email"
            placeholder="Old Email"
            {...register("old_email", {
              required: "Old Email is required!",
            })}
          />
          <FormErrorMessage>
            {errors.old_email && errors.old_email.message?.toString()}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.new_email)}>
          <FormLabel>
            <Text>
              New Email{" "}
              <Text as="span" color="red">
                *
              </Text>
            </Text>
          </FormLabel>
          <Input
            id="new-email"
            placeholder="New Email"
            {...register("new_email", {
              required: "New Email is required!",
            })}
          />
          <FormErrorMessage>
            {errors.new_email && errors.new_email.message?.toString()}
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
