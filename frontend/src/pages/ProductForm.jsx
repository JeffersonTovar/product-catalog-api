import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = !!id;

  const [form, setForm] = useState({
    productName: "",
    unitPrice: "",
    unitsInStock: "",
    categoryId: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // 🔥 cargar producto si es edición
  useEffect(() => {
    if (isEdit) {
      setLoading(true);

      axiosClient.get(`/Product/${id}`)
        .then(res => {
          setForm({
            productName: res.data.productName || "",
            unitPrice: res.data.unitPrice || "",
            unitsInStock: res.data.unitsInStock || "",
            categoryId: res.data.categoryId || ""
          });
        })
        .catch(err => {
          console.error(err);
          alert("Error cargando producto");
        })
        .finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  // 🔥 manejar cambios
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 validaciones
  const validate = () => {
    let newErrors = {};

    if (!form.productName.trim()) {
      newErrors.productName = "El nombre es obligatorio";
    }

    if (!form.unitPrice || Number(form.unitPrice) <= 0) {
      newErrors.unitPrice = "El precio debe ser mayor a 0";
    }

    if (form.unitsInStock < 0) {
      newErrors.unitsInStock = "Stock inválido";
    }

    if (!form.categoryId) {
      newErrors.categoryId = "La categoría es obligatoria";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔥 submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      if (isEdit) {
        await axiosClient.put("/Product", { ...form, id });
      } else {
        await axiosClient.post("/Product", form);
      }

      navigate("/products");

    } catch (error) {
      console.error(error);
      alert("Error al guardar producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{isEdit ? "Editar Producto" : "Crear Producto"}</h2>

      {loading && <p>Cargando...</p>}

      <form onSubmit={handleSubmit}>

        {/* Nombre */}
        <div>
          <input
            name="productName"
            placeholder="Nombre"
            value={form.productName}
            onChange={handleChange}
          />
          {errors.productName && <p>{errors.productName}</p>}
        </div>

        {/* Precio */}
        <div>
          <input
            name="unitPrice"
            type="number"
            placeholder="Precio"
            value={form.unitPrice}
            onChange={handleChange}
          />
          {errors.unitPrice && <p>{errors.unitPrice}</p>}
        </div>

        {/* Stock */}
        <div>
          <input
            name="unitsInStock"
            type="number"
            placeholder="Stock"
            value={form.unitsInStock}
            onChange={handleChange}
          />
          {errors.unitsInStock && <p>{errors.unitsInStock}</p>}
        </div>

        {/* Categoría */}
        <div>
          <input
            name="categoryId"
            placeholder="CategoryId"
            value={form.categoryId}
            onChange={handleChange}
          />
          {errors.categoryId && <p>{errors.categoryId}</p>}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </button>

      </form>
    </div>
  );
}
