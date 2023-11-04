import { Grid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "@/layouts/Navbar/Navbar";
import Timeline from "@/layouts/Timeline/Timeline";
import Sidebar from "@/layouts/Sidebar/Sidebar";
import { RootState } from "@/store";
import axiosFetch from "@/config/axiosFetch";
import { getUser, logout } from "@/slices/user/userSlice";

export default function Layout() {
  const { accessToken } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const sse = new EventSource("http://localhost:5000/api/v1/notifications");

    sse.onopen = (e) => console.log("Connect Successfully: ", e);
    sse.onmessage = (e) => console.log("Data from the server: ", e);
    sse.onerror = () => {
      console.log("Something went wrong");
      sse.close();
    };

    return () => {
      sse.close();
    };
  }, []);

  // GET USER TO REDUX
  const { isError } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axiosFetch.get("/user", {
        headers: {
          "x-access-token": accessToken,
        },
      });
      dispatch(getUser(data.user));
      return data;
    },
  });

  if (isError) dispatch(logout());

  return (
    <Grid
      h="100vh"
      maxH="100vh"
      bg="newBg"
      color="white"
      templateColumns="repeat(6, 1fr)"
      templateRows="repeat(5, 1fr)"
      columnGap={0}
      rowGap={0}
      overflow="hidden"
    >
      <Navbar />
      <Timeline>
        <Outlet />
      </Timeline>
      <Sidebar />
    </Grid>
  );
}
