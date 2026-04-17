import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Products from "../pages/Products";
import ProductForm from "../pages/ProductForm";
import PrivateRoute from "./PrivateRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />

        <Route
          path="/products/create"
          element={
            <PrivateRoute>
              <ProductForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/products/edit/:id"
          element={
            <PrivateRoute>
              <ProductForm />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
