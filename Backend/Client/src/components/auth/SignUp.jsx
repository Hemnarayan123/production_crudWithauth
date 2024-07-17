import React from "react";
import { useState } from "react";
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { summaryAPI } from "../../common/index.js";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      toast.error("All fields are required", {
        duration: 3000,
      });
      return;
    }

    try {
      const response = await axios.post(summaryAPI.signUp.url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response:", response.data);

      if (response.status === 200 || response.status === 201) {
        toast.success("Sign Up Success", {
          duration: 3000,
        });
        navigate("/signin");
      } else {
        toast.error("Sign Up Error", {
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen rgb(25, 22, 22) p-4 sm:p-6 lg:p-8">
      <div className="bg-gray-600 p-6 sm:p-8 lg:p-10 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-100">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-100 mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-3 py-2 border rounded"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-100 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-100 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-3 pt-8 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <span>{showPassword ? <RiEyeLine /> : <RiEyeCloseLine />}</span>
            </div>
          </div>
    
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="p-4 bg-gray-100   text-gray-900 font-bold py-2 rounded hover:bg-gray-300 transition duration-300"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
