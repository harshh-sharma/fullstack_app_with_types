import { useState } from "react";
import DashboardLayout from "../layouts/layout";
import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from "../store/slices/auth.slice";
import type { AppDispatch } from "../store/appStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((store:any) => store.auth.loading);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const res = await dispatch(registerThunk({name:formData?.name,email:formData?.email,password:formData?.password}));
    
     if (registerThunk.fulfilled.match(res)) {
      toast.success(res.payload?.message || "Registration successful!");
      navigate("/");
    } else if (registerThunk.rejected.match(res)) {
      toast.error(res.payload || "Registration failed!");
    }
    // Add register API call here
  };

  return (
    <DashboardLayout>
      <div className="flex justify-center items-center h-full">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Create an Account ✨
          </h2>
          <p className="text-gray-500 text-center mb-8">
            Fill in your details to get started
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:outline-none"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:outline-none"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-medium mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:outline-none"
                placeholder="Re-enter your password"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-800 text-white py-2 rounded-md font-semibold hover:bg-gray-900 transition duration-200"
            >
              {loading ? "Registering..." : "Register"}
            </button>

            <p className="text-center text-gray-500 mt-4">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-gray-800 font-semibold hover:underline"
              >
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Register;
