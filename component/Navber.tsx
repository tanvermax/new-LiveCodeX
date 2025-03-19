"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SignOut } from "./auth-component";
import axios from "axios";
import { Session } from "next-auth";
import swal from "sweetalert";

// Define TypeScript interface for Navbar props
interface NavbarProps {
  session: Session | null;
}

// Navbar component
const Navbar: React.FC<NavbarProps> = ({ session }) => {
  const [authUser, setAuthUser] = useState<any>(null)



  const logoutHandler = async () => {
    try {
      const response = await axios.get("/pages/api/user/logout")
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
      throw new Error(String(error))

    }
  }


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/pages/api/user/decodedToken");
        setAuthUser(response?.data?.token)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);





  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-semibold">
          <Link href="/">LiveCodeX</Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 items-center">
          <li>
            <Link href="/" className="hover:text-yellow-500">
              Home
            </Link>
          </li>
          <li>
            <Link href="/docode" className="hover:text-yellow-500">
              Do Code
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-yellow-500">
              Practice
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-yellow-500">
              Complete
            </Link>
          </li>
        </ul>

        {/* User Section */}
        {(session || authUser) ? (
          <div className="flex items-center space-x-4">

            <Link href="/profile">
              {
                session === null ?
                  <Image
                    src={authUser?.image || "/avatar.png"}
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="rounded-full border-amber-300 border-2"
                  />
                  : <Image
                    src={session?.user?.image || "/avatar.png"}
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="rounded-full border-amber-300 border-2"
                  />
              }


            </Link>


            <div className="bg-blue-400 hover:bg-yellow-500 text-white px-6 rounded-full">
              {
                session === null ? <button type="button" onClick={logoutHandler}>
                  Logout
                </button> : <SignOut />
              }

            </div>
          </div>
        ) : (
          <div className="bg-blue-400 hover:bg-yellow-500 text-white px-6 rounded-full">
            <Link href="/login">Login</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
