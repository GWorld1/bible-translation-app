// src/components/WelcomePage.js
import React from 'react';
// Optional: Import an icon or logo if you have one
// import { BookOpenIcon } from '@heroicons/react/24/outline'; // Example using Heroicons (npm install @heroicons/react)

function WelcomePage({ onLoginClick, onSignUpClick, onTranslateClick }) {
  // You'll pass functions like onLoginClick from the parent component (App.js)
  // to handle navigation when buttons are clicked.

  return (
    // Full screen container with a subtle gradient background
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-teal-100 p-4">

      {/* Content Box: Centered, with padding, rounded corners, and shadow for depth */}
      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl p-8 md:p-12 text-center max-w-lg w-full transform transition-all duration-500 hover:scale-105">

        {/* Optional: Icon/Logo */}
        {/* <BookOpenIcon className="h-16 w-16 text-indigo-600 mx-auto mb-4" /> */}
        <div className="mx-auto mb-5 h-16 w-16 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
          {/* Placeholder for an icon or initials */}
          <span className="text-2xl font-bold">BTT</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Welcome to our Bible Translation Tool
        </h1>

        {/* Subtitle/Tagline */}
        <p className="text-md text-gray-600 mb-8 px-4">
          Bridging languages and connecting communities through accessible scripture.
        </p>

        {/* Action Buttons Container */}
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 justify-center">

          {/* Sign Up Button (Primary Action) */}
          <button
            onClick={onSignUpClick} // Use the passed-in handler
            className="w-full sm:w-auto flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          >
            Sign Up
          </button>

          {/* Login Button (Secondary Action) */}
          <button
            onClick={onLoginClick} // Use the passed-in handler
            className="w-full sm:w-auto flex-1 bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50 font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Login
          </button>
        </div>

         {/* Optional: Direct access to translation tool */}
         <div className="mt-6">
             <button
                onClick={onTranslateClick} // Use the passed-in handler
                className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline transition duration-200"
             >
                 Or continue directly to Translation
             </button>
         </div>

      </div>

      {/* Footer Note */}
      <p className="text-xs text-gray-500 mt-8">
        Powered by modern translation technology.
      </p>
    </div>
  );
}

export default WelcomePage;