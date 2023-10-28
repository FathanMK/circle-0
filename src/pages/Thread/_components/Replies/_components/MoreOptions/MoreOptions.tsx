import { useState } from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import {
  useFloating,
  autoUpdate,
  offset,
  useClick,
  useDismiss,
  useInteractions,
  FloatingOverlay,
} from "@floating-ui/react";
import { MoreVertical } from "lucide-react";
import Options from "./_component/Options";

export default function MoreOptions({ replyId }: { replyId: string }) {
  const [isMoreOptionOpen, setMoreOptionOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    whileElementsMounted: autoUpdate,
    open: isMoreOptionOpen,
    onOpenChange: setMoreOptionOpen,
    placement: "bottom-end",
    middleware: [
      offset({
        mainAxis: -30,
        crossAxis: -22,
      }),
    ],
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);
  return (
    <>
      <Button
        size="sm"
        ref={refs.setReference}
        {...getReferenceProps()}
        px={0}
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
            <Options replyId={replyId} />
          </Box>
        </FloatingOverlay>
      )}
    </>
  );
}
