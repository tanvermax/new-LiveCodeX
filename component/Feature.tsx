import { FaBookOpen, FaCode } from "react-icons/fa";
import Image from "next/image";
import React from "react";

const features = [
    {
        title: "Practical, Job Relevant Topics",
        description:
            "From Python to Web development, master the concepts employers demand. Our structured courses ensure your smooth transition from beginner to professional.",
        buttonText: "Browse Catalog",
        image: "https://i.ibb.co/xtyGJKzB/pic-1.png",
        icon: <FaBookOpen className="text-blue-500 text-5xl" />,
        reverse: false,
    },
    {
        title: "Hands-on Learning Experience",
        description:
            "Practice as you learn with Our built-in interactive IDE. Each lesson includes real-world exercises to help you apply concepts and gain instant feedback.",
        buttonText: "Try a Lesson",
        image: "https://i.ibb.co/xtyGJKzB/pic-1.png",
        icon: <FaCode className="text-blue-500 text-5xl" />,
        reverse: true,
    },
];

const Feature = () => {
    return (
        <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16">
            <div className="container mx-auto px-6">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className={`flex flex-col md:flex-row items-center gap-12 mb-16 ${
                            feature?.reverse ? "md:flex-row-reverse" : ""
                        }`}
                    >
                        {/* Left Content */}
                        <div className="w-full md:w-1/2 text-center md:text-left">
                            <span className="uppercase text-sm tracking-wider text-gray-400">
                                New Feature
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold mt-3 leading-tight">
                                {feature?.title}
                            </h2>
                            <p className="text-gray-300 mt-4 leading-relaxed">
                                {feature?.description}
                            </p>
                            <button className="mt-6 bg-blue-600 px-6 py-3 rounded-md hover:bg-blue-700 transition-all duration-300 shadow-lg flex items-center gap-2">
                                {feature?.icon} {feature?.buttonText}
                            </button>
                        </div>

                        {/* Right Image */}
                        <div className="w-full md:w-1/2 flex justify-center">
                            <div className="bg-gray-800 p-4 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300">
                                <Image
                                    src={feature?.image}
                                    alt="Feature"
                                    width={500}
                                    height={300}
                                    className="w-full h-auto rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feature;
