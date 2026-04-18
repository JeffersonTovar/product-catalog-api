import { useState } from "react";
import {
  Container, TextField, Button, Typography, Paper
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/Auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);

      navigate("/products");
    } catch (err) {
      alert("Credenciales incorrectas");
      console.error(err);
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1e3c72, #2a5298)"
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 3,
          width: 350,
          textAlign: "center"
        }}
      >
        <Typography variant="h5" mb={2}>Login</Typography>

        <TextField
          fullWidth
          label="Usuario"
          name="username"
          value={form.username}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          margin="normal"
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Ingresar
        </Button>
      </Paper>
    </Container>
  );
}
