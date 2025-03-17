import React from 'react'

import { SignIn } from '../component/auth-component'
import Image from 'next/image'

const LoginPage = () => {
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
                            <fieldset className="fieldset">
                                <label className="fieldset-label">Email</label>
                                <input type="email" className="input" placeholder="Email" />
                                <label className="fieldset-label">Password</label>
                                <input type="password" className="input" placeholder="Password" />
                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn btn-neutral mt-4">Login</button>
                            </fieldset>
                        </div>
                    </div>
                    <div className=' flex gap-5'>
                    
                        <SignIn className='cursor-pointer' provider='google'></SignIn>
                        <Image width={20} height={10}  alt="User Avatar"  src={"/google.png"}></Image>
                        <SignIn className='cursor-pointer' provider='github'></SignIn>
                        <Image width={24} height={24}  alt="User Avatar"  src={"/github.png"}></Image>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default LoginPage