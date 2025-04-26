// src/components/InputTextArea.js
import React from 'react';

function InputTextArea({ inputText, setInputText, sourceLang }) {
  const placeholderText = `Enter Bible text in ${sourceLang === 'en' ? 'English' : 'French'} here...`;

  return (
    <div className="mb-4">
      <label htmlFor="inputText" className="block text-sm font-medium text-gray-700 mb-1">
        Input Text ({sourceLang === 'en' ? 'English' : 'French'}):
      </label>
      <textarea
        id="inputText"
        rows="8" // Increased rows for Bible text
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder={placeholderText}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 resize-y" // Allow vertical resize
      />
    </div>
  );
}

export default InputTextArea;