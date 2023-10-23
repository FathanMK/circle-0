import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { Heart, MessagesSquare } from "lucide-react";

export default function CircleTweet() {
  return (
    <Box
      as={Flex}
      py={4}
      px={8}
      gap={4}
      borderBottom="1px solid hsl(0 100% 100% / 20%)"
    >
      <Avatar />
      <Box>
        <Box as={Flex} gap={2} align="center">
          <Text fontWeight={600} fontSize="lg">
            Indah Pra Karya
          </Text>
          <Text fontSize="sm" color="whiteAlpha.600">
            <Box as="span" display="flex" gap={2}>
              <Text>@indahpra</Text>
              <Text>•</Text>
              <Text>10h</Text>
            </Box>
          </Text>
        </Box>
        <Box>
          <Text noOfLines={4} fontSize="sm">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid
            labore doloribus adipisci iste sint facilis ullam! Et at architecto
            obcaecati odit itaque adipisci eligendi rerum corporis, ullam
            quibusdam. Repudiandae cumque saepe fuga vel consectetur vero quidem
            facere dolore voluptatem modi, voluptates maiores, similique nostrum
            earum perspiciatis qui laborum ex veritatis.
          </Text>
        </Box>
        <Box as={Flex} gap={4}>
          <Button
            as={Flex}
            gap={2}
            px={0}
            cursor="pointer"
            bg="transparent"
            _hover={{ bg: "none" }}
            color="whiteAlpha.600"
          >
            <Heart className="active-like" size={20} />
            <Text fontSize="sm">100</Text>
          </Button>
          <Button
            as={Flex}
            gap={2}
            px={0}
            cursor="pointer"
            bg="transparent"
            _hover={{ bg: "none" }}
            color="whiteAlpha.600"
          >
            <MessagesSquare size={20} />
            <Text fontSize="sm">
              250 <Text as="span">Replies</Text>
            </Text>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
