import {
  Box,
  TextField,
  Button,
  MenuItem
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

export default function ProductsTable() {
  const [rows, setRows] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);

  const navigate = useNavigate();

  const fetch = async () => {
    const res = await axiosClient.get("/Product", {
      params: {
        page: page + 1,
        pageSize: 10,
        search,
        categoryId
      }
    });

    setRows(res.data.data);
    setRowCount(res.data.totalCount);
  };

  useEffect(() => {
    fetch();
  }, [page, search, categoryId]);

  useEffect(() => {
    axiosClient.get("/Category").then(r => setCategories(r.data));
  }, []);

  const columns = [
    { field: "productName", headerName: "Producto", flex: 1 },
    { field: "unitPrice", headerName: "Precio", flex: 1 },
    { field: "unitsInStock", headerName: "Stock", flex: 1 },
    { field: "categoryName", headerName: "Categoría", flex: 1 },
    {
      field: "actions",
      renderCell: (params) => (
        <>
          <Button onClick={() => navigate(`/products/edit/${params.row.id}`)}>
            Editar
          </Button>
        </>
      )
    }
  ];

  return (
    <>
      <Box display="flex" gap={2} mb={2}>
        <TextField
          size="small"
          label="Buscar"
          onChange={(e) => setSearch(e.target.value)}
        />

        <TextField
          select
          size="small"
          label="Categoría"
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <MenuItem value="">Todas</MenuItem>
          {categories.map(c => (
            <MenuItem key={c.id} value={c.id}>
              {c.categoryName}
            </MenuItem>
          ))}
        </TextField>

        <Button variant="contained" onClick={() => navigate("/products/create")}>
          Nuevo
        </Button>
      </Box>

      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(r) => r.id}
        paginationMode="server"
        rowCount={rowCount}
        page={page}
        onPageChange={(p) => setPage(p)}
        autoHeight
      />
    </>
  );
}
