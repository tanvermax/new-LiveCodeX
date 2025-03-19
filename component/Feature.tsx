import { FaBookOpen, FaCode, FaCheckCircle } from "react-icons/fa";
import Image from "next/image";

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
        <>
            {/* First Section with Features */}
            <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16">
                <div className="container mx-auto px-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`flex flex-col md:flex-row items-center gap-12 mb-16 ${feature?.reverse ? "md:flex-row-reverse" : ""
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
            </section>

            {/* Second Section with Video and Checklist */}
            <section className="container mx-auto py-12 md:py-20">
                <div className="text-center py-10">
                    <h2 className="text-5xl max-lg:text-4xl max-md:text-3xl max-sm:text-2xl font-bold">
                        Start from scratch, Build up expertise ✨
                    </h2>
                    <p className="text-gray-600 mt-2 w-1/2 max-lg:w-5/6 max-md:w-full mx-auto">
                        We are not just another online learning platform. We walk you through every step of the learning process.
                    </p>
                </div>
                <div className="flex justify-center flex-col md:flex-row items-center gap-10">
                    <div className="space-y-4">
                        {[
                            "Learn from courses",
                            "Practice daily",
                            "Assess your progress",
                            "Share with the world, repeat",
                        ].map((text, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <FaCheckCircle className="text-green-500" />
                                <span className="text-gray-800">{text}</span>
                            </div>
                        ))}
                    </div>
                    <div className="w-full max-w-lg md:w-1/2 max-md:w-full rounded-md overflow-hidden shadow-xl">
                        <video
                            src="https://cdn.pixabay.com/video/2019/05/06/23355-334950213_large.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            controls={false}
                            className="w-full h-full object-cover"
                        ></video>
                    </div>
                </div>
            </section>

            {/* LiveCodex for colleges */}
            <section className="relative w-full bg-blue-500 text-white py-16">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">

                    {/* Left Side - Image */}
                    <div className="w-full md:w-1/2 relative overflow-hidden rounded-lg shadow-xl">
                        <div className="absolute inset-0 bg-blue-700 opacity-50"></div>
                        <Image
                            src="https://img.freepik.com/premium-photo/business-people-coding-group-information-technology-with-computer-screen-programming-software-development-code-overlay-futuristic-collaboration-meeting-with-programmer-team-office_590464-133804.jpg"
                            alt="Students learning"
                            width={700}
                            height={400}
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    {/* Right Side - Text Content */}
                    <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
                        <h2 className="text-4xl font-extrabold leading-tight">
                            LiveCodex for Colleges
                        </h2>
                        <p className="text-lg text-gray-200">
                            Teach industry-relevant courses like Data Structures, Algorithms,
                            Web Development, and SQL to your students.
                        </p>
                        <button className="mt-4 bg-white text-blue-600 font-semibold px-6 py-3 rounded-md shadow-lg hover:bg-gray-200 transition-all duration-300">
                            Contact Us
                        </button>
                    </div>
                </div>
            </section>


        </>
    );
};

export default Feature;
