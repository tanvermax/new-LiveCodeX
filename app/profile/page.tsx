"use client";

import React, { useEffect, useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";

interface ProfileFormInputs {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ProfilePage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormInputs>();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/pages/api/user/decodedToken");
        setUser(response?.data?.token);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const togglePassword = (field: "current" | "new" | "confirm") => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onChangePassword = async (data: ProfileFormInputs) => {
    if (data.newPassword !== data.confirmPassword) {
      return swal({ title: "Passwords do not match!", icon: "error" });
    }

    try {
      setLoading(true);
      const payload = { ...data, email: user?.email };
      const response = await axios.post("/pages/api/user/change-password", payload);

      if (response.data.success) {
        swal({ title: "Password changed successfully!", icon: "success" });
        reset();
      } else {
        swal({ title: response.data.message, icon: "warning" });
      }
    } catch (error) {
      swal({ title: "Password change failed!", text: String(error), icon: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center mb-6">Profile</h1>

        {/* Profile Info */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <FaUser className="text-2xl mr-3" />
            <div className="flex flex-col">
              <span className="text-gray-700 font-semibold">Username</span>
              <span className="text-gray-600">{user?.name}</span>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <FaEnvelope className="text-2xl mr-3" />
            <div className="flex flex-col">
              <span className="text-gray-700 font-semibold">Email</span>
              <span className="text-gray-600">{user?.email}</span>
            </div>
          </div>
        </div>

        {/* Password Change */}
        <div className="border-t pt-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <form onSubmit={handleSubmit(onChangePassword)}>
            {[
              {
                label: "Current Password",
                name: "currentPassword",
                show: showPassword.current,
                toggle: () => togglePassword("current"),
                registerName: "currentPassword" as const,
                error: errors.currentPassword,
              },
              {
                label: "New Password",
                name: "newPassword",
                show: showPassword.new,
                toggle: () => togglePassword("new"),
                registerName: "newPassword" as const,
                error: errors.newPassword,
              },
              {
                label: "Confirm New Password",
                name: "confirmPassword",
                show: showPassword.confirm,
                toggle: () => togglePassword("confirm"),
                registerName: "confirmPassword" as const,
                error: errors.confirmPassword,
              },
            ].map((field, index) => (
              <div className="mb-4 relative" key={index}>
                <label className="block text-sm text-gray-700">{field.label}</label>
                <input
                  type={field.show ? "text" : "password"}
                  {...register(field.registerName, {
                    required: `${field.label} is required`,
                  })}
                  className="w-full p-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  placeholder={field.label}
                />
                <div
                  className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
                  onClick={field.toggle}
                >
                  {field.show ? <FaEyeSlash /> : <FaEye />}
                </div>
                {field.error && (
                  <p className="text-red-500 text-xs mt-1">{field.error.message}</p>
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white p-3 rounded-md text-sm hover:bg-blue-700 transition ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
