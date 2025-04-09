import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
              About ATMS
            </h3>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              Academic Task Management System helps students and class representatives
              manage their academic tasks efficiently.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/dashboard" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/timetable" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Timetable
                </Link>
              </li>
              <li>
                <Link to="/assignments" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Assignments
                </Link>
              </li>
              <li>
                <Link to="/announcements" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Announcements
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
              Support
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/help" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} Academic Task Management System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 