import { translation as englishTupuri } from '../data/english_tupuri';
import { translation as englishBulu } from '../data/english_bulu';

const translations = {
    'tup': englishTupuri,
    'bul': englishBulu
};

export const translateText = (text, sourceLang, targetLang) => {
    // Currently only supporting English source
    if (sourceLang !== 'en') {
        throw new Error('Currently only English source language is supported');
    }

    const translationData = translations[targetLang];
    if (!translationData) {
        throw new Error(`Translation not available for target language: ${targetLang}`);
    }

    // Find exact match in the source text
    const translation = translationData.find(item => item.source.trim() === text.trim());
    
    if (!translation) {
        throw new Error('No translation found for the given text');
    }

    return translation.target;
}