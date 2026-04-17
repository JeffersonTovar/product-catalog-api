import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(1);
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/Product", {
        params: {
          page,
          pageSize,
          search: search || null,
          categoryId: categoryId || null
        }
      });

      setProducts(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchProducts();
  }, [page, search, categoryId]);
  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar producto?")) return;

    await axiosClient.delete(`/Product/${id}`);
    fetchProducts();
  };
  return (
    <div>
      <h2>Productos</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {loading ? <p>Cargando...</p> : (
        <table border="1" width="100%">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.productName}</td>
                <td>${p.unitPrice}</td>
                <td>{p.unitsInStock}</td>
                <td>{p.categoryName}</td>
                <td>
                  <Link to={`/products/edit/${p.id}`}>
                    <button>Editar</button>
                  </Link>
                  <button onClick={() => handleDelete(p.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div style={{ marginTop: "20px" }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ⬅ Anterior
        </button>
        <span> Página {page} de {totalPages} </span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Siguiente ➡
        </button>
      </div>
      <br />
      <Link to="/products/create">
        <button>Crear producto</button>
      </Link>
    </div>
  );
}
