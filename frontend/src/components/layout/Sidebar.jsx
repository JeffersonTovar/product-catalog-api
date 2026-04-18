import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 240,
        height: "100vh",
        background: "#1e293b",
        color: "#fff",
        p: 2
      }}
    >
      <h2>Catalog</h2>
      <List>
        <ListItemButton onClick={() => navigate("/products")}>
          <ListItemText primary="Productos" />
        </ListItemButton>
      </List>
    </Box>
  );
}
