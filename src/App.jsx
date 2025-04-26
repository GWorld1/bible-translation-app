// src/App.js
import './App.css'
import React, { useState, useCallback } from 'react';
import axios from 'axios'; // For making API calls
import LanguageSelector from './components/LanguageSelector';
import InputTextArea from './components/InputTextArea';
import TranslateButton from './components/TranslateButton';
import OutputDisplay from './components/OutputDisplay';
import { cameroonianLanguages } from './languages'; // Or define the array here

function App() {
  const [sourceLang, setSourceLang] = useState('en'); // 'en' or 'fr'
  const [targetLang, setTargetLang] = useState(cameroonianLanguages[0]?.code || ''); // Default to first language code
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Memoize the function to avoid unnecessary re-renders of the button if props don't change
  const handleTranslate = useCallback(async () => {
    if (!inputText || !targetLang) {
      setError('Please enter text and select a target language.');
      return;
    }

    setIsLoading(true);
    setError('');
    setOutputText('');
    console.log(`Requesting translation: '${inputText.substring(0, 20)}...' from ${sourceLang} to ${targetLang}`);

    try {
      // IMPORTANT: Replace with your ACTUAL backend API endpoint
      const apiUrl = '/api/translate'; // Example endpoint

      const response = await axios.post(apiUrl, {
        text: inputText,
        source_lang: sourceLang,
        target_lang: targetLang
      });

      console.log("API Response:", response.data); // Log the response for debugging

      // Adjust 'response.data.translated_text' based on your actual API response structure
      if (response.data && response.data.translated_text) {
        setOutputText(response.data.translated_text);
      } else {
        // Handle cases where the API response is successful but doesn't contain the expected data
        setError('Received an unexpected response format from the server.');
        console.error("Unexpected response format:", response.data);
      }

    } catch (err) {
      console.error("Translation API error:", err);
      let errorMessage = 'Translation failed. Please try again later.';
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error data:", err.response.data);
        console.error("Error status:", err.response.status);
        // You might get a more specific error message from your backend
        errorMessage = `Translation failed (Server error ${err.response.status}): ${err.response.data?.detail || err.response.data?.error || 'Unknown server error'}`;
      } else if (err.request) {
        // The request was made but no response was received
        console.error("Error request:", err.request);
        errorMessage = 'Translation failed: Could not reach the server. Please check your connection.';
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', err.message);
        errorMessage = `Translation failed: ${err.message}`;
      }
      setError(errorMessage);
      setOutputText(''); // Clear any previous output on error
    } finally {
      setIsLoading(false);
    }
  }, [inputText, sourceLang, targetLang]); // Dependencies for useCallback

  return (
    <div className="min-h-screen  p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <header className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Bible Translation Tool
          </h1>
          <p className="text-sm text-gray-600">
            Translate from English/French to Cameroonian Languages
          </p>
        </header>

        <main>
          {/* Language Selection Component */}
          <LanguageSelector
            sourceLang={sourceLang}
            setSourceLang={setSourceLang}
            targetLang={targetLang}
            setTargetLang={setTargetLang}
            languageList={cameroonianLanguages}
          />

          {/* Input Text Area Component */}
          <InputTextArea
            inputText={inputText}
            setInputText={setInputText}
            sourceLang={sourceLang}
          />

          {/* Translate Button Component */}
          <div className="text-center my-4">
             <TranslateButton
               onTranslate={handleTranslate}
               isLoading={isLoading}
               disabled={!inputText || !targetLang} // Disable if no input or target language
             />
          </div>


          {/* Output Display Component - Conditionally Rendered */}
          <OutputDisplay
            outputText={outputText}
            isLoading={isLoading}
            error={error}
            targetLangCode={targetLang}
            languageList={cameroonianLanguages}
          />
        </main>

        <footer className="mt-8 text-center text-xs text-gray-500">
            <p>Powered by Hugging Face Transformers</p>
            <p>Developed for Low-Resource Cameroonian Languages</p>
            <p>Current Time (WAT): {new Date().toLocaleTimeString('en-GB', { timeZone: 'Africa/Lagos' })}</p>
        </footer>
      </div>
    </div>
  );
}

export default App;