import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { SignOut } from './auth-component';
import { auth } from '@/auth';

const Navber = async () => {
    const session  = await auth();

    return (
        <header className='bg-gray-800 text-white p-4'>
            <nav className='container mx-auto flex justify-between'>
                <div className='text-lg font-semibold'>
                    <Link href="/">LiveCodeX</Link>
                </div>

                {/* Navigation Items */}
                <ul className='flex space-x-6 items-center'>
                    <li><Link href="/" className='hover:text-yellow-500'>Home</Link></li>
                    <li><Link href="/about" className='hover:text-yellow-500'>Pratice</Link></li>
                    {/* <li><Link href="/dashboard" className='hover:text-yellow-500'>DASHBOARD</Link></li> */}
                    <li><Link href="/contact" className='hover:text-yellow-500'>Complete</Link></li>
                </ul>

                {/* User Section */}
                {session ? (
                    <div className='space-x-4 flex items-center'>
                        <Link href="/profile">
                            <Image 
                                src={session.user?.image || "/avatar.png"} 
                                alt="User Avatar" 
                                width={40} 
                                height={40} 
                                className='rounded-full border-amber-300 border-2'
                            />
                        </Link> 
                        <div className='bg-blue-400 hover:bg-yellow-500 text-white px-6 rounded-full'>
                            <SignOut />
                        </div>
                    </div>
                ) : (
                    <div className='bg-blue-400 hover:bg-yellow-500 text-white px-6 rounded-full'>
                        <Link href="/login">Login</Link>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navber;
