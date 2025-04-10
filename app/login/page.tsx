"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { SignIn } from "../../component/auth-component";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const loginHandler = async (data: LoginFormInputs) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/pages/api/user/login", data);
      if (response?.data?.success) {
        swal({
          title: response?.data?.message,
          icon: "success",
        });
        // Redirect to home page after successful login
        router.push("/");
        

            setTimeout(()=>{
                window.location.reload()
            },1000)

      } else {
        swal({
          title: response?.data?.message,
          icon: "warning",
        });
      }
    } catch (error) {
      swal({
        title: "Login failed!",
        text: String(error),
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-sm text-gray-600">Sign in to continue</p>
        </div>

        {/* Form Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit(loginHandler)} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                placeholder="Enter your email"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                placeholder="Enter your password"
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password.message}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="flex justify-between items-center">
              <Link
                href="/register"
                className="text-sm text-blue-600 hover:underline transition-colors"
              >
                Create an account
              </Link>
              <a className="text-sm text-blue-600 hover:underline transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Submit Button with Loading State */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <SignIn
              provider="google"
              src="/google.png"
              alt="Google Sign-In"
              className="w-full py-2.5 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              disabled={isLoading}
            >
              Google
            </SignIn>
            <SignIn
              provider="github"
              src="/github.png"
              alt="GitHub Sign-In"
              className="w-full py-2.5 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              disabled={isLoading}
            >
              GitHub
            </SignIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;