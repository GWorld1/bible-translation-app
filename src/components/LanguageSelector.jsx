// src/components/LanguageSelector.js
import React from 'react';

function LanguageSelector({ sourceLang, setSourceLang, targetLang, setTargetLang, languageList }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      {/* Source Language */}
      <div>
        <label htmlFor="sourceLang" className="block text-sm font-medium text-gray-700 mb-1">
          Source Language:
        </label>
        <select
          id="sourceLang"
          value={sourceLang}
          onChange={(e) => setSourceLang(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="en">English</option>
          <option value="fr">French</option>
        </select>
      </div>

      {/* Target Language */}
      <div>
        <label htmlFor="targetLang" className="block text-sm font-medium text-gray-700 mb-1">
          Target Language:
        </label>
        <select
          id="targetLang"
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          disabled={languageList.length === 0} // Disable if list is empty
        >
          {languageList.length > 0 ? (
            languageList.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name} ({lang.code})</option>
            ))
          ) : (
            <option value="" disabled>Loading languages...</option> // Or handle empty state better
          )}
        </select>
      </div>
    </div>
  );
}

export default LanguageSelector;