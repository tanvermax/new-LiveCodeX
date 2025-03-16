import { signIn } from "@/auth"

export const SignIn=({provider, ...props}: {provider?: string} & React.ButtonHTMLAttributes<HTMLButtonElement>)=>{

return(
    <form
      action={async () => {
        "use server"
        await signIn(provider)
      }}
    >
      <button {...props} type="submit">Signin with GitHub</button>
    </form>
)
}