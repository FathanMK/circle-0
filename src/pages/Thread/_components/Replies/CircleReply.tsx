import { Avatar, Box, Flex, Text, Button, Image } from "@chakra-ui/react";
import { FloatingOverlay } from "@floating-ui/react";
import { MoreVertical } from "lucide-react";

import useCircleReply from "./hooks/useCircleReply";
import MoreOptions from "@/pages/Home/components/CircleThread/components/MoreOptions";
import getPostedTime from "@/utils/getPostedTime";

interface CircleReplyProps {
  id?: string;
  full_name?: string;
  username?: string;
  content?: string;
  image?: string;
  photo_profile?: string;
  created_at?: string;
}

// TODO: IF IMAGE

export default function CircleReply({
  id,
  full_name,
  username,
  content,
  image,
  photo_profile,
  created_at,
}: CircleReplyProps) {
  const {
    refs,
    getFloatingProps,
    getReferenceProps,
    floatingStyles,
    isMoreOptionOpen,
    setMoreOptionOpen,
  } = useCircleReply();
  return (
    <Box
      as={Flex}
      py={4}
      px={8}
      gap={4}
      borderBottom="1px solid hsl(0 100% 100% / 20%)"
    >
      <Avatar src={photo_profile} />
      <Box w="full">
        <Box as={Flex} gap={2} align="center">
          <Text fontWeight={600} fontSize="lg">
            {full_name}
          </Text>
          <Box
            as="span"
            display="flex"
            gap={2}
            fontSize="sm"
            color="whiteAlpha.600"
          >
            <Text>@{username}</Text>
            <Text>•</Text>
            <Text>{getPostedTime(created_at as string)}</Text>
          </Box>
          <Button
            ref={refs.setReference}
            {...getReferenceProps()}
            ml="auto"
            bg="transparent"
            color="white"
            _hover={{ bg: "none" }}
            onClick={(e) => {
              e.stopPropagation();
              setMoreOptionOpen(!isMoreOptionOpen);
            }}
          >
            <MoreVertical size={20} />
          </Button>
          {isMoreOptionOpen && (
            <FloatingOverlay
              style={{ backgroundColor: "hsl(0 0% 0% / 50%)", zIndex: 999 }}
            >
              <Box
                as={Flex}
                bg="lighterNewBg"
                p={2}
                direction="column"
                alignItems="flex-start"
                gap={1}
                borderRadius="lg"
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
              >
                <MoreOptions id={id as string} />
              </Box>
            </FloatingOverlay>
          )}
        </Box>
        <Box as={Flex} direction="column" gap={4}>
          {content && <Text noOfLines={4}>{content}</Text>}
          {image && (
            <Box py={2}>
              <Image src={image} borderRadius="lg" />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
