"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { SignIn } from '../../component/auth-component'
import Image from 'next/image'
import axios from 'axios'
import swal from 'sweetalert'

interface LoginFormInputs {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>()

    const loginHandler = async (data: LoginFormInputs) => {
        try {
            const response = await axios.post("/pages/api/user/login", data)
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
            swal({
                title: "Login failed!",
                text: String(error),
                icon: "error"
            })
        }
    }

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident Cupiditate Voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(loginHandler)}>
                                <fieldset className="fieldset">
                                    <label className="fieldset-label">Email</label>
                                    <input type="email" {...register("email", { required: "Email is required" })} className="input" placeholder="Email" />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                    
                                    <label className="fieldset-label">Password</label>
                                    <input type="password" {...register("password", { required: "Password is required" })} className="input" placeholder="Password" />
                                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                                    
                                    <div><a className="link link-hover">Forgot password?</a></div>
                                    <button type="submit" className="btn btn-neutral mt-4">Login</button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                    <div className='flex gap-5'>
                        <SignIn className='cursor-pointer' provider='google'></SignIn>
                        <Image width={20} height={10} alt="User Avatar" src={"/google.png"}></Image>
                        <SignIn className='cursor-pointer' provider='github'></SignIn>
                        <Image width={24} height={24} alt="User Avatar" src={"/github.png"}></Image>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage