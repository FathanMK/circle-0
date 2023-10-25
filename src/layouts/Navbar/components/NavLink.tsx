import { Link } from "@chakra-ui/react";
import { ReactNode } from "react";
import { NavLink as NavLinkRouter, To } from "react-router-dom";

interface NavLinkProps {
  children: ReactNode;
  className: string;
  to: To;
}

export default function NavLink({ children, className, to }: NavLinkProps) {
  return (
    <Link
      className={className}
      as={NavLinkRouter}
      display="flex"
      gap={4}
      px={4}
      py={2}
      alignItems="center"
      colorScheme="transparent"
      cursor="pointer"
      color="whiteAlpha.600"
      _hover={{ color: "white" }}
      to={to}
    >
      {children}
    </Link>
  );
}
