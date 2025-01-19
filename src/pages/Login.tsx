import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../lib/api";

function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await loginUser(email, password);

      if (response.data?.accessToken) {
        localStorage.setItem("token", response.data?.accessToken);
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 shadow-lg hover:shadow-xl rounded-lg w-full max-w-lg sm:p-8 transition-shadow">
        <h1 className="text-3xl text-center font-semibold text-blue-500 mb-4">
          Login
        </h1>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="john@doe.com"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              minLength={8}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="**************"
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-9 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <Link
              to="/forgot-password"
              className="inline-block align-baseline  text-xs text-blue-500 ml-2 hover:text-blue-800"
            >
              Forgot Password?
            </Link>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm">
            Don't have an account yet?{" "}
            <Link
              to="/signup"
              className="text-blue-500 hover:text-blue-800 font-bold"
            >
              Sign Up
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
