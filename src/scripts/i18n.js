import { translations, getLanguage } from '../i18n/translations.js';

// Get preferred language (localStorage or browser)
export function getPreferredLanguage() {
    const stored = localStorage.getItem('preferred-language');
    if (stored && translations[stored]) return stored;
    return getLanguage();
}

// Apply translations on page load
export function applyTranslations() {
    const lang = getPreferredLanguage();
    const t = translations[lang];

    // Translate elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let value = t;

        // Navigate through translation object
        for (const k of keys) {
            value = value[k];
        }

        if (value) {
            element.textContent = value;
        }
    });

    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (t[key]) {
            element.placeholder = t[key];
        }
    });

    // Update language buttons
    updateLanguageButtons(lang);
}

// Change language manually
export function setLanguage(lang) {
    if (!translations[lang]) return;

    localStorage.setItem('preferred-language', lang);
    applyTranslations();
}

// Update toggle text
function updateLanguageButtons(currentLang) {
    const toggle = document.querySelector('#language-toggle .lang-text');
    if (toggle) {
        toggle.textContent = currentLang.toUpperCase();
    }
}

// Initialize language switcher (toggle)
export function initLanguageSwitcher() {
    const toggle = document.querySelector('#language-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
        const currentLang = getPreferredLanguage();
        const newLang = currentLang === 'en' ? 'es' : 'en';
        setLanguage(newLang);
    });
}
