import { Card, Flex, Text, Box, Image } from "@chakra-ui/react";
import { Github, Linkedin, Facebook, Instagram } from "lucide-react";

export default function CardFooter() {
  return (
    <Card
      as={Flex}
      basis="10%"
      direction="column"
      gap={4}
      p={4}
      bg="lighterNewBg"
      color="white"
    >
      <Flex gap={4}>
        <Text>
          Developed by{" "}
          <Text as="span" fontWeight={600}>
            Fathan MK
          </Text>
        </Text>
        <Text>•</Text>
        <Box as={Flex} align="center" gap={1}>
          <Github />
          <Linkedin />
          <Facebook />
          <Instagram />
        </Box>
      </Flex>
      <Flex gap={2} align="center" color="whiteAlpha.600">
        <Text fontSize="xs">Powered by</Text>
        <Image display="inline" h="16px" src="/images/dumbways.png" />
        <Text fontSize="xs">Dumbways Indonesia</Text>
        <Text>•</Text>
        <Text fontSize="xs">#1 Coding Bootcamp</Text>
      </Flex>
    </Card>
  );
}
