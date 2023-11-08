import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Flex,
  Button,
  Input,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { X, ImagePlus } from "lucide-react";
import {
  useState,
  useEffect,
  useCallback,
  MouseEvent,
  ChangeEvent,
} from "react";
import { useSelector } from "react-redux";
import useFetchWithId from "@/hooks/useFetchWithId";
import { RootState } from "@/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosFetch from "@/config/axiosFetch";
import useToast from "@/hooks/useToast";

interface IEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  replyId: string;
  threadId: string;
}

export default function EditModal({
  isOpen,
  onClose,
  replyId,
  threadId,
}: IEditModalProps) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | File | null>("");
  const [isLoading, setLoading] = useState(false);
  const { accessToken } = useSelector((state: RootState) => state.user);
  const { data: replyData } = useFetchWithId({
    queryKey: "reply",
    id: replyId,
    fetchRoute: "/reply",
  });
  const form = new FormData();

  const mutation = useMutation({
    mutationFn: (editedReply: any) => {
      return axiosFetch.put(`/reply/${replyId}`, editedReply, {
        headers: {
          "x-access-token": accessToken,
        },
      });
    },
    onSuccess: () => {
      toast("Please Wait", "Editing Reply!", "info");
      setLoading(true);
      setTimeout(() => {
        toast("Success", "Reply is successfully updated!", "success");
        queryClient.invalidateQueries({ queryKey: ["replies", threadId] });
        onClose();
        setLoading(false);
      }, 3000);
    },
    onError: () => {
      toast("Error", "Failed to update thread!", "error");
    },
  });

  useEffect(() => {
    const reply = replyData?.reply;
    setContent(reply?.content);
    setImage(reply?.image);
  }, [replyData]);

  const handleOnChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleEditThread = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (content === "" && image === "") {
      toast("Error", "Reply cannot be empty!", "error");
      return;
    }
    //@ts-ignore
    form.append("image", image);
    form.append("content", content);
    mutation.mutate(form);
  };

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setImage(file);
      }
    },
    []
  );

  const handleFileUpload = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.id = "image";
    input.name = "image";
    //@ts-ignore
    input.onchange = handleFileChange;
    input.click();
  }, [handleFileChange]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent
        bg="lighterNewBg"
        color="white"
        maxH="500px"
        overflowY="scroll"
      >
        <ModalHeader color="accent">edit reply</ModalHeader>
        <ModalCloseButton color="accent" />
        <ModalBody>
          <Box as={Flex} direction="column" gap={4}>
            <Input
              pl="0"
              value={content}
              border="none"
              placeholder="What is happening!?"
              _focusVisible={{ border: "none" }}
              onChange={handleOnChangeContent}
            />
            {image && (
              <Box as={Flex} align="center" justify="center">
                <Box w="full" position="relative">
                  <Button
                    bg="transparent"
                    _hover={{ bg: "transparent" }}
                    position="absolute"
                    top={0}
                    right={0}
                    onClick={() => setImage(null)}
                  >
                    <X color="white" />
                  </Button>
                  <Image
                    borderRadius="lg"
                    objectFit="cover"
                    w="full"
                    src={
                      typeof image === "string"
                        ? (image as string)
                        : URL.createObjectURL(image)
                    }
                  />
                </Box>
              </Box>
            )}
          </Box>
        </ModalBody>
        <ModalFooter alignItems="center" justifyContent="space-between">
          {!image && (
            <Box
              as={Button}
              bg="transparent"
              cursor="pointer"
              color="#04a51e"
              pl={0}
              _hover={{ color: "purple", bg: "transparent" }}
              onClick={handleFileUpload}
            >
              <ImagePlus style={{ transition: "color 150ms ease-in-out" }} />
            </Box>
          )}
          <Button
            isDisabled={isLoading}
            bg="accent"
            color="white"
            borderRadius="full"
            w="100px"
            ml={image ? "auto" : 0}
            _hover={{ bg: " purple" }}
            onClick={handleEditThread}
          >
            {mutation.isPending ? <Spinner /> : "EDIT"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
