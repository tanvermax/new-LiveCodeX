"use client"; // ✅ Ensure client-side execution
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";

export const SignIn = ({
  provider,
  src,
  alt,
  ...props
}: {
  provider?: string;
  src: string;
  alt: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className=" flex items-center"
      {...props}
      onClick={() => signIn(provider)} // ✅ Client-side execution
      type="button"
    >
      {provider ? provider : "Social Platform"}
      <div className=" w-10 h-10 max-md:h-8 max-md:w-8">
        <Image src={src} alt={alt} width={500} height={500} />
      </div>
    </button>
  );
};

export const SignOut = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return (
    <button
      {...props}
      onClick={() => signOut({ callbackUrl: "/" })} // ✅ Redirect after logout
      type="button"
    >
      Sign out
    </button>
  );
};
