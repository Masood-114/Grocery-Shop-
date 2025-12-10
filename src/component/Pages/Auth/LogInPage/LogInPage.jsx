import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginimage from "/assets/login.jpg";
import Heading from "../../../Heading/Heading";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../../Features/User/UserSlice";

const initialState = {
  password: "",
  email: "",
};

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const { user, loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (!user) return;

    if (user.role === "admin") navigate("/admin");
    else navigate("/");
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) alert("Please put Email & Password");

    const result = dispatch(loginUser(form));
    if (loginUser.fulfilled.match(result)) {
      const userData = result.payload;
      localStorage.setItem("user", JSON.stringify(userData));
      if (result.payload.role === "admin") navigate("/admin");
      else navigate("/");
    } else {
      console.log("Login failed:", result.payload);
    }
  };

  return (
    <div
      className="min-h-screen  bg-cover bg-center flex  "
      style={{
        backgroundImage: `url(${loginimage})`,
      }}
    >
      <div className=" max-w-md w-full mx-auto  p-5 mt-10  ">
        <Heading highlight="Log" heading="In" />

        {error && (
          <p className="text-red-500 font-semibold text-center mb-4 mt-5 text-3xl">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 space-y-4 mt-10"
        >
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-b from-orange-400 to-orange-500 text-white px-6 py-2 rounded-lg hover:scale-105 hover:to-orange-600 transition-all duration-300 w-full"
          >
            Login
          </button>
        </form>

        <p className="text-center text-xl mt-5 text-gray-600">
          Don't have an account?
          <a href="/register" className="text-white font-semibold">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
