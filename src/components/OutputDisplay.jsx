// src/components/OutputDisplay.js
import React from 'react';

function OutputDisplay({ outputText, isLoading, error, targetLangCode, languageList }) {
  const getTargetLanguageName = () => {
    const lang = languageList.find(l => l.code === targetLangCode);
    return lang ? lang.name : targetLangCode; // Fallback to code if name not found
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50 text-center">
        <p className="text-gray-600">Loading translation...</p>
         {/* Optional: add a more visual loader */}
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="mt-4 p-4 border border-red-300 rounded-md bg-red-50 text-red-700">
        <p className="font-medium">Error:</p>
        <p>{error}</p>
      </div>
    );
  }

  // Success/Output State (only render if there's text)
  if (outputText) {
    return (
      <div className="mt-4">
        <label htmlFor="outputText" className="block text-sm font-medium text-gray-700 mb-1">
          Translated Text ({getTargetLanguageName()}):
        </label>
        <textarea
          id="outputText"
          rows="8" // Match input rows or adjust as needed
          value={outputText}
          readOnly
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 shadow-sm resize-y" // Style as read-only, allow vertical resize
        />
         {/* Optional: Add a "Copy to Clipboard" button here */}
         {/* <button onClick={() => navigator.clipboard.writeText(outputText)} className="...">Copy Text</button> */}
      </div>
    );
  }

  // Initial/Empty State (nothing to show yet)
  return null; // Don't render anything if no output, no loading, and no error
}

export default OutputDisplay;