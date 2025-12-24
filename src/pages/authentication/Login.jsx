import React, { useState } from "react";
import axios from "axios";
import foto from "./Pasta-bro.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginSuccess = (userData) => {
    toast.success("Login successful!");
    setSuccess("Login successful!");
    localStorage.setItem("Authrole", userData.role || "User");
    localStorage.setItem("Authname", userData.username || userData.name);
    localStorage.setItem("Authid", userData.id);
    localStorage.setItem("Loggedin", true);
    setError("");

    window.location.replace("/");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError("Please fill in both username and password.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8888/letuscook/backend/dashboard/users.php",
        {
          ...formData,
          action: "login",
        }
      );

      if (res.data.status === "success") {
        handleLoginSuccess(res.data.user);
      } else {
        setError(res.data.error || "Login failed.");
        setSuccess("");
      }
    } catch (err) {
      setError("An error occurred during login.");
      setSuccess("");
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log(decoded);

      const res = await axios.post(
        "http://localhost:8888/letuscook/backend/dashboard/users.php",
        {
          action: "google_login",
          google_id: decoded.sub,
          name: decoded.name,
          email: decoded.email,
          picture: decoded.picture,
        }
      );

      if (res.data.status === "success") {
        handleLoginSuccess(res.data.user);
      } else {
        setError(res.data.error || "Google login failed.");
      }
    } catch (error) {
      console.error("Google login error:", error);
      setError("Failed to login with Google.");
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
            <div className="border border-slate-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
              <form className="space-y-6" onSubmit={handleLogin}>
                <div className="mb-6">
                  <h3 className="text-[#e59d2c] text-3xl font-semibold">
                    Sign in
                  </h3>
                  <p className="text-slate-500 text-sm mt-6 leading-relaxed">
                    Sign in to your account and explore a world of
                    possibilities.
                  </p>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-600 text-sm">{success}</p>}

                <div>
                  <label className="text-[#e59d2c] text-sm font-medium mb-2 block">
                    User name
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      className="w-full text-sm text-[#e59d2c] border border-slate-300 pl-4 pr-10 py-3 rounded-lg outline-[#e59d2c]"
                      placeholder="Enter user name"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[#e59d2c] text-sm font-medium mb-2 block">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full text-sm text-[#e59d2c] border border-slate-300 pl-4 pr-10 py-3 rounded-lg outline-[#e59d2c]"
                      placeholder="Enter password"
                    />
                  </div>
                  <Link
                    to="/login/enteremail"
                    className="text-blue-500 text-[12px] ml-1 mt-1 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="!mt-12">
                  <button
                    type="submit"
                    className="w-full shadow-xl py-2.5 px-4 text-[15px] font-medium tracking-wide rounded-lg text-white bg-[#e59d2c] hover:bg-white hover:text-[#e59d2c] focus:outline-none"
                  >
                    Sign in
                  </button>

                  <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-slate-500">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>

                  <div className="flex justify-center">
                    <GoogleLogin
                      onSuccess={handleGoogleLogin}
                      onError={() => {
                        console.error("Google Login failed");
                        setError(
                          "Google login failed. Please try again or use email login."
                        );
                      }}
                      useOneTap
                      auto_select
                      ux_mode="popup"
                      cookiePolicy="single_host_origin"
                    />
                  </div>

                  <Link
                    to="/signup"
                    className="text-sm !mt-6 text-center text-slate-500 "
                  >
                    Don't have an account?{" "}
                    <a
                      href="#"
                      className="text-blue-600 font-medium hover:underline ml-1 whitespace-nowrap cursor-poiner"
                    >
                      Register here
                    </a>
                  </Link>
                </div>
              </form>
            </div>

            <div className="max-md:mt-8">
              <img
                src={foto}
                className="w-full max-md:w-4/5 mx-auto block object-cover"
                alt="login img"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
