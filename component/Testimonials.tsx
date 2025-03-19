"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";

const testimonials = [
    {
        name: "Ariful Islam",
        text: "These are the best problems for beginners. The problems are based on basic logic and definitely, the learner who is a beginner will enjoy solving such problems and will improve day by day.",
        country: "Bangladesh",
        image: "https://i.ibb.co/F6sgTsX/man-man.png",
    },
    {
        name: "Mehidi Hasan",
        text: "This module is excellent for both learning and practicing, as it provides a clear and in-depth understanding of the concepts. It surpasses traditional learning methods.",
        country: "Bangladesh",
        image: "https://i.ibb.co/F6sgTsX/man-man.png",
    },
    {
        name: "Rabbi Hasan",
        text: "LiveCodex is an excellent platform that offers a wide range of questions and conducts contests. I am grateful to the LiveCodex team for their contributions.",
        country: "India",
        image: "https://i.ibb.co/F6sgTsX/man-man.png",
    },
    {
        name: "Hirok Duttu",
        text: "LiveCodex is an excellent platform that offers a wide range of questions and conducts contests. I am grateful to the LiveCodex team for their contributions.",
        country: "Bangladesh",
        image: "https://i.ibb.co/F6sgTsX/man-man.png",
    },
    {
        name: "Monir Hosen",
        text: "LiveCodex is an excellent platform that offers a wide range of questions and conducts contests. I am grateful to the LiveCodex team for their contributions.",
        country: "Bangladesh",
        image: "https://i.ibb.co/F6sgTsX/man-man.png",
    },
];

export default function Testimonials() {
    return (
        <div className="container mx-auto px-4 py-12">
            <h2 className="text-center text-4xl font-bold text-gray-800 mb-8">
                Over <span className="text-blue-600">2M+ Learners</span>
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                Our learners benefit from our rich repository of courses and practice problems every day.
            </p>

            <div className="w-full max-w-6xl mx-auto">
                <Swiper
                    modules={[Pagination, Navigation, Autoplay]}
                    slidesPerView={1}
                    spaceBetween={20}
                    pagination={{ clickable: true }}
                    navigation={true}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2, spaceBetween: 30 },
                        1024: { slidesPerView: 3, spaceBetween: 40 },
                    }}
                    className="pb-8"
                >
                    {testimonials.slice(-4).map((testimonial, index) => (
                        <SwiperSlide key={index} className="p-4">
                            <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
                                <FaQuoteLeft className="text-blue-500 text-3xl mb-4" />
                                <p className="text-gray-700 italic">{testimonial.text}</p>

                                <div className="flex mt-4">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className="text-yellow-500 text-lg" />
                                    ))}
                                </div>

                                <div className="mt-6 flex flex-col items-center">
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        width={500}
                                        height={500}
                                        className="w-16 h-16 rounded-full border-2 border-blue-500 shadow-md"
                                    />
                                    <p className="font-semibold mt-2 text-lg">{testimonial.name}</p>
                                    <p className="text-gray-500 text-sm">{testimonial.country}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
