"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import axios from "axios";
import swal from "sweetalert"
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

  const onSubmit = async (data: FormData) => {
    try {

      data.image = preview
      const response = await axios.post("/pages/api/user/signup", data);
      if (response?.data?.success) {
        swal({
          title: response?.data?.message,
          icon: "success"
        })
      } else {
        swal({
          title: response?.data?.message,
          icon: "warning"
        })
      }
    } catch (error) {
      console.error("Registration error:", error);
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
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg flex overflow-hidden">
        {/* Left Section: Image */}
        <div className="w-1/2 hidden md:flex items-center justify-center bg-gray-200">
          {preview ? (
            <Image src={preview} alt="Preview" width={300} height={300} className="rounded-lg" />
          ) : (
            <p className="text-gray-500">Image Preview</p>
          )}
        </div>

        {/* Right Section: Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                className="w-full text-black p-2 border rounded"
                type="text"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                {...register("email", { required: "Email is required" })}
                className="w-full p-2 text-black border rounded"
                type="email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="mb-4 relative">
              <label className="block text-gray-700">Password</label>
              <input
                {...register("password", { required: "Password is required" })}
                className="w-full p-2 border text-black rounded pr-10"
                type={showPassword ? "text" : "password"}
              />
              <button
                type="button"
                className="absolute right-3 top-10 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            {/* Image Upload */}
            <div className="mb-4">
              <label className="block text-gray-700">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                className="w-full p-2 border rounded"
                onChange={handleImageChange}
              />
            </div>

            {/* Submit Button */}
            <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}