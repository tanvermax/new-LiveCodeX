"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import axios from "axios";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  email: string;
  password: string;
  image: string | any;
}

export default function RegistrationPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [preview, setPreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      data.image = preview;
      const response = await axios.post("/pages/api/user/signup", data);

      if (response?.data?.success) {
        swal({
          title: response?.data?.message,
          icon: "success",
        }).then(() => {
          router.push("/");
        });
      } else {
        swal({
          title: response?.data?.message,
          icon: "warning",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      swal({
        title: "Registration failed!",
        text: String(error),
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left: Image preview */}
        <div className="hidden md:flex items-center justify-center bg-gray-100 p-6">
          {preview ? (
            <Image
              src={preview}
              alt="Preview"
              width={300}
              height={300}
              className="rounded-lg object-cover"
            />
          ) : (
            <p className="text-gray-500 text-center">Image Preview</p>
          )}
        </div>

        {/* Right: Form */}
        <div className="w-full p-6">
          <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                {...register("password", { required: "Password is required" })}
                type={showPassword ? "text" : "password"}
                className="w-full p-2 border border-gray-300 rounded pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Image */}
            <div>
              <label className="block text-gray-700 mb-1">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={handleImageChange}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full p-2 rounded text-white transition ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
