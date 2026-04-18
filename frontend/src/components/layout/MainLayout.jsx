import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <Box display="flex">
      <Sidebar />

      <Box flex={1}>
        <Topbar />
        <Box p={3}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
