import { useEffect, useReducer, useState } from "react";
import bgImage from "/assets/login.jpg";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../../Features/User/UserSlice";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector((state) => state.user);
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    if (!form) return null;
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      dispatch({
        type: "SET_ERROR",
        value: "Please fill in all required fields.",
      });
      alert("Please fill in all required fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      dispatch({
        type: "SET_ERROR",
        value: "Passwords do not match.",
      });
      alert("Passwords do not match.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users?.some((u) => u.email === form.email)) {
      dispatch({ type: "SET_ERROR", value: "Email already registered." });
      return;
    }
    users?.push({
      name: form.name,
      email: form.email,
      password: form.password,
      role: "user",
    });

    localStorage.setItem("users", JSON.stringify(users));
    // Here you can call API to save user
    console.log("User registered:", form);

    // Reset form and show success
    dispatch({ type: "CLEAR_ERROR" });

    dispatch(registerUser(form));

    navigate("/");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="max-w-md w-full mx-auto p-5 mt-10">
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

        {form.error && (
          <p className="mb-4 text-red-600 text-2xl font-semibold text-center">
            {form.error}
          </p>
        )}

        {form.success && (
          <p className="mb-4 text-green-600 text-2xl font-semibold text-center">
            {form.success}
          </p>
        )}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 space-y-4"
        >
          <div>
            <label className="block font-semibold mb-1">Name*</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Email*</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Password*</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">
              Confirm Password*
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-b from-orange-400 to-orange-500 text-white px-6 py-2 rounded-lg hover:scale-105 hover:to-orange-600 transition-all duration-300 w-full"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
