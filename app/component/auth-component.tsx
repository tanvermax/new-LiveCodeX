import { signIn } from "@/auth"
import { signOut } from "@/auth"
import React from "react"

export const SignIn=({provider, ...props}: {provider?: string} & React.ButtonHTMLAttributes<HTMLButtonElement>)=>{

return(
    <form
      action={async () => {
        "use server"
        await signIn(provider)
      }}
    >
      <button {...props} type="submit">Signin with Social platfrom</button>
    </form>
)
}

export const SignOut = (props:React.ButtonHTMLAttributes<HTMLButtonElement>)=>{
    return (
        <form
        action={async () => {
          "use server"
          await signOut()
        }}
      >
        <button {...props} type="submit">Sign out</button>
      </form>
    )
}