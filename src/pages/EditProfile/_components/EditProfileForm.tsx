import {
  Box,
  Input,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
  Flex,
  Image,
  Button,
  Avatar,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosFetch from "@/config/axiosFetch";
import { useNavigate, useParams } from "react-router-dom";
import useToast from "@/hooks/useToast";

interface IEditProfileValues {
  full_name: string;
  username: string;
  email: string;
  bio: string;
  photo_profile: string | File;
  banner_profile: string | File;
}

interface IEditProfileProps {
  full_name: string;
  username: string;
  bio: string;
  photo_profile: string;
  banner_profile: string;
  accessToken: string;
}

export default function EditProfileForm({
  photo_profile,
  banner_profile,
  accessToken,
  bio,
  full_name,
  username,
}: IEditProfileProps) {
  const formData = new FormData();
  const { userId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();
  const [imageProfile, setImageProfile] = useState<string | File | null>(
    photo_profile
  );
  const [bannerProfile, setBannerProfile] = useState<string | File | null>(
    banner_profile
  );
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IEditProfileValues>({
    defaultValues: {
      full_name,
      username,
      bio,
    },
  });

  const handlePhotoProfile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageProfile(file);
    }
  };

  const handleBannerProfile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerProfile(file);
    }
  };

  const mutation = useMutation({
    mutationFn: (editedProfle: any) =>
      axiosFetch.put("/updateProfileUser", editedProfle, {
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

  const onSubmit = (data: IEditProfileValues) => {
    formData.append("full_name", data.full_name);
    formData.append("username", data.username);
    formData.append("bio", data.bio);
    formData.append("photo_profile", imageProfile as string | File);
    formData.append("banner_profile", bannerProfile as string | File);
    mutation.mutate(formData);
  };
  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Box as={Flex} direction="column" gap={5}>
        <FormControl isInvalid={Boolean(errors.full_name)}>
          <FormLabel>
            <Text>
              Full Name{" "}
              <Text as="span" color="red">
                *
              </Text>
            </Text>
          </FormLabel>
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
        <FormControl isInvalid={Boolean(errors.username)}>
          <FormLabel>
            <Text>
              Username{" "}
              <Text as="span" color="red">
                *
              </Text>
            </Text>
          </FormLabel>
          <Input
            id="username"
            placeholder="Username"
            {...register("username", {
              required: "Username is required!",
            })}
          />
          <FormErrorMessage>
            {errors.username && errors.username.message?.toString()}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.bio)}>
          <FormLabel>
            <Text>
              Bio{" "}
              <Text as="span" color="red">
                *
              </Text>
            </Text>
          </FormLabel>
          <Textarea
            id="bio"
            placeholder="Bio"
            resize="none"
            {...register("bio", {
              required: "bio is required!",
            })}
          />
          <FormErrorMessage>
            {errors.bio && errors.bio.message?.toString()}
          </FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>
            <Text>
              Banner{" "}
              <Text as="span" color="red">
                *
              </Text>
            </Text>
          </FormLabel>
          {bannerProfile ? (
            <Box as={Flex} align="center" justify="center">
              <Box w="full" position="relative">
                <Button
                  bg="transparent"
                  _hover={{ bg: "transparent" }}
                  position="absolute"
                  top={0}
                  right={0}
                  onClick={() => setBannerProfile(null)}
                >
                  <X color="white" />
                </Button>
                <Image
                  borderRadius="lg"
                  objectFit="cover"
                  w="full"
                  h="200px"
                  src={
                    typeof bannerProfile === "object"
                      ? URL.createObjectURL(bannerProfile)
                      : (bannerProfile as string)
                  }
                />
              </Box>
            </Box>
          ) : (
            <Input
              id="banner-profile"
              name="bannerProfile"
              type="file"
              border="none"
              pl={0}
              onChange={handleBannerProfile}
            />
          )}
        </FormControl>
        <FormControl>
          <FormLabel>
            <Text>
              Photo Profile{" "}
              <Text as="span" color="red">
                *
              </Text>
            </Text>
          </FormLabel>
          {imageProfile ? (
            <Box as={Flex} gap={4} align="center">
              <Avatar
                size="sm"
                src={
                  typeof imageProfile === "object"
                    ? URL.createObjectURL(imageProfile)
                    : (imageProfile as string)
                }
              />
              <Avatar
                src={
                  typeof imageProfile === "object"
                    ? URL.createObjectURL(imageProfile)
                    : (imageProfile as string)
                }
              />
              <Avatar
                size="lg"
                src={
                  typeof imageProfile === "object"
                    ? URL.createObjectURL(imageProfile)
                    : (imageProfile as string)
                }
              />
              <Avatar
                size="xl"
                src={
                  typeof imageProfile === "object"
                    ? URL.createObjectURL(imageProfile)
                    : (imageProfile as string)
                }
              />
              <Button colorScheme="red" onClick={() => setImageProfile(null)}>
                Remove
              </Button>
            </Box>
          ) : (
            <Input
              id="photo-profile"
              name="photoProfile"
              type="file"
              border="none"
              pl={0}
              onChange={handlePhotoProfile}
            />
          )}
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
