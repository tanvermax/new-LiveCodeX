import Image from "next/image";
import { FaGoogle } from "react-icons/fa";
import TerminalDemo from "./TerminalDemo";
const Banner = () => {
    return (
        <section className="flex items-center justify-center py-12 md:py-20">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
                {/* Left Content */}
                <div className="md:w-1/2 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold ">
                        Start your coding <br /> journey today
                    </h1>
                    <p className=" mt-4">
                        Learn to code from scratch with <span className="font-semibold">practice-oriented</span> courses designed by experts.
                    </p>

                    {/* Input + Button */}
                    <div className="mt-6 flex max-lg:flex-col gap-3">
                        <input
                            type="email"
                            placeholder="Enter email"
                            className="p-3 w-full sm:w-auto flex-1 rounded-md border  border-gray-300"
                        />
                        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white rounded-md flex items-center gap-2">
                            Start learning today ⚡
                        </button>
                    </div>

                    {/* Google Sign-up */}
                    <div className="mt-4 flex items-center">
                        <h1>
                            or sign up with
                        </h1>

                        <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-md px-4 py-2 ml-2 hover:bg-gray-100">
                            <FaGoogle className="text-red-500" /> Google
                        </button>
                    </div>
                </div>

                {/* Right Image (Replace with actual image) */}
                <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
                    <TerminalDemo/>
                </div>
            </div>
        </section>
    )
}

export default Banner