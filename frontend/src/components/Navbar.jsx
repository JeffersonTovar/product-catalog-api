import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }}>
          Catalog App
        </Typography>

        <Button color="inherit" onClick={logout}>
          Cerrar sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
}
