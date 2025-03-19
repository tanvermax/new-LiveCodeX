import React from 'react';
import CourseCard from './courseCard';
import { FaCuttlefish, FaJava, FaJs, FaPython } from 'react-icons/fa6';


import { RiGitMergeLine } from "react-icons/ri";
import { FaBookOpen, FaCode } from "react-icons/fa";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";


const Courses = () => {

    const courses = [
        { title: "Learn Python", description: "Get hands-on practice and nail down the fundamentals of Python to jumpstart your coding journey", learners: "160K+", rating: 4.7, icon: <FaPython className="text-yellow-500" /> },
        { title: "Learn Python", description: "Get hands-on practice and nail down the fundamentals of Python to jumpstart your coding journey", learners: "160K+", rating: 4.7, icon: <FaPython className="text-yellow-500" /> },
        { title: "Learn Python", description: "Get hands-on practice and nail down the fundamentals of Python to jumpstart your coding journey", learners: "160K+", rating: 4.7, icon: <FaPython className="text-yellow-500" /> },
        { title: "Learn Java", description: "Get practical experience coding in Java programming with this interactive and practical course", learners: "108K+", rating: 4.7, icon: <FaJava className="text-orange-500" /> },
        { title: "Learn C++", description: "Join this interactive and hands-on C++ course to master the basic syntax of the language.", learners: "60K+", rating: 4.7, icon: <FaCuttlefish className="text-blue-500" /> },
        { title: "Learn JavaScript", description: "Learn the language which powers millions of web application in the world. Start with learning basic constructs and get ready to solve", learners: "12K+", rating: 4.8, icon: <FaJs className="text-yellow-400" /> },
        { title: "Learn C", description: "Learn the language which powers millions of web application in the world. Start with learning basic constructs and get ready to solve", learners: "12K+", rating: 4.8, icon: "C" },
        { title: "Learn C", description: "Learn the language which powers millions of web application in the world. Start with learning basic constructs and get ready to solve", learners: "12K+", rating: 4.8, icon: "C#" },

    ];

    
    const dataStructures = [
        { title: "Learn Python", description: "Get hands-on practice and nail down the fundamentals of Python to jumpstart your coding journey", learners: "160K+", rating: 4.7, icon: <RiGitMergeLine
             className="text-blue-500" /> },
        // eslint-disable-next-line react/jsx-no-undef
        { title: "Learn Java", description: "Get practical experience coding in Java programming with this interactive and practical course", learners: "108K+", rating: 4.7, icon: <RiGitMergeLine className="text-blue-500" /> },
        { title: "Learn C++", description: "Join this interactive and hands-on C++ course to master the basic syntax of the language.", learners: "60K+", rating: 4.7, icon: <RiGitMergeLine className="text-blue-500" /> },
        { title: "Learn C++", description: "Join this interactive and hands-on C++ course to master the basic syntax of the language.", learners: "60K+", rating: 4.7, icon: <RiGitMergeLine className="text-blue-500" /> },

    ];

    const algorithms = [
        { title: "Learn Python", description: "Get hands-on practice and nail down the fundamentals of Python to jumpstart your coding journey", learners: "160K+", rating: 4.7, icon: <RiGitMergeLine className="text-blue-500" /> },
        { title: "Learn Java", description: "Get practical experience coding in Java programming with this interactive and practical course", learners: "108K+", rating: 4.7, icon: <RiGitMergeLine className="text-blue-500" /> },
        { title: "Learn C++", description: "Join this interactive and hands-on C++ course to master the basic syntax of the language.", learners: "60K+", rating: 4.7, icon: <RiGitMergeLine className="text-blue-500" /> },
        { title: "Learn C++", description: "Join this interactive and hands-on C++ course to master the basic syntax of the language.", learners: "60K+", rating: 4.7, icon: <RiGitMergeLine className="text-blue-500" /> },

    ];

    return (
        <div>
            {/* section_2_start */}
            <div className="bg-white">
                <section className="py-12 md:py-20 container mx-auto px-6">

                    <div className="">
                        <h2 className="text-2xl max-lg:text-xl font-bold text-gray-900 mb-6">Learn to Code</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {courses.map((course, index) => (
                                <CourseCard key={index} {...course} />
                            ))}
                        </div>
                    </div>
                    <div className="mt-10">
                        <h2 className="text-2xl max-lg:text-xl font-bold text-gray-900  mb-6">Data structures</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {dataStructures.map((course, index) => (
                                <CourseCard key={index} {...course} />
                            ))}
                        </div>
                    </div>
                    <div className="mt-10">
                        <h2 className="text-2xl max-lg:text-xl font-bold text-gray-900  mb-6">Algorithms</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {algorithms.map((course, index) => (
                                <CourseCard key={index} {...course} />
                            ))}
                        </div>
                    </div>

                </section>
            </div>
            {/* section_2_end */}
        </div>
    );
};

export default Courses;