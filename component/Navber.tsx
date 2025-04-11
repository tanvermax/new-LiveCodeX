"use client";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SignOut } from "./auth-component";
import axios from "axios";
import { Session } from "next-auth";
import swal from "sweetalert";

import { useRouter } from "next/navigation";

// Define TypeScript interface for Navbar props

interface NavbarProps {
  session: Session | null;
}

const Navbar: React.FC<NavbarProps> = ({ session }) => {

  const router = useRouter();
  const [authUser, setAuthUser] = useState<any>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  

  const logoutHandler = async () => {
    try {
      const response = await axios.get("/pages/api/user/logout");
      if (response?.data?.success) {
        swal({
          title: response?.data?.message,
          icon: "success",
        });
        router.push("/");

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        swal({
          title: response?.data?.message,
          icon: "warning",
        });
      }
    } catch (error) {
      throw new Error(String(error));
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/pages/api/user/decodedToken");
        setAuthUser(response?.data?.token);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [setAuthUser]);

  const [isOpen, setIsopen] = useState(false);

  return (
  
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Hamburger Icon for Mobile */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Logo hidden on mobile */}
        <div className="text-lg font-semibold hidden lg:block">
          <Link href="/">LiveCodeX</Link>
        </div>


        {/* Navigation Links */}

        {/* Desktop Navigation Links (Tablet and Larger Devices) */}
        <ul className="hidden lg:flex lg:space-x-6 items-center">

          <li>
            <Link
              href="/"
              className="hover:text-yellow-500 text-xs lg:text-base "
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/compiler"
              className="hover:text-yellow-500  text-xs lg:text-base"
            >
              Compiler
            </Link>
          </li>

          <li>

            <Link
              href="/practice"
              className="hover:text-yellow-500 text-xs lg:text-base"
            >
              Practice
            </Link>
          </li>

          <li>
           

            <Link href="/contact" className="hover:text-yellow-500 text-xs lg:text-base">

              Complete
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-yellow-500 text-xs lg:text-base"
            >
              About
            </Link>
          </li>
        </ul>

        {/* User Section */}
        {session || authUser ? (
          <div className="flex items-center space-x-4">
            <Link href="/profile">

              {session === null ? (
                <Image
                  src={authUser?.image || "/avatar.png"}
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="rounded-full border-amber-300 border-2"
                />
              ) : (
                <Image
                  src={session?.user?.image || "/avatar.png"}
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="rounded-full border-amber-300 border-2"
                />
              )}
            </Link>

            <div className="bg-blue-400 hover:bg-yellow-500 text-white px-6 rounded-full">

              <Image
                src={
                  session === null
                    ? authUser?.image || "/avatar.png"
                    : session?.user?.image || "/avatar.png"
                }
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full border-amber-300 border-2"
              />
            </div>

            <div className="bg-blue-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-full">

              {session === null ? (
                <button type="button" onClick={logoutHandler}>
                  Logout
                </button>
              ) : (
                <SignOut />
              )}
            </div>
          </div>
        ) : (
          <div className="bg-blue-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-full">
            <Link href="/login">Login</Link>
          </div>
        )}
        <div className="md:hidden">
          {isOpen ? (
            <AiOutlineClose
              className="text-2xl cursor-pointer"
              onClick={() => setIsopen(false)}
            />
          ) : (
            <AiOutlineMenu
              className="text-2xl cursor-pointer"
              onClick={() => setIsopen(true)}
            />
          )}
        </div>
        <div
          className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white p-6 transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
        >
          <AiOutlineClose
            className="text-2xl cursor-pointer mb-4"
            onClick={() => setIsopen(false)}
          />
          <ul className="space-y-4">
            <li>
              <Link
                href="/"
                className="hover:text-yellow-500 text-xs lg:text-base "
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/compiler"
                className="hover:text-yellow-500  text-xs lg:text-base"
              >
                Compiler
              </Link>
            </li>

            <li>
              <Link
                href="/practice"
                className="hover:text-yellow-500 text-xs lg:text-base"
              >
                Practice
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                className="hover:text-yellow-500 text-xs lg:text-base"
              >
                Complete
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-yellow-500 text-xs lg:text-base"
              >
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Overlay for closing menu */}
        {isOpen && (
          <div
            className="fixed inset-0  bg-opacity-50 md:hidden"
            onClick={() => setIsopen(false)}
          ></div>
        )}
      </nav>


      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden z-50 fixed top-0 left-0 w-3/4 h-full bg-gray-800 p-6 space-y-4 transition-transform transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center">
          <Link href="/" className="text-lg font-semibold text-white">
            LiveCodeX
          </Link>
          <button
            className="text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <ul className="space-y-4">
          <li>
            <Link href="/" className="text-white hover:text-yellow-500">
              Home
            </Link>
          </li>
          <li>
            <Link href="/compiler" className="text-white hover:text-yellow-500">
              Compiler
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-white hover:text-yellow-500">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-white hover:text-yellow-500">
              Complete
            </Link>
          </li>
        </ul>
      </div>

    </header>
  );
};

export default Navbar;
