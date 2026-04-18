import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { Link } from "react-router-dom";

import {
  Container,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Pagination,
  Stack
} from "@mui/material";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    try {
      const res = await axiosClient.get(
        `/Product?search=${search}&page=${page}&pageSize=10`
      );

      setProducts(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, page]);

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar producto?")) return;

    await axiosClient.delete(`/Product/${id}`);
    fetchProducts();
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Productos
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField
          label="Buscar producto"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <Link to="/products/create">
          <Button variant="contained">
            Crear
          </Button>
        </Link>
      </Stack>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.productName}</TableCell>
                <TableCell>${p.unitPrice}</TableCell>
                <TableCell>{p.unitsInStock}</TableCell>
                <TableCell>
                  <Link to={`/products/edit/${p.id}`}>
                    <Button size="small">Editar</Button>
                  </Link>

                  <Button
                    color="error"
                    size="small"
                    onClick={() => handleDelete(p.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Stack alignItems="center" sx={{ mt: 3 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Stack>
    </Container>
  );
}
