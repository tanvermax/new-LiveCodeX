"use client";

import Link from "next/link";
import {
  FaYoutube,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaQuora,
  FaLinkedinIn,
} from "react-icons/fa6";

const Footer: React.FC = () => {

  return ( 

    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Features</h3>
            <ul className="space-y-2">
              {[
                "Real-time Collaboration",
                "Live Debugging",
                "Code Execution",
                "Version Control",
                "Auto-Save",
              ].map((feature) => (
                <li key={feature}>
                  <Link href="#">
                    <span className="hover:text-yellow-400">{feature}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Resources</h3>
            <ul className="space-y-2">
              {[
                "Documentation",
                "API Reference",
                "Code Snippets",
                "Integration Guides",
              ].map((resource) => (
                <li key={resource}>
                  <Link href="#">
                    <span className="hover:text-yellow-400">{resource}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              {[
                "Help Center",
                "Community Forum",
                "Report a bug",
                "Feature Request",
              ].map((support) => (
                <li key={support}>
                  <Link href="#">
                    <span className="hover:text-yellow-400">{support}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Company</h3>
            <ul className="space-y-2">
              {["About Us", "Careers", "Contact Us", "Privacy Policy"].map(
                (company) => (
                  <li key={company}>
                    <Link href="#">
                      <span className="hover:text-yellow-400">{company}</span>
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} LiveCodeX. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {[
              { icon: FaYoutube, color: "text-red-500" },
              { icon: FaFacebookF, color: "text-blue-500" },
              { icon: FaInstagram, color: "text-pink-500" },
              { icon: FaXTwitter, color: "text-white" },
              { icon: FaQuora, color: "text-red-600" },
              { icon: FaLinkedinIn, color: "text-blue-700" },
            ].map(({ icon: Icon, color }, index) => (
              <a
                key={index}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-400 hover:${color}`}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;