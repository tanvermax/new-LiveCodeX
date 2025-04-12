import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9fafb] to-[#eef1f5] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl px-6 py-10 sm:px-10 sm:py-14 md:px-14 md:py-16 text-gray-800">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-10 text-center text-indigo-600">
          About LiveCodex
        </h2>

        <p className="mb-6 text-base sm:text-lg leading-relaxed">
          <strong className="text-indigo-600">LiveCodex</strong> is a modern, real-time collaborative code editor platform that empowers developers, students, and professionals to write, edit, debug, and execute code together — live and remotely. Whether it is for a team project, an interview, or a coding bootcamp, LiveCodex brings people together through seamless collaboration.
        </p>

        <p className="mb-6 text-base sm:text-lg leading-relaxed">
          Powered by <strong className="text-indigo-600">Next.js</strong>, this platform leverages state-of-the-art technologies to break down traditional remote development barriers and unlock a highly interactive coding experience.
        </p>

        <div className="bg-gray-50 rounded-xl p-5 sm:p-6 md:p-8 mb-8 shadow-inner">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">Key Features:</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm sm:text-base">
            <li><strong>Edit code simultaneously</strong> with real-time sync across users</li>
            <li><strong>In-app chat and voice</strong> for instant communication</li>
            <li><strong>Code execution</strong> and live preview for multiple languages</li>
            <li><strong>Syntax highlighting</strong> and live error detection</li>
            <li><strong>Role-based access control</strong> and GitHub/GitLab integration</li>
            <li><strong>Auto-save</strong> and <strong>snippet sharing</strong> features</li>
            <li>No login required — share and collaborate instantly via link</li>
          </ul>
        </div>

        <p className="mb-4 text-base sm:text-lg leading-relaxed">
          LiveCodex is ideal for:
        </p>

        <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm sm:text-base mb-8">
          <li>Remote software development teams</li>
          <li>Online coding interviews</li>
          <li>Classroom teaching and live sessions</li>
          <li>Hackathons and coding bootcamps</li>
        </ul>

        <p className="mt-10 text-center text-base sm:text-lg font-semibold text-gray-800">
          LiveCodex redefines the way we code together — faster, smarter, and more connected than ever.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;