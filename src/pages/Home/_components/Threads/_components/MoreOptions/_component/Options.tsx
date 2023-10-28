import { MouseEvent } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { Pencil, Trash } from "lucide-react";

export default function Options({ threadId }: { threadId: string }) {
  // const toast = useToast();
  // const queryClient = useQueryClient();
  // const mutation = useMutation({
  //   mutationFn: () => {
  //     return axiosFetch.delete(`/thread/${id}`);
  //   },
  //   onSuccess: (data) => {
  //     toast("Success", data.data.message, "success");
  //     queryClient.invalidateQueries({ queryKey: ["threads-cache"] });
  //   },
  //   onError: () => {
  //     toast("Error", "Failed to delete thread", "error");
  //   },
  // });

  const handleDeleteThread = (e: MouseEvent<HTMLButtonElement>) => {
    // e.stopPropagation();
    // mutation.mutate();
  };

  return (
    <>
      <Button
        as={Flex}
        gap={2}
        color="teal"
        bg="transparent"
        _hover={{ bg: "transparent" }}
      >
        <Pencil />
        <Text>Edit</Text>
      </Button>
      <Button
        as={Flex}
        gap={2}
        color="red"
        bg="transparent"
        _hover={{ bg: "transparent" }}
        onClick={handleDeleteThread}
      >
        <Trash />
        <Text>Delete</Text>
      </Button>
    </>
  );
}
