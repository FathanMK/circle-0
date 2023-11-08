import { useState } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  useClick,
  useDismiss,
  useInteractions,
} from "@floating-ui/react";

export default function useCircleReply() {
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

  return {
    refs,
    floatingStyles,
    getReferenceProps,
    getFloatingProps,
    isMoreOptionOpen,
    setMoreOptionOpen,
  };
}
