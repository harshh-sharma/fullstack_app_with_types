import  { useState } from "react";
import DashboardLayout from "../layouts/layout";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../store/slices/auth.slice";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../store/appStore";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const isLoading = useSelector((store:any) => store?.auth?.loading);
   const error = useSelector((store:any) => store?.auth?.error);
   console.log("error",error);
   
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    // console.log("Login Data:", formData);
    const res = await dispatch(loginThunk({...formData}))
    
    if (loginThunk.fulfilled.match(res)) {
          toast.success(res.payload?.message || "Login successful!");
          navigate("/");
        } else if (loginThunk.rejected.match(res)) {
          toast.error(res.payload || "Login failed!");
        }
    // Add login API call here
  };

  return (
    <DashboardLayout>
      <div className="flex justify-center items-center h-full">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Welcome Back 👋
          </h2>
          <p className="text-gray-500 text-center mb-8">
            Please login to your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-800 text-white py-2 rounded-md font-semibold hover:bg-gray-900 transition duration-200"
            >
              {isLoading ? "Logining..." : "Login"}
            </button>

            <p className="text-center text-gray-500 mt-4">
              Don’t have an account?{" "}
              <a
                href="/register"
                className="text-gray-800 font-semibold hover:underline"
              >
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Login;
