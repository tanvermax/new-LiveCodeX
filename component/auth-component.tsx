"use client"; // ✅ Ensure client-side execution
import { signIn, signOut } from "next-auth/react";
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
         
            Sign out
        </button>
    );
};
