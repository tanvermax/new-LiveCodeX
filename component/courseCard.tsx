import { FC } from "react";
import { FaStar } from "react-icons/fa";

interface Course {
    title: string;
    description: string;
    learners: string;
    rating: number;
    icon: any;
}


const CourseCard: FC<Course> = ({ title, description, learners, rating, icon }) => {
    return (
        <div className="shadow-lg rounded-xl p-6 w-full border border-gray-50">
            <div className="flex items-center space-x-3">
                <div className="text-6xl max-lg:text-5xl max-md:text-4xl bg-slate-200 p-2 rounded-md shadow-xl font-semibold">{icon}</div>
                <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-md">Beginner</span>
            </div>
            <h3 className="text-lg font-semibold mt-3">{title}</h3>
            <p className=" text-sm mt-2 text-gray-500">{description}</p>
            <div className="mt-4 flex justify-between items-center text-sm ">
                <span>{learners} learners</span>
                <span className="flex items-center gap-1">
                    {rating} <FaStar className="text-yellow-500" />
                </span>
            </div>
            <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                View this Course
            </button>
        </div>
    );
};

export default CourseCard;