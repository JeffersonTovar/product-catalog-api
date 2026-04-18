import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import {
  Container, TextField, Button, Typography, Paper, Stack
} from "@mui/material";

export default function ProductForm() {
  const [form, setForm] = useState({
    productName: "",
    unitPrice: "",
    unitsInStock: "",
    categoryName: ""
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      axiosClient.get(`/Product/${id}`)
        .then(res => setForm(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await axiosClient.put("/Product", form);
      } else {
        await axiosClient.post("/Product", form);
      }
      navigate("/products");
    } catch (err) {
      console.error(err);
      alert("Error al guardar");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" mb={2}>
          {isEdit ? "Editar Producto" : "Crear Producto"}
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Nombre"
            name="productName"
            value={form.productName}
            onChange={handleChange}
          />

          <TextField
            label="Precio"
            name="unitPrice"
            value={form.unitPrice}
            onChange={handleChange}
          />

          <TextField
            label="Stock"
            name="unitsInStock"
            value={form.unitsInStock}
            onChange={handleChange}
          />

          <TextField
            label="Categoría"
            name="categoryName"
            value={form.categoryName}
            onChange={handleChange}
          />

          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={handleSubmit}>
              Guardar
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/products")}
            >
              Cancelar
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}
