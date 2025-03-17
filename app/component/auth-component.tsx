"use client"; // ✅ Ensure client-side execution
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";

export const SignIn = ({
    provider,
    ...props
}: { provider?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            {...props}
            onClick={() => signIn(provider)} // ✅ Client-side execution
            type="button"
        >
            Sign in with {provider ? provider : "Social Platform"}
        </button>
    );
};

export const SignOut = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            {...props}
            onClick={() => signOut({ callbackUrl: "/" })} // ✅ Redirect after logout
            type="button"
        >
          <Image width={24} height={24}  alt="User Avatar"  src={"/google.png"}></Image>
            Sign out
        </button>
    );
};
