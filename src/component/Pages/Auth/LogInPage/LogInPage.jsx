import { useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginimage from "/assets/login.jpg";
import Heading from "../../../Heading/Heading";

const initialState = {
  password: "",
  email: "",
};
function myReducer(state, action) {
  if (action.name) {
    return {
      ...state,
      [action.name]: action.value,
    };
  }
  if (action.type === "SET_ERROR") {
    return {
      ...state,
      error: action.value,
    };
  }
  if (action.type === "CLEAR_ERROR") {
    return {
      ...state,
      error: "",
    };
  }

  return state;
}
export default function LoginPage() {
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(myReducer, initialState);
  console.log("LogIn_State", state);

  const handleChange = (e) => {
    dispatch({
      name: e.target.name,
      value: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!state.email || !state.password) {
      dispatch({ type: "SET_ERROR", value: "Please fill all fields." });
      return;
    }

    dispatch({
      type: "CLEAR_ERROR",
    });

    if (state.email === "admin@gmail.com" && state.password === "12345") {
      localStorage.setItem("auth", true);
      navigate("/admin");

      return;
    }
    dispatch({ type: "SET_ERROR", value: "Invaild Admin pass." });
    // Here you can add real login API
    console.log("Login attempted:", state); // redirect to home after login
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

        {state.error && (
          <p className="text-red-500 font-semibold text-center mb-4 mt-5 text-3xl">
            {state.error}
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
              value={state.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={state.password}
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
