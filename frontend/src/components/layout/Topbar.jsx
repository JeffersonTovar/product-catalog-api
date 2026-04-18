import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Box
      sx={{
        height: 60,
        background: "#fff",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        px: 3,
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
      }}
    >
      <Button variant="contained" onClick={logout}>
        Logout
      </Button>
    </Box>
  );
}
