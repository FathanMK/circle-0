import {
  Box,
  Flex,
  Button,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EditProfileForm from "./_components/EditProfileForm";
import EditPasswordForm from "./_components/EditPasswordForm";
import EditEmailForm from "./_components/EditEmailForm";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function EditProfile() {
  const navigate = useNavigate();
  const { user, accessToken } = useSelector((state: RootState) => state.user);
  return (
    <>
      <Box as={Flex} align="center" gap={2} p={4}>
        <Button
          bg="transparent"
          color="accent"
          onClick={() => navigate(-1)}
          _hover={{ bg: "none" }}
          _active={{ color: "" }}
        >
          <ArrowLeft size={30} />
        </Button>
        <Text as="h1" fontSize="4xl" px={4} color="accent" fontWeight={700}>
          edit profile
        </Text>
      </Box>
      <Tabs
        isFitted
        borderColor="accent"
        overflow="hidden"
        display="flex"
        flexDirection="column"
      >
        <TabList>
          <Tab
            _selected={{ color: "accent" }}
            _active={{ bg: "transparent" }}
            borderColor="transparent"
          >
            Profile
          </Tab>
          <Tab
            _selected={{ color: "accent" }}
            _active={{ bg: "transparent" }}
            borderColor="transparent"
          >
            Email
          </Tab>
          <Tab
            _selected={{ color: "accent" }}
            _active={{ bg: "transparent" }}
            borderColor="transparent"
          >
            Password
          </Tab>
        </TabList>

        <TabPanels overflow="hidden">
          <TabPanel h="full" overflowY="scroll">
            <EditProfileForm
              accessToken={accessToken!}
              username={user?.username!}
              full_name={user?.full_name!}
              bio={user?.bio!}
              photo_profile={user?.photo_profile!}
              banner_profile={user?.banner_profile!}
            />
          </TabPanel>
          <TabPanel h="full" overflowY="scroll">
            <EditEmailForm email={user?.email!} accessToken={accessToken!} />
          </TabPanel>
          <TabPanel h="full" overflowY="scroll">
            <EditPasswordForm accessToken={accessToken!} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
