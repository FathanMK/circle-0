import {
  Text,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Following from "./_component/Following";

export default function Follows() {
  return (
    <>
      <Text as="h1" fontSize="4xl" p={4} px={8} color="accent" fontWeight={600}>
        follows
      </Text>
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
            Following
          </Tab>
          <Tab
            _selected={{ color: "accent" }}
            _active={{ bg: "transparent" }}
            borderColor="transparent"
          >
            Followers
          </Tab>
        </TabList>
        <TabPanels overflow="hidden">
          <TabPanel h="full" overflowY="scroll">
            <Following />
          </TabPanel>
          <TabPanel>
            <Text>Followers</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
