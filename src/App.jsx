// src/App.js
import './App.css'
import React, { useState, useCallback } from 'react';
import LanguageSelector from './components/LanguageSelector';
import InputTextArea from './components/InputTextArea';
import TranslateButton from './components/TranslateButton';
import OutputDisplay from './components/OutputDisplay';
import { cameroonianLanguages } from './languages';
import { translateText } from './services/translationService';

function App() {
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState(cameroonianLanguages[0]?.code || '');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = useCallback(async () => {
    if (!inputText || !targetLang) {
      setError('Please enter text and select a target language.');
      return;
    }

    setIsLoading(true);
    setError('');
    setOutputText('');
    console.log(`Translating: '${inputText.substring(0, 20)}...' from ${sourceLang} to ${targetLang}`);

    try {
      const translatedText = translateText(inputText, sourceLang, targetLang);
      setOutputText(translatedText);
    } catch (err) {
      console.error("Translation error:", err);
      setError(err.message);
      setOutputText('');
    } finally {
      setIsLoading(false);
    }
  }, [inputText, sourceLang, targetLang]);

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
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
          <LanguageSelector
            sourceLang={sourceLang}
            setSourceLang={setSourceLang}
            targetLang={targetLang}
            setTargetLang={setTargetLang}
            languageList={cameroonianLanguages}
          />

          <InputTextArea
            inputText={inputText}
            setInputText={setInputText}
            sourceLang={sourceLang}
          />

          <div className="text-center my-4">
            <TranslateButton
              onTranslate={handleTranslate}
              isLoading={isLoading}
              disabled={!inputText || !targetLang}
            />
          </div>

          <OutputDisplay
            outputText={outputText}
            isLoading={isLoading}
            error={error}
            targetLangCode={targetLang}
            languageList={cameroonianLanguages}
          />
        </main>

        <footer className="mt-8 text-center text-xs text-gray-500">
          <p>Powered by Local Translation Dataset</p>
          <p>Developed for Low-Resource Cameroonian Languages</p>
          <p>Current Time (WAT): {new Date().toLocaleTimeString('en-GB', { timeZone: 'Africa/Lagos' })}</p>
        </footer>
      </div>
    </div>
  );
}

export default App;