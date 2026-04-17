import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/Auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/products");
    } catch (error) {
      alert("Credenciales incorrectas");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input name="username" onChange={handleChange} placeholder="Usuario" />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
