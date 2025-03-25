import Courses from "@/component/Courses";
import ScrollNav from "@/component/ScrollNav";
import React from "react";


const page = () => {
  return (
    <section>
      {/* scroll navbar  */}
      <ScrollNav />
      <div className=" border-b-2">
        {/* page heading and title  */}
        <div className="container mx-auto my-12">
          <h1 className="text-2xl font-bold mb-4">Welcome to Practice!</h1>
          <p className="max-w-[992px] text-base font-normal text-gray-600">
            Practice over 5000+ problems and challenges in coding languages like
            Python, Java, JavaScript, C++, SQL and HTML. Start with beginner
            friendly challenges and solve hard problems as you become better. Use
            these practice problems and challenges to prove your coding skills.
          </p>
        </div>
      </div>

      {/* all practice courses  */}
      <Courses />
    </section>
  );
};

export default page;
