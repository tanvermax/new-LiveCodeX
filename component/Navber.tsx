"use client";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

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


  const [isOpen, setIsopen]= useState(false);



  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="lg:text-lg text-xs font-semibold">
          <Link href="/">LiveCodeX</Link>
        </div>

        {/* Navigation Links */}
  
        <ul className="lg:flex hidden space-x-6 items-center ">
          <li>
            <Link href="/" className="hover:text-yellow-500 text-xs lg:text-base ">
              Home
            </Link>
          </li>
          <li>
            <Link href="/compiler" className="hover:text-yellow-500  text-xs lg:text-base">
              Compiler
            </Link>
          </li>
          

          <li>
            <Link href="/practice" className="hover:text-yellow-500 text-xs lg:text-base">
              Practice
            </Link>
          </li>

          <li>
            <Link href="/contact" className="hover:text-yellow-500 text-xs lg:text-base">
              Complete
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-yellow-500 text-xs lg:text-base">
              About
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
          <div className="bg-blue-400 hover:bg-yellow-500 text-white lg:px-6 px-2 text-xs lg:text-base rounded-full">
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
            <Link href="/" className="hover:text-yellow-500 text-xs lg:text-base ">
              Home
            </Link>
          </li>
          <li>
            <Link href="/compiler" className="hover:text-yellow-500  text-xs lg:text-base">
              Compiler
            </Link>
          </li>
          

          <li>
            <Link href="/practice" className="hover:text-yellow-500 text-xs lg:text-base">
              Practice
            </Link>
          </li>

          <li>
            <Link href="/contact" className="hover:text-yellow-500 text-xs lg:text-base">
              Complete
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-yellow-500 text-xs lg:text-base">
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
        >

        </div>
        )}
      </nav>
      
    </header>
  );
};

export default Navbar;
