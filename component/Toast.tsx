"use client";
import React from "react";
import { CheckCircle2 } from "lucide-react"; // Uses lucide icons

type ToastProps = {
  message: string;
  show: boolean;
};

const Toast = ({ message, show }: ToastProps) => {
  return (
    <div
      className={`fixed top-5 right-5 z-50 transition-all duration-500 ease-in-out transform ${
        show ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className="flex items-center gap-3 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl">
        <CheckCircle2 className="w-5 h-5" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
};

export default Toast;